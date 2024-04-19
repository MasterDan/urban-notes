import { Ref, createProvider, onBeforeDestroy, ref } from '@rexar/core';
import { map, throttleTime } from 'rxjs';
import { Layer, LayerSeed } from './HLayers.layer';

export class LayersContext {
  private layers: Ref<Map<string, Layer>>;

  constructor(...layers: LayerSeed[]) {
    this.layers = ref(new Map(layers.map((l) => [l.name, new Layer(l)])));
  }

  get layers$() {
    return this.layers.pipe(
      throttleTime(16, undefined, { trailing: true }),
      map((m) => Array.from(m.values()).sort((a, b) => a.order - b.order)),
    );
  }

  add(layerSeed: LayerSeed) {
    const layer = this.layers.value.get(layerSeed.name);
    if (layer == null) {
      this.layers.value.set(layerSeed.name, new Layer(layerSeed));
    } else {
      (Array.isArray(layerSeed.content)
        ? layerSeed.content
        : [layerSeed.content]
      ).forEach((c) => {
        layer.add(c);
        onBeforeDestroy().subscribe(() => {
          layer.remove(c);
        });
      });
    }
    onBeforeDestroy().subscribe(() => {
      this.layers.value.delete(layerSeed.name);
    });
  }
}

export const layersContextProvider = createProvider<LayersContext>();

export function getLayersContext() {
  const context = layersContextProvider.inject();
  if (context == null) throw new Error('Layers not found');
  return context;
}
