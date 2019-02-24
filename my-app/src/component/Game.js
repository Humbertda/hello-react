import React from "react";
import Board from "./Board";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [],
            nextPlayer: 'X',
            winner: null,
            squares: Array(9).fill(null)
        }
    }

    handleClick(i) {

        if (this.state.winner)
            return; // no more plays since there is a winner

        if (this.state.squares[i])
            return; // tile already filled by a player

        let n = this.state.squares.slice();
        n[i] = this.state.nextPlayer;
        const winner = calculateWinner(n);

        const history = this.state.history.slice();
        history.push(this.state);

        this.setState({
            nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
            squares: n,
            winner: winner,
            history: history
        });
    }

    renderBoard(state) {
        return <Board squares={state} onClick={(i) => this.handleClick(i, state)}/>;
    }

    render() {

        const status = this.state.winner
            ? 'Winner is : ' + this.state.winner
            : 'Next player: ' + this.state.nextPlayer;

        return (
            <div className="game">
                <div className="game-board">
                    {this.renderBoard(this.state.squares)}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

/**
 * methods that check if the tic-tac-toe board has a winner
 * @param squares
 * @returns {*}
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;