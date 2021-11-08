import React from "react";
import styled from "styled-components";

// Components
import Board from "./Board";
import Player from "./Player";
import Button from "./Button";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: true,
      player1: { name: "Player 1", score: 0, active: true, chipType: "X" },
      player2: { name: "Player 2", score: 0, active: false, chipType: "O" },
    };
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.increaseScore = this.increaseScore.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
  }

  startGame() {
    this.setState({
      gameOn: true,
    });
  }

  stopGame() {
    this.setState({
      gameOn: false,
    });
  }

  increaseScore(player) {
    if (player === "X") {
      this.setState({
        ...this.state,
        player1: {
          ...this.state.player1,
          score: this.state.player1.score + 1,
        },
      });
    } else {
      this.setState({
        ...this.state,
        player2: {
          ...this.state.player2,
          score: this.state.player2.score + 1,
        },
      });
    }
  }

  changeTurn() {
    // Reverse active state of player 1 and 2.
    this.setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        active: !prevState.player1.active,
      },
      player2: {
        ...prevState.player2,
        active: !prevState.player2.active,
      },
    }));
  }

  handleClickStartGame() {
    console.log("click start game");
  }

  handleClickNewRound() {
    console.log("click new round");
  }

  render() {
    return (
      <Wrapper>
        <div>
          <Board
            gameOn={this.state.gameOn}
            player1Turn={this.state.player1.active}
            changeTurn={this.changeTurn}
            stopGame={this.stopGame}
            increaseScore={this.increaseScore}
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
        <div>
          <Button text="Start Game" onClick={this.handleClickStartGame} />
          <Button text="New Round" onClick={this.handleClickNewRound} />
        </div>
      </Wrapper>
    );
  }
}

export default TicTacToe;

const Wrapper = styled.div`
  display: grid;
  border: dashed 1px white; // to be removed
  grid-template-columns: 1fr 1fr;
`;

const PlayersWrapper = styled.div`
  display: grid;
  border: dashed 1px white; // to be removed
  grid-template-columns: 1fr 1fr;
`;
