import type { Actions } from './$types';

export const actions = {
	default: async ({request}) => {
    const data = await request.formData();
    const context = data.get("context")
    console.log(context)
	}
} satisfies Actions;
