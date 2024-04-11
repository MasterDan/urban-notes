export class ConfigBase<TMap extends Record<string, string>> {
  constructor(
    protected map: TMap,
    protected defaultValue: keyof TMap,
  ) {}

  get(key?: keyof TMap): string {
    return this.map[key ?? this.defaultValue];
  }

  withDefaultValue(defaultValue: keyof TMap): ConfigBase<TMap> {
    return new ConfigBase(this.map, defaultValue);
  }
}

