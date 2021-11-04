import React from "react";
import styled from "styled-components";

// Components
import Board from "./Board";
import Player from "./Player";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: true,
      player1: { name: "Player 1", score: 0, active: true, chipType: "X" },
      player2: { name: "Player 2", score: 0, active: false, chipType: "O" },
    };
    this.changeTurn = this.changeTurn.bind(this);
  }

  changeTurn() {
    // Reverse active state of player 1 and 2.
    // Note: There must be a better way to do this. But how...
    this.setState(({ player1, player2 }) => ({
      player1: {
        name: player1.name,
        score: player1.score,
        active: !player1.active,
        chipType: player1.chipType,
      },
      player2: {
        name: player2.name,
        score: player2.score,
        active: !player2.active,
        chipType: player2.chipType,
      },
    }));
  }

  render() {
    return (
      <div>
        <Board
          player1Turn={this.state.player1.active}
          changeTurn={this.changeTurn}
        />
        <PlayersWrapper>
          <Player
            name={this.state.player1.name}
            score={this.state.player1.score}
            active={this.state.player1.active}
            chipType={this.state.player1.chipType}
          />
          <Player
            name={this.state.player2.name}
            score={this.state.player2.score}
            active={this.state.player2.active}
            chipType={this.state.player2.chipType}
          />
        </PlayersWrapper>
      </div>
    );
  }
}

export default TicTacToe;

const PlayersWrapper = styled.div`
  display: grid;
  border: dashed 1px white; // to be removed
  grid-template-columns: 1fr 1fr;
`;
