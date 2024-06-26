export type DefaultValueOf<TMap extends Record<string, string>> =
  | keyof TMap
  | [keyof TMap, ...(keyof TMap)[]];

export class Prop<TMap extends Record<string, string>> {
  constructor(
    private map: TMap,
    public defaultValue: DefaultValueOf<TMap>,
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
      : keys
          .map((key) => this.map[key])
          .filter((x) => x != null && x.length > 0 && x.trim().length > 0)
          .join(' ');
  }

  withDefaultValue(defaultValue: DefaultValueOf<TMap>): Prop<TMap> {
    return new Prop(this.map, defaultValue);
  }

  get keys() {
    return Object.keys(this.map) as (keyof TMap)[];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyProp = Prop<any>;

export type MapConfigKeys<TConfig extends AnyProp> = TConfig['keys'][number];
