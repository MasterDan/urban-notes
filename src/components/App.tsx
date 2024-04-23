import { defineComponent } from '@rexar/core';
import background from '@src/assets/wp7073803.jpg';
import { HBack } from './tools/headless/HBack';
import { Root } from './tools/styled/Root';
import { Card } from './tools/styled/Card';

export const App = defineComponent(() => (
  <>
    <Root
      content={() => (
        <div class="backdrop-blur bg-slate-800 bg-opacity-30 h-full">
          <Card>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
            <h1>Rexar app</h1>
          </Card>
          <HBack>
            <img class="w-full h-full object-cover" src={background} />
          </HBack>
        </div>
      )}
    />
  </>
));
