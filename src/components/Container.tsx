import { defineComponent } from '@rexar/core';

export const Container = defineComponent(({ children }) => (
  <div class="container">{children}</div>
));
