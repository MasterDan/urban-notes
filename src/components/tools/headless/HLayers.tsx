import { defineComponent, useDynamic, useFor } from '@rexar/core';
import { switchMap } from 'rxjs';
import { LayersContext, layersContextProvider } from './HLayers.context';

export const HLayers = defineComponent<{ content: () => JSX.Element }>(
  ({ content }) => {
    const context = new LayersContext({
      order: 0,
      name: 'default',
      content,
    });
    layersContextProvider.provide(context);
    const Layers = useFor(context.layers$, (i) => `${i.name}`);
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Layers
          each={({ item }) => {
            const LayerItems = useFor(
              item.pipe(switchMap((i) => i.content$)),
              (_, n) => n,
            );

            return (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100vw',
                  height: '100vh',
                }}
              >
                <LayerItems
                  each={({ item: layerItem }) => {
                    const [Dynamic, setContent] = useDynamic();
                    layerItem.subscribe((c) => setContent(c));
                    return <Dynamic />;
                  }}
                />
              </div>
            );
          }}
        ></Layers>
      </div>
    );
  },
);
