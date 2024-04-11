import { defineComponent } from '@rexar/core';
import { HRoot } from './tools/headless/HRoot';
import { HCard } from './tools/headless/HCard';
import { config, shadows } from './app-config';

export const App = defineComponent(() => (
  <>
    <HRoot
      config={config}
      content={() => (
        <>
          <h1>ssss</h1>
          <HCard shadow={shadows.get('xl')}>
            <h1>Rexar app</h1>
          </HCard>
        </>
      )}
    />
  </>
));

