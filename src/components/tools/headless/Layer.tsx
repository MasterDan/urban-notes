import { defineComponent } from '@rexar/core';

import { getLayersContext } from './Layers.context';

export const Layer = defineComponent<{ order: number; name: string }>(
  ({ order, name, children }) => {
    const context = getLayersContext();
    context.add({
      name,
      order,
      content: () => <>{children}</>,
    });
    return <></>;
  },
);
