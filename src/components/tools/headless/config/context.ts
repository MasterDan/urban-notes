import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { ReadonlyRef, toRef } from '@rexar/core';
import { ThemeConfig, UiConfig } from './@types';

export class HeadlessContext<
  TThemes extends string,
  TConfig extends UiConfig<TThemes>,
> {
  private config$: BehaviorSubject<TConfig>;

  private theme$: BehaviorSubject<TThemes | 'default'>;

  currentTheme$: ReadonlyRef<ThemeConfig>;

  constructor(config: TConfig, theme?: TThemes) {
    this.config$ = new BehaviorSubject(config);
    this.theme$ = new BehaviorSubject(theme ?? 'default');
    this.currentTheme$ = toRef(
      this.config$.pipe(
        combineLatestWith(this.theme$),
        map(([c, t]) => ({ ...c.default, ...c[t] }) as ThemeConfig),
      ),
    ) as ReadonlyRef<ThemeConfig>;
  }

  setTheme(theme: TThemes) {
    this.theme$.next(theme);
  }
}

