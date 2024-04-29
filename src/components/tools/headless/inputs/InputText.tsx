import {
  Ref,
  Show,
  ValueOrObservableOrGetter,
  defineComponent,
  ref,
  toObservable,
  useDefaultValues,
} from '@rexar/core';
import { MultiThemeConfig, UiConfig } from '../config/@types';
import { ComponentProps } from '../config/multi-map-config';
import { useComponentClasses } from '../config';

export type LabelPlacement = 'top' | 'left';

export type TextInputProps = {
  value?: Ref<string | undefined>;
  label?: ValueOrObservableOrGetter<string>;
  labelPlacement?: ValueOrObservableOrGetter<LabelPlacement>;
};

export function defineInputText<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  return defineComponent<
    TextInputProps & ComponentProps<(typeof config)['default']['base']>
  >((props) => {
    const classes$ = useComponentClasses(props, 'inputText');
    const { value, label, labelPlacement } = useDefaultValues(
      props as TextInputProps,
      {
        value: () => ref<string>(),
        labelPlacement: (): LabelPlacement => 'left',
      },
    );
    const labelPlacement$ = ref<LabelPlacement>('left').fromObservable(
      toObservable(labelPlacement),
    );
    return (
      <div
        style={() => ({
          display: 'flex',
          flexDirection: labelPlacement$.value === 'left' ? 'row' : 'column',
          alignItems:
            labelPlacement$.value === 'left' ? 'center' : 'flex-start',
          gap: '0.5rem',
        })}
      >
        <Show when={label != null} content={() => <label>{label}</label>} />
        <input
          class={classes$}
          type="text"
          value={value}
          onInput={(e) => {
            value.value = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
    );
  });
}
