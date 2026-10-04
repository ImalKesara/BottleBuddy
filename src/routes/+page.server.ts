import {  fail } from '@sveltejs/kit';
import { connectToMongoDB } from '#lib/server/mongodb.js';
import type { Actions } from './$types';

type SearchFilters = {
	maxBudget: number | null;
	category: string[];
	brand: string[];
	minAbv: number | null;
	maxAbv: number | null;
};

type Product = {
	id: string;
	name: string;
	brand: string;
	category: string;
	price: number;
	abv: number;
	image: string;
};

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const context = formData.get('context');

		if (typeof context !== 'string' || !context.trim()) {
			return fail(400, { error: 'Please describe what you are looking for.' });
		}
		if (context.length > 1000) {
			return fail(400, { error: 'Please keep your search under 1,000 characters.' });
		}

		let response: Response;
		try {
			response = await fetch('http://localhost:11434/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					model: 'gemma3:1b',
					stream: false,
					format: 'json',
					messages: [
						{
							role: 'system',
							content: `Extract product search filters from the user's request. Return only a JSON object with these keys: maxBudget (number or null), category (string or null), brand (string or null), minAbv (number or null), maxAbv (number or null). Use null when a filter is not specified. Interpret amounts in Rs. as the maximum budget when the user says under, below, less than, or gives a budget. Never recommend or invent products.`
						},
						{ role: 'user', content: context.trim() }
					]
				})
			});
		} catch {
			return fail(503, {
				error: 'The local Gemma model is unavailable. Check that Ollama is running.'
			});
		}

		if (!response.ok) {
			return fail(502, { error: 'Ollama could not process this search.' });
		}

		let filters: SearchFilters;
		try {
			const result: unknown = await response.json();
			if (
				!isRecord(result) ||
				!isRecord(result.message) ||
				typeof result.message.content !== 'string'
			) {
				throw new Error('Unexpected Ollama response');
			}

			const parsed: unknown = JSON.parse(result.message.content);
			if (!isRecord(parsed)) throw new Error('Invalid filter response');

			filters = {
				maxBudget: toNumber(parsed.maxBudget) ?? findBudgetInText(context),
				category: toTerms(parsed.category),
				brand: toTerms(parsed.brand),
				minAbv: toNumber(parsed.minAbv, 100),
				maxAbv: toNumber(parsed.maxAbv, 100)
			};
		} catch {
			return fail(502, {
				error: 'Gemma returned filters the app could not read. Please try a simpler search.'
			});
		}

		try {
			const client = await connectToMongoDB();
			const mongoProducts = await client
				.db('products')
				.collection('productsCollection')
				.find()
				.toArray();

			// Return only plain, serializable values from MongoDB (ObjectId becomes a string).
			const allProducts: Product[] = mongoProducts.map((product) => ({
				id: String(product._id),
				name: String(product.name ?? ''),
				brand: String(product.brand ?? ''),
				category: String(product.category ?? ''),
				price: Number(product.price ?? 0),
				abv: Number(product.abv ?? 0),
				image: String(product.image ?? '')
			}));

			const matchingProducts = allProducts.filter((product) => {
				const categoryMatches =
					filters.category.length === 0 || filters.category.includes(product.category.toLowerCase());
				const brandMatches =
					filters.brand.length === 0 || filters.brand.includes(product.brand.toLowerCase());
				const budgetMatches = filters.maxBudget === null || product.price <= filters.maxBudget;
				const minAbvMatches = filters.minAbv === null || product.abv >= filters.minAbv;
				const maxAbvMatches = filters.maxAbv === null || product.abv <= filters.maxAbv;

				return categoryMatches && brandMatches && budgetMatches && minAbvMatches && maxAbvMatches;
			});

			return { products: matchingProducts };
		} catch (error) {
			console.error('MongoDB product search failed:', error);
			return fail(503, { error: 'BottleBuddy could not load products. Check the database connection.' });
		}
	}
} satisfies Actions;



function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toNumber(value: unknown, maxValue = Number.POSITIVE_INFINITY): number | null {
	const number =
		typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
	return Number.isFinite(number) && number >= 0 && number <= maxValue ? number : null;
}

function toTerms(value: unknown): string[] {
	const values = Array.isArray(value) ? value : [value];
	return values
		.filter((item): item is string => typeof item === 'string')
		.map((item) => item.trim().toLowerCase())
		.filter(Boolean);
}

function findBudgetInText(text: string): number | null {
	const match = text.match(
		/\b(?:under|below|less than|up to|budget(?:\s+of)?|maximum budget(?:\s+of)?)\s*(?:rs\.?|lkr)?\s*([\d,]+(?:\.\d+)?)/i
	);
	return match ? toNumber(Number(match[1].replaceAll(',', ''))) : null;
}
