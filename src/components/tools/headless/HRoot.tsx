import { defineComponent } from '@rexar/core';

export const HRoot = defineComponent<{
  content: () => JSX.Element;
}>(({ content }) => <>{content}</>);

