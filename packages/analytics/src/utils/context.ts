import type { Context } from '../types';

let currentContext: Partial<Context> | undefined;

export const setContext = (context?: Partial<Context>) => {
  currentContext = context;
};

export const getContext = (): Partial<Context> | undefined => currentContext;
