<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		children: Snippet;
		className?: string;
		disabled?: boolean;
	};
	let { children, className, disabled, ...rest }: Props = $props();
</script>

<button class={className} {disabled} {...rest}>
	{@render children()}
</button>
