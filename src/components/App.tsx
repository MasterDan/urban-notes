import { defineComponent } from '@rexar/core';
import { HRoot } from './tools/headless/HRoot';
import { defineConfig } from './tools/headless/config';
import { HCard } from './tools/headless/HCard';

export const App = defineComponent(() => {
  const config = defineConfig({
    card: {
      classes: {
        rounded: 'rounded-3xl',
      },
      props: {
        rounded: true,
      },
    },
  });
  return (
    <>
      <HRoot
        config={config}
        content={() => (
          <HCard>
            <h1>Rexar app</h1>
          </HCard>
        )}
      />
    </>
  );
});

