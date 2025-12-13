import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const userCode = localStorage.getitem('userCode');
	console.log(userCode);
};
