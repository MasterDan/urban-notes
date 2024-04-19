import { defineComponent } from '@rexar/core';
import background from '@src/assets/wp7073803.jpg';
import { HRoot } from './tools/headless/HRoot';
import { HCard } from './tools/headless/HCard';
import { config, shadows } from './App.config';
import { HBack } from './tools/headless/HBack';

export const App = defineComponent(() => (
  <>
    <HRoot
      config={config}
      content={() => (
        <div class="backdrop-blur bg-slate-800 bg-opacity-30 h-full">
          <h1>ssss</h1>
          <HCard shadow={shadows.get('xl')}>
            <h1>Rexar app</h1>
          </HCard>
          <HBack>
            <img class="w-full h-full object-cover" src={background} />
          </HBack>
        </div>
      )}
    />
  </>
));
