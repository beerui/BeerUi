import { beforeNavigate } from '$app/navigation';
import { navigating } from '$app/stores';
import { onDestroy } from 'svelte'

function getNavigationStore() {
	/** @type {((val?: any) => void)[]} */
	let callbacks = [];

	const navigation = {
		...navigating,
		complete: async () => {
			await new Promise((res, _) => {
				callbacks.push(res);
			});
		}
	};

	// This used to subscribe inside the callback, but that resolved the promise too early
	const unsub = navigating.subscribe((n) => {
		if (n === null) {
			while (callbacks.length > 0) {
				const res = callbacks.pop();
				res?.();
			}
		}
	});

	onDestroy(() => {
		unsub();
	});

	return navigation;
}
export const preparePageTransition = () => {
	const navigation = getNavigationStore();

	// before navigating, start a new transition
	beforeNavigate(() => {
		// Feature detection
		if (!document.createDocumentTransition) {
			return;
		}

		try {
			const transition = document.createDocumentTransition();
			// init before transition.start so the promise doesn't resolve early
			const navigationComplete = navigation.complete();
			transition.start(async () => {
				await navigationComplete;
			});
		} catch (e) {
			// without the catch, we could throw in beforeNavigate and prevent navigation
			console.error(e);
		}
	});
};
