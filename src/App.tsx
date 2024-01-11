import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1>Vite + Solid</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and Solid logos to learn more</p>
    </>
  );
}

export default App;
