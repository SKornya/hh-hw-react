const debounce = <F extends (...args: string[]) => unknown>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
