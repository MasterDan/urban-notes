import { ValueOrObservableOrGetter, toObservable } from '@rexar/core';
import { MapConfig } from './map-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyConfig = MapConfig<any>;

export type MayBeArray<T> = T | T[];

export type MapConfigKeys<TConfig extends AnyConfig> = keyof TConfig['keys'];

export type ConfigMap = Record<string, AnyConfig>;

export type ComponentProps<TMap extends ConfigMap> = {
  [TKey in keyof TMap]:
    | ValueOrObservableOrGetter<MayBeArray<MapConfigKeys<TMap[TKey]>>>
    | undefined;
};

export class MultiMapConfig<TMap extends ConfigMap> {
  constructor(private body: TMap) {}

  get<TKey extends keyof TMap>(key: TKey) {
    return this.body[key];
  }

  cretePropsExtractors() {
    return (props: ComponentProps<TMap>) => {
      (Object.keys(props) as (keyof typeof props)[]).map((key) => {
        const propValue = props[key] ?? this.body[key].get();
        toObservable(propValue).pipe();
      });
    };
  }
}
