type FunctionMap = { [x: string]: Function }
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
  private signalProcessors: FunctionMap = {};

  /**
   * Signal values
   */
  private signals = {};

  /**
   * Used for lookup of arguments order for signal summators by handler
   */
  private signalSumHandlersReverse = new Map();

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
    this.signalProcessors[name] = signalProcessor;
    this.signal(name, defaultValue);
  }

  /**
   * Used to register override for signal processing.
   * For example, if I have signals A, B and C and want to use (A & C) + B for determining transition,
   * then I register signal sum for signals A, C
   * @param names signal names to register sum handler for
   * @param signalProcessor function, that accepts signal values in order they were provided in names argument and returns possible transition states
   */
  createSignalSum(names: string[], signalProcessor: Function) {
    names.forEach(name => this.signalProcessors[name] = signalProcessor);
    this.signalSumHandlersReverse.set(signalProcessor, names);
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
   * Used to process signal response
   * @param name signal name
   */
  private processSignal(name) {
    if (this.signalProcessingCache[name]) return this.signalProcessingCache[name];
    const processor = this.signalProcessors[name]
    if (processor.length === 1) return processor(this.signals[name]);
    const affectedNames = this.signalSumHandlersReverse.get(processor);
    const argsToApply = affectedNames.map(name => this.signals[name]);
    const signalResult =  processor.apply(null, argsToApply);
    affectedNames.forEach(name => (this.signalProcessingCache[name] = signalResult));
    return signalResult;
  }


  /**
   * Run transition, possibly to itself
   * @param args any arguments provided to transition() will be provided to transition function
   */
  transition(...args) {
    this.signalProcessingCache = {};
    const possibleStates = this.states.filter(state => (
      Object.keys(this.signals)
        .map((signal) => this.processSignal(signal).includes(state))
        .every(item => item))
    );
    if (possibleStates.length === 0) console.error('Invariant: unable to form a meaningful transition from state', this.state, 'using signals', this.signals);
    if (possibleStates.length > 1) console.error('Invariant: more than 1 possible states for transitioning detected:', possibleStates, 'using signals', this.signals);
    this.state = possibleStates[0];
    return this.transitionMapping[possibleStates[0]].apply(null, args);
  }
}
