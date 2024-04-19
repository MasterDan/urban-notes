import { defineComponent } from '@rexar/core';

import { getLayersContext } from './HLayers.context';

export const HBack = defineComponent(({ children }) => {
  const context = getLayersContext();
  context.add({
    name: 'back',
    order: -1,
    content: () => <>{children}</>,
  });
  return <></>;
});
