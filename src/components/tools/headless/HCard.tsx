import {
  ValueOrObservableOrGetter,
  defineComponent,
  ref,
  toObservable,
  toRef,
  useClasses,
  useDefaultValues,
} from '@rexar/core';
import { map } from 'rxjs';
import { useCurrentTheme } from './config';
import { HBaseProps } from './config/@types';

export type CardProps = {
  rounded?: ValueOrObservableOrGetter<boolean>;
};

export const HCard = defineComponent<CardProps & HBaseProps>((props) => {
  const theme$ = useCurrentTheme();
  const defaultShadow$ = toRef(theme$.pipe(map((t) => t.base.shadows.get())));
  const { rounded, children, shadow } = useDefaultValues(props, {
    rounded: () => () => theme$.value.card.props.rounded,
    shadow: () => defaultShadow$.value,
  });
  const rounded$ = ref(false).fromObservable(toObservable(rounded));
  const shadow$ = ref<string>().fromObservable(toObservable(shadow));
  const classes = useClasses(() => {
    const result: string[] = ['bg-red-700'];
    if (shadow$.value) {
      result.push(shadow$.value);
    }
    if (rounded$.value) {
      result.push(theme$.value.card.classes.rounded);
    }

    return result;
  });
  return <div class={classes}>{children}</div>;
});
