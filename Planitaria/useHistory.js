import { useState } from "https://esm.sh/react@18.2.0";

export function useHistory(initial) {
  const [history, setHistory] = useState([initial]);
  const [index, setIndex] = useState(0);

  const current = history[index];

  function set(next) {
    const nextHistory = history.slice(0, index + 1);
    nextHistory.push(next);
    setHistory(nextHistory);
    setIndex(nextHistory.length - 1);
  }

  function undo() {
    if (index > 0) setIndex(index - 1);
  }

  function redo() {
    if (index < history.length - 1) setIndex(index + 1);
  }

  return [current, set, undo, redo];
}
