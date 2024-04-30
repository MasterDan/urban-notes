import { defineComponent } from '@rexar/core';
import background from '@src/assets/wp7073803.jpg';
import { Layer } from './tools/headless/Layer';
import { Root } from './tools/styled/Root';
import { Card } from './tools/styled/Card';
import { Flex, FlexItem } from './tools/styled/Flex';
import { InputText } from './tools/styled/inputs/InputText';

export const App = defineComponent(() => (
  <>
    <Root
      content={() => (
        <div style={{ height: '100%' }}>
          <Flex
            height="full"
            padding="2"
            direction="column"
            justifyContent="center"
          >
            <Card
              header={<h1>Rexar Application</h1>}
              footer={
                <Flex direction="row" align="center" justifyContent="end">
                  <h2>Footer content</h2>
                  <InputText labelPlacement="top" label="Text field" />
                </Flex>
              }
            >
              <div>
                <InputText label="Text field" />
              </div>
              <Flex
                justifyContent={'evenly'}
                align={'center'}
                direction={'row'}
              >
                <h1>Rexar app</h1>
                <FlexItem grow={'grow'}>
                  <Card type="inner" header={<>Inner Card</>}>
                    <h1>Rexar app</h1>
                    <h1>Rexar app</h1>
                    <InputText label="Text field" />
                  </Card>
                </FlexItem>
                <FlexItem alignSelf="start" justifySelf="center" grow={'grow'}>
                  <h1>Rexar app</h1>
                </FlexItem>
              </Flex>
            </Card>
            <Card>
              <h1>Rexar app</h1>
            </Card>
          </Flex>
          <Layer name="background" order={-1}>
            <img class="w-full h-full object-cover" src={background} />
          </Layer>
        </div>
      )}
    />
  </>
));
