import { Ref, ref } from '@rexar/core';
import { Observable, map } from 'rxjs';

export type MayBeArray<T> = T | T[];

export type LayerSeed = {
  order: number;
  name: string;
  content: MayBeArray<() => JSX.Element>;
};

export class Layer {
  order: number;

  name: string;

  private content: Ref<Map<() => JSX.Element, number>>;

  content$: Observable<Array<() => JSX.Element>>;

  constructor({ order, name, content }: LayerSeed) {
    this.name = name;
    this.order = order;
    this.content = ref(
      new Map(
        (Array.isArray(content) ? content : [content]).map((c, i) => [c, i]),
      ),
    );
    this.content$ = this.content.pipe(
      map((m) => [...m].sort((a, b) => a[1] - b[1]).map(([c]) => c)),
    );
  }

  add(content: () => JSX.Element) {
    const c = this.content.value;
    const order = c.size;
    c.set(content, order);
  }

  remove(content: () => JSX.Element) {
    this.content.value.delete(content);
  }
}
