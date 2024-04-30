import {
  Show,
  ValueOrObservableOrGetter,
  defineComponent,
  toObservable,
  useDefaultValues,
} from '@rexar/core';
import { combineLatestWith, map, of } from 'rxjs';
import {
  MultiThemeConfig,
  MultiTypeComponentProps,
  UiConfig,
} from './config/@types';
import { ComponentProps } from './config/multi-map-config';
import { useComponentClasses, useCurrentTheme } from './config';

export type CardProps = {
  hideHeader?: ValueOrObservableOrGetter<boolean>;
  hideFooter?: ValueOrObservableOrGetter<boolean>;
  header?: JSX.Element;
  footer?: JSX.Element;
};

export function defineCard<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  const { card, cardHeader, cardBody, cardFooter, base } = config.default;
  if (card == null) {
    throw new Error('"card" section must be filled"');
  }
  if (cardHeader == null) {
    throw new Error('"cardHeader" section must be filled"');
  }
  if (cardBody == null) {
    throw new Error('"cardBody" section must be filled"');
  }
  if (cardFooter == null) {
    throw new Error('"cardFooter" section must be filled"');
  }

  const CardHeader = defineComponent<
    MultiTypeComponentProps<typeof cardHeader>
  >((props) => {
    const classes$ = useComponentClasses(props, 'cardHeader');
    return <div class={classes$}>{props.children}</div>;
  });
  const CardBody = defineComponent<
    ComponentProps<typeof base> & MultiTypeComponentProps<typeof cardBody>
  >((props) => {
    const classes$ = useComponentClasses(props, 'cardBody');
    return <div class={classes$}>{props.children}</div>;
  });
  const CardFooter = defineComponent<
    MultiTypeComponentProps<typeof cardFooter>
  >((props) => {
    const classes$ = useComponentClasses(props, 'cardFooter');
    return <div class={classes$}>{props.children}</div>;
  });

  return defineComponent<
    CardProps &
      ComponentProps<typeof base> &
      MultiTypeComponentProps<typeof card>
  >((props) => {
    const classes$ = useComponentClasses(props, 'card');
    const theme$ = useCurrentTheme();
    const type$ = props.type ? toObservable(props.type) : of('default');
    const { header, footer, children } = props;
    const { hideHeader, hideFooter } = useDefaultValues(props as CardProps, {
      hideHeader: () => false,
      hideFooter: () => false,
    });
    const showHeader = toObservable(hideHeader).pipe(
      map((val) => !val && header != null),
    );
    const showFooter = toObservable(hideFooter).pipe(
      map((val) => !val && footer != null),
    );

    const bodyRadius$ = theme$.pipe(
      combineLatestWith(type$),
      map(([i, t]) => ({
        headClass:
          i.cardHeader == null
            ? []
            : (i.cardHeader[t as keyof typeof i.cardHeader]?.borderRadius
                ?.defaultValue as string | string[]),
        footerClass:
          i.cardFooter == null
            ? []
            : (i.cardFooter[t as keyof typeof i.cardFooter]?.borderRadius
                ?.defaultValue as string | string[]),
      })),
      combineLatestWith(showHeader, showFooter),
      map(([{ headClass, footerClass }, sh, sf]) => {
        const result: string[] = [];
        if (!sh && headClass) {
          if (Array.isArray(headClass)) {
            result.push(...headClass);
          } else {
            result.push(headClass);
          }
        }
        if (!sf && footerClass) {
          if (Array.isArray(footerClass)) {
            result.push(...footerClass);
          } else {
            result.push(footerClass);
          }
        }
        return result;
      }),
    );
    return (
      <div class={classes$}>
        <Show
          when={showHeader}
          // @ts-expect-error expected
          content={() => <CardHeader type={type$}>{header}</CardHeader>}
        />
        {/* @ts-expect-error expected */}
        <CardBody borderRadius={bodyRadius$} type={type$}>
          {children}
        </CardBody>
        <Show
          when={showFooter}
          // @ts-expect-error expected
          content={() => <CardFooter type={type$}>{footer}</CardFooter>}
        />
      </div>
    );
  });
}
