import { Providable, Ref, ref, toObservable } from '@rexar/core';

export function createRef<T>(p: Providable<T>): Ref<T | undefined>;
export function createRef<T>(p: Providable<T>, defaultValue: T): Ref<T>;
export function createRef<T>(
  p: Providable<T>,
  defaultValue?: T,
): Ref<T | undefined> {
  const ref$ = ref<T | undefined>(defaultValue);
  toObservable(p).subscribe((v) => {
    ref$.value = v;
  });
  return ref$;
}
