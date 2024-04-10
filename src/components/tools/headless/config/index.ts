import { ThemeConfig, UiConfig, UiConfigSeed } from './@types';
import { HeadlessContext } from './context';

function isThemeConfig<TThemes extends string>(
  config: ThemeConfig | UiConfig<TThemes>,
): config is ThemeConfig {
  return !('default' in config);
}

let context: HeadlessContext<string, UiConfig<string>> | undefined;

export function defineConfig<TThemes extends string = 'default'>(
  seed: UiConfigSeed<TThemes>,
) {
  const seedObj = typeof seed === 'function' ? seed() : seed;
  let finalConfiguration: UiConfig<TThemes> | undefined;
  if (isThemeConfig(seedObj)) {
    finalConfiguration = {
      default: seedObj,
    } as UiConfig<TThemes>;
  } else {
    finalConfiguration = seedObj;
  }
  context = new HeadlessContext(finalConfiguration) as HeadlessContext<
    string,
    UiConfig<string>
  >;

  const setTheme = (t: TThemes) => {
    context?.setTheme(t);
  };

  return { setTheme };
}

defineConfig({
  default: {
    frame: {
      classes: {
        rounded: 'x',
      },
      props: {
        rounded: true,
      },
    },
  },
  dark: {},
});

export function getCurrentTheme() {
  if (context == null) {
    throw new Error('Conext is not defined');
  }
  return context.currentTheme$;
}

