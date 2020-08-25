export const debounce = (fn: (args: any[]) => void, delay: number) => {
  let timeoutFn: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timeoutFn) {
      clearTimeout(timeoutFn);
    }
    timeoutFn = setTimeout(() => {
      fn(args);
    }, delay);
  };
};
