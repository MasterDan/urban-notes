import { defineComponent } from '@rexar/core';
import { Counter } from './Counter';
import { Container } from './Container';
import { Greetings } from './Greetings';

export const App = defineComponent(() => (
  <>
    <Container>
      <h1>Rexar App</h1>
      <Greetings />
      <div>
        <Counter />
      </div>
    </Container>
  </>
));

