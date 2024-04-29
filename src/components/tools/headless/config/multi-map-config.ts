import {
  BaseProps,
  ValueOrObservableOrGetter,
  toObservable,
  useClasses,
} from '@rexar/core';
import { Observable, map, of } from 'rxjs';
import { AnyProp, MapConfigKeys } from './prop';

export type MayBeArray<T> = T | T[];

export type ConfigMap = Record<string, AnyProp>;

export type ComponentProps<TMap extends ConfigMap> = {
  [TKey in keyof TMap]?: ValueOrObservableOrGetter<
    MayBeArray<MapConfigKeys<TMap[TKey]>>
  >;
} & BaseProps;

export class MultiMapConfig<TMap extends ConfigMap> {
  constructor(public $map: TMap) {}

  get<TKey extends keyof TMap>(key: TKey) {
    return this.$map[key];
  }

  propsToClasses(props: ComponentProps<TMap>) {
    const observables = (Object.keys(this.$map) as (keyof typeof props)[]).map(
      (key) => {
        const propValue: Observable<MayBeArray<string>> = props[key]
          ? toObservable(
              props[key] as ValueOrObservableOrGetter<MayBeArray<string>>,
            ).pipe(
              map((v) => (Array.isArray(v) ? v : [v])),
              map((v) => this.$map[key].get(...v)),
            )
          : of(this.$map[key].get());

        return propValue;
      },
    );
    return useClasses(observables) as Observable<string>;
  }

  mergeWith<TOtherMap extends ConfigMap>(
    other: MultiMapConfig<TOtherMap>,
  ): MultiMapConfig<TMap & TOtherMap> {
    return new MultiMapConfig({
      ...this.$map,
      ...other.$map,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMultiMapConfig = MultiMapConfig<any>;

export type MultiMapProps<TMap extends AnyMultiMapConfig> = {
  [TKey in keyof TMap['$map']]:
    | ValueOrObservableOrGetter<MayBeArray<MapConfigKeys<TMap['$map'][TKey]>>>
    | undefined;
};
