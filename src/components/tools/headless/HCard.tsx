import {
  Providable,
  defineComponent,
  toRef,
  useClasses,
  useDefaultValues,
} from '@rexar/core';
import { map } from 'rxjs';
import { useCurrentTheme } from './config';
import { createRef } from '../create-ref';
import { HBaseProps } from './config/@types';

export type CardProps = {
  rounded?: Providable<boolean>;
};

export const HCard = defineComponent<CardProps & HBaseProps>((props) => {
  const theme$ = useCurrentTheme();
  const defaultShadow$ = toRef(theme$.pipe(map((t) => t.base.shadows.get())));
  const { rounded, children, shadow } = useDefaultValues(props, {
    rounded: () => () => theme$.value.card.props.rounded,
    shadow: () => defaultShadow$.value,
  });
  const rounded$ = createRef(rounded, false);
  const shadow$ = createRef(shadow);
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
