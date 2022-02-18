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
