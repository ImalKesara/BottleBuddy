<script lang="ts">
	import { enhance } from '$app/forms';
	import BearBottle from '../lib/components/BearBottle.svelte';
	import Button from '../lib/components/Button.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>BottleBuddy — Find your next favourite</title>
	<meta
		name="description"
		content="A friendly way to find a bottle that fits your taste and budget."
	/>
</svelte:head>

<section
	class="flex min-h-[40vh] flex-col items-center justify-center gap-8 py-12 sm:flex-row sm:gap-10 sm:py-16"
>
	<div class="w-44 shrink-0 sm:w-52" aria-hidden="true">
		<BearBottle />
	</div>

	<div class="max-w-md text-center sm:text-left">
		<p class="mb-3 text-xs font-semibold tracking-[0.24em] text-primary-500 uppercase">
			A little help finding a good one
		</p>
		<h1 class="text-5xl font-semibold tracking-[-0.055em] text-secondary-500 sm:text-6xl">
			BottleBuddy
		</h1>
		<p class="mt-5 text-lg leading-relaxed text-[#687267]">
			Tell BottleBuddy what you like and what you want to spend. Find a bottle that feels just
			right.
		</p>
	</div>
</section>

<form
	action=""
	method="POST"
	class="mx-auto w-full max-w-2xl space-y-4 pb-16"
	aria-busy={loading}
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			try {
				await update({ reset: false });
			} finally {
				loading = false;
			}
		};
	}}
>
	<section aria-labelledby="search-heading">
		<div class="mb-4">
			<h2 id="search-heading" class="text-2xl font-semibold tracking-[-0.03em] text-secondary-500">
				What are you looking for?
			</h2>
			<p id="search-help" class="mt-1.5 text-sm leading-relaxed text-[#687267]">
				Describe what you have in mind, including your budget or the kind of drink you prefer.
			</p>
		</div>
		<label for="product-search" class="label">
			<span class="label-text">Describe what you want</span>
			<textarea
				id="product-search"
				class="textarea min-h-32 resize-y"
				aria-describedby="search-help"
				placeholder="For example: Beer under Rs. 5,000, preferably lower strength"
				name="context"
				rows="4"></textarea>
		</label>
	</section>

	<div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
		<p class="text-sm">A little detail helps BottleBuddy find a better match.</p>
		<Button
			type="submit"
			disabled={loading}
			className="btn text-white capitalize preset-filled-brand btn-lg"
		>
			{loading ? 'Searching…' : 'Find my match'}
		</Button>
	</div>
</form>


{#if form && 'error' in form}
	<p
		class="mx-auto mb-8 max-w-2xl rounded-lg border border-error-500/30 bg-error-500/10 p-4 text-sm"
		role="alert"
	>
		{form.error}
	</p>
{:else if form && 'products' in form}
	<section class="mx-auto max-w-2xl pb-16" aria-labelledby="results-heading" aria-live="polite">
		<div class="mb-5 flex items-end justify-between gap-4">
			<div>
				<p class="text-surface-500-400 text-sm">BottleBuddy found</p>
				<h2 id="results-heading" class="text-2xl font-semibold text-secondary-500">
					{form.products.length}
					{form.products.length === 1 ? 'match' : 'matches'}
				</h2>
			</div>
			<p class="text-surface-500-400 text-xs">From the BottleBuddy catalogue</p>
		</div>

		{#if form.products.length === 0}
			<p class="rounded-xl border border-surface-300-700 p-5 text-sm">
				No matches found. Try describing a different category, budget, or strength.
			</p>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2">
				{#each form.products as product (product.id)}
					<article class="space-y-2 card p-4 preset-outlined-surface-500">
						{#if product.image}
							<img
								src={product.image}
								alt={product.name}
								class="w-full rounded-sm object-contain"
								loading="lazy"
							/>
						{/if}
						<p class="text-xs font-medium tracking-wide text-primary-500 uppercase">
							{product.brand}
						</p>
						<h3 class="text-lg font-semibold text-secondary-500">{product.name}</h3>
						<p class="text-sm">{product.category} · {product.abv}% ABV</p>
						<p class="font-semibold">Rs. {product.price.toLocaleString()}</p>
					</article>
				{/each}
			</div>
		{/if}
	</section>
{/if}
