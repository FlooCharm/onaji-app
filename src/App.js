import cardIndex from './cardIndex.js';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Board cards={cardIndex}/>
    </div>
  );
}

export default App;
