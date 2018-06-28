type FunctionMap = { [x: string]: Function }
type NullableFunctionMap = { [x: string]: Function | null }
type SignalSumArgument = string | Function;
/**
 * SignalCombinator is a variation of Finite State Machine, which makes the following assumptions:
 * 1. Every state can transition to every state and itself
 * 2. State transitions are derived using a sum of signals, processed by signal processors. Each signal is a named variable,
 *    each signal processor is a function, that accepts signal value (or if it's a signal summator, values) and returns
 *    array of possible transitions
 * 3. For any combination of signals and signal-sums there is just one possible transition from one state to itself or another
 */
export default class SignalCombinator {
  /** List of possible states for transitioning */
  private states: string[];

  /**
   * Mapping of transitions to states.
   * SignalCombinator makes an assumption, that every state can transition to every state,
   * including itself
   */
  private transitionMapping: FunctionMap = {};

  /**
   * Mapping of signal processors, that receive signal (or signals) and return possible transition states to signals
   */
  private signalProcessors: NullableFunctionMap = {};

  /**
   * Signal values
   */
  private signals = {};


  /**
   * Used for looking up signal values, that signal processors want
   */
  private processorToSignalMapping = new Map<Function, string>();

  /**
   * Used for caching subsequent calls to processSignal() in one transition,
   * mainly to avoid calling signal summator twice or more times
   */
  private signalProcessingCache = {};

  /**
   * Holds current state
   */
  public state: string;

  /**
   * Create new SignalCombinator instance
   * @param states List of states to transition to
   * @param initialState Initial state, if not provided first state from states array is used
   */
  constructor(states: string[], initialState: string) {
    this.states = states;
    this.state === initialState || states[0];
  }


  /**
   * Used to register transition to state
   * @param state state to transition to
   * @param transitor function to perform transition
   */
  transitionTo(state: string, transitor: Function) {
    this.transitionMapping[state] = transitor;
  }


  /**
   * Used to register signal
   * @param name signal name
   * @param signalProcessor function, that accepts signal data and returns possible transition states
   * @param defaultValue default value for signal
   */
  createSignal(name: string, signalProcessor: Function, defaultValue: any) {
    this.signalProcessors[name] = this.createSignalProcessor(name, [name], signalProcessor);
    this.signal(name, defaultValue);
  }

  /**
   * Used to register override for signal processing.
   * For example, if I have signals A, B and C and want to use not A & B & C but (A & C) & B for determining transition,
   * then I register signal sum for signals A, C
   * You can also pass a processor previously returned by createSignal or createSignalSum, to make things like ((A & C) & (Z & B))
   * @param names array of signal name or processors to register sum handler for
   * @param signalProcessor function, that accepts signal values in order they were provided in names argument and returns possible transition states
   */
  createSignalSum(names: SignalSumArgument[], signalProcessor: Function) {
    /** JavaScript's sorting is not technically correct, since it sorts by ascii value, but in that case we just need a reproducible name */
    const signalSumName = names.map(x => (
      typeof x === 'string' ? x : ('<' + this.processorToSignalMapping.get(x)! + '>')
    )).sort().join('|')
    const wrappedSignalProcessor = this.createSignalProcessor(signalSumName, names, signalProcessor);
    names.forEach((x) => typeof x === 'string' && (this.signalProcessors[x] = null));
    this.signalProcessors[signalSumName] = wrappedSignalProcessor;
    this.processorToSignalMapping.set(wrappedSignalProcessor, signalSumName)
    return wrappedSignalProcessor
  }


  /**
   * Used to create a signal processor, function, that handles signal caching & processing
   * @param jointName name of signal processor. For single signals it's just signal name, for sums - sorted sum, joined by '|', i.e. x|y
   * @param names array of signals that processor is responsible for
   * @param signalProcessor function, that accepts signal values in order they were provided in names argument and returns possible transition states
   * @returns object with properties: names - specifies signal arguments that were passed to createSignalProcessor,
   * args - unwrapped arguments passed to actual signal processor
   * result - signal processor result
   */
  createSignalProcessor(jointName: string, names: SignalSumArgument[], signalProcessor: Function) {
    return () => {
      if (this.signalProcessingCache[jointName]) return this.signalProcessingCache[jointName];
      const argsToApply = names.map(name => typeof name === 'string' ? this.signals[name] : (<Function>name)());
      const signalResult = signalProcessor.apply(null, argsToApply);
      const result = { names, args: argsToApply, result: signalResult };
      this.signalProcessingCache[jointName] = result;
      return result;
    }
  }


  /**
   * Used to change signal values
   * @param name signal name
   * @param signal new signal value
   */
  signal(name: string, signal: any) {
    this.signals[name] = signal;
  }


  /**
   * Run transition, possibly to itself
   * @param args any arguments provided to transition() will be provided to transition function
   */
  transition(...args) {
    this.signalProcessingCache = {};
    const possibleStates = this.states.filter(state => (
      Object.entries(this.signalProcessors)
        .filter(([_, v]) => v)
        .map(([_, getSignalValue]) => getSignalValue!().result.includes(state))
        .every(item => item))
    );
    if (possibleStates.length === 0) console.error('SignalCombinator Invariant: unable to form a meaningful transition from state', this.state, 'using signals', this.signals);
    if (possibleStates.length > 1) console.error('SignalCombinator Invariant: more than 1 possible states for transitioning detected:', possibleStates, 'using signals', this.signals);
    this.state = possibleStates[0];
    return this.transitionMapping[this.state].apply(null, args);
  }
}
