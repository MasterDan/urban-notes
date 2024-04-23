export type DefaultValueOf<TMap extends Record<string, string>> =
  | keyof TMap
  | [keyof TMap, ...(keyof TMap)[]];

export class MapConfig<TMap extends Record<string, string>> {
  constructor(
    private map: TMap,
    private defaultValue: DefaultValueOf<TMap>,
  ) {
    if (Array.isArray(defaultValue) && defaultValue.length === 0) {
      throw new Error('You must provide at leas one default value');
    }
  }

  private getDefault() {
    if (Array.isArray(this.defaultValue)) {
      return this.get(...this.defaultValue);
    }
    return this.get(this.defaultValue);
  }

  get<TKeys extends (keyof TMap)[]>(...keys: TKeys): string {
    return keys.length === 0
      ? this.getDefault()
      : keys.map((key) => this.map[key]).join(' ');
  }

  withDefaultValue(defaultValue: DefaultValueOf<TMap>): MapConfig<TMap> {
    return new MapConfig(this.map, defaultValue);
  }

  get keys() {
    return Object.keys(this.map) as (keyof TMap)[];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMapConfig = MapConfig<any>;

export type MapConfigKeys<TConfig extends AnyMapConfig> =
  TConfig['keys'][number];
