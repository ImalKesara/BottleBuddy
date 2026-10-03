<script>
	import BearBottle from '../lib/assets/BearBottle.svelte';
	import Button from '../lib/components/Button.svelte';
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
		<h1
			class="font-serif text-5xl font-semibold tracking-[-0.055em] text-secondary-500 sm:text-6xl"
		>
			BottleBuddy
		</h1>
		<p class="mt-5 text-lg leading-relaxed text-[#687267]">
			Tell BottleBuddy what you like and what you want to spend. Find a bottle that feels just
			right.
		</p>
	</div>
</section>

<form action="" method="POST" class="mx-auto w-full max-w-2xl space-y-4 pb-16">
	<section aria-labelledby="search-heading">
		<div class="mb-4">
			<h2
				id="search-heading"
				class="font-serif text-2xl font-semibold tracking-[-0.03em] text-secondary-500"
			>
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
				rows="4"></textarea
			>
		</label>
	</section>

	<div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
		<p class="text-sm">A little detail helps BottleBuddy find a better match.</p>
		<Button type="submit" className="btn preset-filled-brand btn-lg">Find my match</Button>
	</div>
</form>
