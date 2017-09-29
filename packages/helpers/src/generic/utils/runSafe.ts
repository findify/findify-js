export function runSafe(func: InputFunction) {
  try {
    return func();
  } catch (err) {
    return undefined;
  }
}

export type InputFunction = () => any;
