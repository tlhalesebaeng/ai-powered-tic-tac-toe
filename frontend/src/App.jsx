import { useRef, useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';
import './App.css';
import GameBoard from './components/GameBoard';
import History from './components/History';
import PlayerTurn from './components/PlayerTurn';
import Modal from './components/Modal';

let GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveWinner() {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = GAME_BOARD[combination[0].row][combination[0].col];
        const secondSymbol = GAME_BOARD[combination[1].row][combination[1].col];
        const thirdSymbol = GAME_BOARD[combination[2].row][combination[2].col];

        if (firstSymbol !== null) {
            if (
                firstSymbol === secondSymbol &&
                firstSymbol === thirdSymbol &&
                secondSymbol === thirdSymbol
            ) {
                winner = firstSymbol;
            }
        }
    }

    return winner;
}

function hasDraw() {
    for (let row = 0; row < GAME_BOARD.length; row++) {
        for (let col = 0; col < GAME_BOARD.length; col++) {
            if (GAME_BOARD[row][col] === null) {
                return false;
            }
        }
    }

    return true;
}

export default function App() {
    const [turn, setTurn] = useState({ currentTurn: 'player x' });
    const dialogRef = useRef();

    const { currentTurn } = turn;
    let winner = deriveWinner();
    const draw = hasDraw();

    let result;
    if (winner) {
        result = winner;
        dialogRef.current.open();
    } else if (draw) {
        result = 'draw';
        dialogRef.current.open();
    } else {
        result = '';
    }

    function handleCurrentTurn(rowIndex, colIndex) {
        setTurn((prevState) => {
            const newTurn = prevState === 'player x' ? 'player o' : 'player x';
            GAME_BOARD[rowIndex][colIndex] =
                prevState === 'player x' ? 'X' : 'O';
            return newTurn;
        });
    }

    function handleReplay() {
        const len = GAME_BOARD.length;
        for (let r = 0; r < len; r++) {
            for (let c = 0; c < len; c++) {
                GAME_BOARD[r][c] = null;
            }
        }
        dialogRef.current.close();
        setTurn({ currentTurn: 'player x' });
    }

    return (
        <main>
            <Modal onReplay={handleReplay} result={result} ref={dialogRef} />
            <div className="container">
                <History />
                <GameBoard
                    onSelectSquare={handleCurrentTurn}
                    board={GAME_BOARD}
                />
                <PlayerTurn turn={currentTurn} />
            </div>
        </main>
    );
}
