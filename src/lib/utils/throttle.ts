export function throttle<F extends (...args: any[]) => void | Promise<void>>(
  func: F,
  duration: number = 0
): (...args: Parameters<F>) => void | Promise<void> {
  let previous_call = Number.MIN_SAFE_INTEGER;

  return (...args: any[]) => {
    const current_call = Date.now();
    if (current_call - previous_call >= duration) {
      func(...args);
      previous_call = current_call;
    }
  };
}
export function debounce(fn: Function, wait:number = 50, immediate?: false) {
	let timer = null
	return function(...args) {
		if (timer) clearTimeout(timer)
		if (immediate && !timer) {
			fn.apply(this, args)
		}
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, wait)
	}
}
