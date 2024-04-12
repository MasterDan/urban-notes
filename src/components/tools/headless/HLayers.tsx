import {
  createProvider,
  defineComponent,
  useDynamic,
  useFor,
} from '@rexar/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';

type Layer = {
  order: number;
  name: string;
  content: BehaviorSubject<(() => JSX.Element) | null>;
};

export class LayersContext {
  private layers: BehaviorSubject<Layer[]>;

  constructor(...layers: Layer[]) {
    this.layers = new BehaviorSubject(layers);
  }

  get layers$() {
    return this.layers.pipe(
      map((val) => val.sort((a, b) => a.order - b.order)),
    );
  }
}

export const layersContextProvider = createProvider<LayersContext>();

export const HLayers = defineComponent<{ content?: () => JSX.Element }>(
  ({ content: DefaultContent }) => {
    const context = new LayersContext({
      order: 0,
      name: 'default',
      content: new BehaviorSubject(DefaultContent ?? null),
    });
    layersContextProvider.provide(context);
    const Layers = useFor(context.layers$, (i) => i.name);
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Layers
          each={({ item }) => {
            const [Dynamic, setContent] = useDynamic();

            item.pipe(switchMap((l) => l.content)).subscribe((c) => {
              setContent(c);
            });
            return (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Dynamic />
              </div>
            );
          }}
        ></Layers>
      </div>
    );
  },
);
