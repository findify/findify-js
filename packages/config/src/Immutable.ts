import { Map } from 'immutable'
import { Config } from './Config'
import { Autocomplete } from './Autocomplete'
import { Search } from './Search'
import { Recommendation } from './Recommendation'
import { Content } from './Content'

type Maybe<T> = T | undefined;
type CopyMaybe<T, U> = Maybe<T> extends T ? Maybe<U> : U;
type CopyAnyMaybe<T, U, V> = CopyMaybe<T, V> | CopyMaybe<U, V>;

export interface Immutable<State> extends Map<keyof State, any>{
  toJS(): State;
  get<I extends keyof State, D extends any>(key: I, fallback?: D): Immutable<State[I]> | D;
  getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>>(
    path: [K1, K2]
  ): CopyMaybe<State[K1], NonNullable<State[K1]>[K2]>;
  getIn<
    K1 extends keyof State,
    K2 extends keyof NonNullable<State[K1]>,
    K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>
  >(
    path: [K1, K2, K3]
  ): CopyAnyMaybe<
    State[K1],
    NonNullable<State[K1]>[K2],
    NonNullable<NonNullable<State[K1]>[K2]>[K3]
  >;
  getIn<K1 extends keyof State, NSV>(    // Same stuff but with notSetValue. 
    path: [K1],
    notSetValue: NSV
  ): State[K1] | NSV;
  getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>, NSV>(
    path: [K1, K2],
    notSetValue: NSV
  ): CopyMaybe<State[K1], NonNullable<State[K1]>[K2]> | NSV;
  getIn<
    K1 extends keyof State,
    K2 extends keyof NonNullable<State[K1]>,
    K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>,
    NSV
  >(
    path: [K1, K2, K3],
    notSetValue: NSV
  ): CopyAnyMaybe<
    State[K1],
    NonNullable<State[K1]>[K2],
    NonNullable<NonNullable<State[K1]>[K2]>[K3] | NSV
  >;
}

export type BaseConfig = Immutable<Config>
export type AutocompleteConfig = Immutable<Config & Autocomplete>
export type SearchConfig = Immutable<Config & Search>
export type RecommendationConfig = Immutable<Config & Recommendation>
export type ContentConfig = Immutable<Config & Content>
