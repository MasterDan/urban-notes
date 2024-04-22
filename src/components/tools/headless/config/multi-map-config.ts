import {
  ValueOrObservableOrGetter,
  toObservable,
  useClasses,
} from '@rexar/core';
import { Observable } from 'rxjs';
import { AnyMapConfig, MapConfigKeys } from './map-config';

export type MayBeArray<T> = T | T[];

export type ConfigMap = Record<string, AnyMapConfig>;

export type ComponentProps<TMap extends ConfigMap> = {
  [TKey in keyof TMap]:
    | ValueOrObservableOrGetter<MayBeArray<MapConfigKeys<TMap[TKey]>>>
    | undefined;
};

export class MultiMapConfig<TMap extends ConfigMap> {
  constructor(public $map: TMap) {}

  get<TKey extends keyof TMap>(key: TKey) {
    return this.$map[key];
  }

  propsToClasses(props: ComponentProps<TMap>) {
    const observables = (Object.keys(props) as (keyof typeof props)[]).map(
      (key) => {
        const propValue = props[key] ?? this.$map[key].get();
        return toObservable(propValue) as Observable<MayBeArray<string>>;
      },
    );
    return useClasses(observables);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMultiMapConfig = MultiMapConfig<any>;

export type MultiMapProps<TMap extends AnyMultiMapConfig> = {
  [TKey in keyof TMap['$map']]:
    | ValueOrObservableOrGetter<MayBeArray<MapConfigKeys<TMap['$map'][TKey]>>>
    | undefined;
};
