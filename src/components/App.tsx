import React, { useState } from 'react';
import REPLInput from './components/REPLInput';
import REPLHistory from './components/REPLHistory';

interface CommandHistory {
  command: string;
  output: string;
}

function App() {
  const [mode, setMode] = useState<'brief' | 'verbose'>('brief');
  const [history, setHistory] = useState<CommandHistory[]>([]);

  return (
    <div className="App">
      <REPLInput setHistory={setHistory} setMode={setMode} mode={mode} />
      <REPLHistory history={history} mode={mode} />
    </div>
  );
}

export default App;