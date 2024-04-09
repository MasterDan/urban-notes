import { defineComponent } from '@rexar/core';
import { Counter } from './Counter';
import { Container } from './Container';
import { Greetings } from './Greetings';
import { GradientText } from './GradientText';

export const App = defineComponent(() => (
  <>
    <Container>
      <h1>Rexar App</h1>
      <GradientText>Tailwind test</GradientText>
      <Greetings />
      <div>
        <Counter />
      </div>
    </Container>
  </>
));

