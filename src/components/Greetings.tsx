import { defineComponent, ref } from '@rexar/core';
import { invoke } from '@tauri-apps/api';
import typescriptLogo from '../assets/typescript.svg';
import tauriLogo from '../assets/tauri.svg';
import viteLogo from '../assets/vite.svg';

const GreetForm = defineComponent(() => {
  const name$ = ref<string>();
  const greetMsg$ = ref<string>();
  const greet = async () => {
    greetMsg$.value = await invoke('greet', {
      name: name$.value,
    });
  };
  return (
    <>
      <form class="row" id="greet-form">
        <input
          value={name$}
          onInput={(e) => {
            name$.value = (e.target as HTMLInputElement).value;
          }}
          placeholder="Enter a name..."
        />
        <button onClick={greet} type="button">
          Greet
        </button>
      </form>
      <p>{greetMsg$}</p>
    </>
  );
});

export const Greetings = defineComponent(() => (
  <>
    <h1>Welcome to Tauri!</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src={tauriLogo} class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://www.typescriptlang.org/docs" target="_blank">
        <img
          src={typescriptLogo}
          class="logo typescript"
          alt="typescript logo"
        />
      </a>
    </div>

    <p>Click on the Tauri logo to learn more about the framework</p>
    <GreetForm />
  </>
));

