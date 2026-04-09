import { useState } from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-900 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-2">Pixel Device Counter</h2>
      <p className="text-gray-400 mb-8">Track how many Pixel devices you own</p>

      <div className="text-8xl font-bold text-blue-400 mb-10">{count}</div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
          + Increment
        </button>
        <button onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
          - Decrement
        </button>
        <button onClick={() => setCount(0)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterApp;