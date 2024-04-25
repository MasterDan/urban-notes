import {
  BaseProps,
  ValueOrObservableOrGetter,
  toObservable,
  useClasses,
} from '@rexar/core';
import { Observable } from 'rxjs';
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
        const propValue = props[key]
          ? this.$map[key].get(props[key] as string)
          : this.$map[key].get();

        return toObservable(propValue) as Observable<MayBeArray<string>>;
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
