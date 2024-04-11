import {
  Providable,
  computed,
  defineComponent,
  useClasses,
  useDefaultValues,
} from '@rexar/core';
import { useCurrentTheme } from './config';
import { createRef } from '../create-ref';

export type CardProps = {
  rounded?: Providable<boolean>;
};

export const HCard = defineComponent<CardProps>((props) => {
  const theme$ = useCurrentTheme();
  const { rounded } = useDefaultValues(props, {
    rounded: () => computed(() => theme$.value.card.props.rounded),
  });
  const rounded$ = createRef(rounded, false);
  const classes = useClasses(() => {
    const result: string[] = ['bg-red-700'];
    if (rounded$.value) {
      result.push(theme$.value.card.classes.rounded);
    }
    return result;
  });
  return <div class={classes}>{props.children}</div>;
});

