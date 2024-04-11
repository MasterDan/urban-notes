export class MapConfig<TMap extends Record<string, string>> {
  constructor(
    protected map: TMap,
    protected defaultValue: keyof TMap,
  ) {}

  get(...keys: (keyof TMap)[]): string {
    return keys.length === 0
      ? this.map[this.defaultValue]
      : keys.map((key) => this.map[key]).join(' ');
  }

  withDefaultValue(defaultValue: keyof TMap): MapConfig<TMap> {
    return new MapConfig(this.map, defaultValue);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConfig = MapConfig<any>;

