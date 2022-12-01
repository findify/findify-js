import { Map } from 'immutable'
import { Config } from './Config'
import { Autocomplete, AutocompleteSizeType } from './Autocomplete'
import { Search } from './Search'
import { Recommendation } from './Recommendation'
import { Content } from './Content'
import * as enums from './enums'

type Maybe<T> = T | undefined;
type CopyMaybe<T, U> = Maybe<T> extends T ? Maybe<U> : U;
type CopyAnyMaybe<T, U, V> = CopyMaybe<T, V> | CopyMaybe<U, V>;
type MayBePrimitive<T> = T extends Record<string, any> ? Factory<T> : T

export interface Factory<State> extends Map<keyof State, any> {
  toJS(): State;
  get<I extends keyof State>(key: I): MayBePrimitive<State[I]>;
  get<I extends keyof State, NSV>(key: I, notSetValue: NSV): MayBePrimitive<State[I]> | NSV;
  getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>>(
    path: [K1, K2]
  ): MayBePrimitive<CopyMaybe<State[K1], NonNullable<State[K1]>[K2]>>;
  getIn<
    K1 extends keyof State,
    K2 extends keyof NonNullable<State[K1]>,
    K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>
  >(
    path: [K1, K2, K3]
  ): MayBePrimitive<CopyAnyMaybe<
    State[K1],
    NonNullable<State[K1]>[K2],
    NonNullable<NonNullable<State[K1]>[K2]>[K3]
  >>;
  getIn<K1 extends keyof State, NSV>(    // Same stuff but with notSetValue. 
    path: [K1],
    notSetValue: NSV
  ): State[K1] | NSV;
  getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>, NSV>(
    path: [K1, K2],
    notSetValue: NSV
  ): MayBePrimitive<CopyMaybe<State[K1], NonNullable<State[K1]>[K2]>> | NSV;
  getIn<
    K1 extends keyof State,
    K2 extends keyof NonNullable<State[K1]>,
    K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>,
    NSV
  >(
    path: [K1, K2, K3],
    notSetValue: NSV
  ): MayBePrimitive<CopyAnyMaybe<
    State[K1],
    NonNullable<State[K1]>[K2],
    NonNullable<NonNullable<State[K1]>[K2]>[K3] | NSV
  >>;
}

type FEConfig = {
  widgetKey: string,
  node: HTMLElement,
  widgetType: enums.Feature,
  cssSelector?: string
  slot?: string
  redirections?: { [key: string]: string }[];
}

export type BaseConfig = Factory<Config & FEConfig>
export type AutocompleteConfig = Factory<Config & Autocomplete & AutocompleteSizeType & FEConfig>
export type SearchConfig = Factory<Config & Search & FEConfig>
export type ContentConfig = Factory<Config & Content & FEConfig>
export type RecommendationConfig = Factory<Recommendation & Config & FEConfig>

export type FeatureConfig =
  | AutocompleteConfig
  | SearchConfig
  | RecommendationConfig
  | ContentConfig

type FeaturesMapping = {
  autocomplete: AutocompleteConfig,
  search: SearchConfig
  recommendation: RecommendationConfig
  content: ContentConfig
  custom: ContentConfig
}

export type SpecificConfig<T extends keyof typeof enums.Feature> = FeaturesMapping[T]

