import {
  Ref,
  Show,
  ValueOrObservableOrGetter,
  defineComponent,
  ref,
  useDefaultValues,
} from '@rexar/core';
import { MultiThemeConfig, UiConfig } from '../config/@types';
import { ComponentProps } from '../config/multi-map-config';
import { useComponentClasses } from '../config';

export type TextInputProps = {
  value?: Ref<string | undefined>;
  label?: ValueOrObservableOrGetter<string>;
};

export function defineInputText<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  return defineComponent<
    TextInputProps & ComponentProps<(typeof config)['default']['base']>
  >((props) => {
    const classes$ = useComponentClasses(props, 'inputText');
    const { value, label } = useDefaultValues(props as TextInputProps, {
      value: () => ref<string>(),
    });
    return (
      <>
        <Show when={label != null} content={() => <label>{label}</label>} />
        <input
          class={classes$}
          type="text"
          value={value}
          onInput={(e) => {
            value.value = (e.target as HTMLInputElement).value;
          }}
        />
      </>
    );
  });
}
