import { defineComponent, useClasses } from '@rexar/core';

export const GradientText = defineComponent(({ children }) => (
  <div
    class={useClasses([
      'text-4xl',
      'p-4',
      'text-transparent',
      'bg-gradient-to-r',
      'from-purple-400',
      'to-sky-200',
      'bg-clip-text',
    ])}
  >
    {children}
  </div>
));

