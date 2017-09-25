function runSafe(func: InputFunction) {
  try {
    return func();
  } catch (err) {
    return undefined;
  }
}

type InputFunction = () => any;

export { runSafe, InputFunction };
