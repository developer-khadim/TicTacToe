import React, { useEffect, useState } from "react";

const TicTacToe = () => {
  const Square = ({ value, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-20 h-20 bg-gray-200 hover:bg-gray-300 text-4xl font-bold rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
      >
        {value}
      </button>
    );
  };

  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState('');
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [gameHistory, setGameHistory] = useState([]);

  const handleClick = (index) => {
    let copySquares = [...squares];
    if (getWinner(copySquares) || copySquares[index]) return;
    copySquares[index] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(copySquares);
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every(item => item !== '')) {
      setStatus('This is a draw! Please restart the game');
      setGameHistory([...gameHistory, 'Draw']);
    } else if (getWinner(squares)) {
      const winner = getWinner(squares);
      setStatus(`Winner is ${winner}. Please restart the game`);
      setScore(prevScore => ({ ...prevScore, [winner]: prevScore[winner] + 1 }));
      setGameHistory([...gameHistory, `${winner} wins`]);
    } else {
      setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
    }
  }, [squares, isXTurn]);

  const getWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];
      if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
        return squares[x];
      }
    }
    return null;
  }

  const handleRestart = () => {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => handleClick(index)} />
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-4">{status}</h2>
        <div className="flex justify-between mb-4">
          <p className="text-lg">X Score: {score.X}</p>
          <p className="text-lg">O Score: {score.O}</p>
        </div>
        <button
          onClick={handleRestart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          Restart
        </button>
      </div>
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4">Game History</h3>
        <ul className="bg-white rounded-lg shadow overflow-hidden">
          {gameHistory.map((game, index) => (
            <li key={index} className="px-4 py-2 border-b last:border-b-0">
              Game {index + 1}: {game}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicTacToe;