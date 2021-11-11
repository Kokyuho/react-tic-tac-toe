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
      gameOn: false,
      gameStarted: false,
      round: 0,
      winner: "",
      player1: { name: "Player 1", score: 0, active: false, chipType: "X" },
      player2: { name: "Player 2", score: 0, active: false, chipType: "O" },
    };
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.increaseScore = this.increaseScore.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.handleClickStartGame = this.handleClickStartGame.bind(this);
    this.handleClickNewRound = this.handleClickNewRound.bind(this);
    this.handleNameChangePlayer1 = this.handleNameChangePlayer1.bind(this);
    this.handleNameChangePlayer2 = this.handleNameChangePlayer2.bind(this);
    this.board = React.createRef();
  }

  startGame() {
    this.setState({
      gameOn: true,
      gameStarted: true,
    });
  }

  stopGame() {
    this.setState({
      gameOn: false,
    });
  }

  randomPlayerSelect() {
    let startPlayer = 0;
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      startPlayer = 1;
    } else {
      startPlayer = 2;
    }
    this.setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        active: startPlayer === 1 ? true : false,
      },
      player2: {
        ...prevState.player2,
        active: startPlayer === 2 ? true : false,
      },
    }));
  }

  increaseScore(player) {
    if (player === "X") {
      this.setState({
        ...this.state,
        winner: player,
        player1: {
          ...this.state.player1,
          score: this.state.player1.score + 1,
        },
      });
    } else {
      this.setState({
        ...this.state,
        winner: player,
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
    this.startGame();

    // Reset scores and round
    this.setState((prevState) => ({
      ...prevState,
      round: 1,
      winner: "",
      player1: {
        ...prevState.player1,
        score: 0,
      },
      player2: {
        ...prevState.player2,
        score: 0,
      },
    }));

    // Reset board through child ref
    this.board.current.resetBoard();

    // Random player start
    this.randomPlayerSelect();

    console.log("new game started");
  }

  handleClickNewRound() {
    this.startGame();

    // Reset board through child ref
    this.board.current.resetBoard();

    // Increase round count
    this.setState((prevState) => ({
      ...prevState,
      winner: "",
      round: prevState.round + 1,
    }));

    // Random player start
    this.randomPlayerSelect();

    console.log("click new round");
  }

  handleNameChangePlayer1(event) {
    this.setState((prevState) => ({
      player1: {
        ...prevState.player1,
        name: event.target.value,
      },
    }));
  }

  handleNameChangePlayer2(event) {
    this.setState((prevState) => ({
      player2: {
        ...prevState.player2,
        name: event.target.value,
      },
    }));
  }

  render() {
    const gameStarted = this.state.gameStarted;
    const round = this.state.round;
    const winner = this.state.winner;
    return (
      <Wrapper>
        <div>
          <Board
            ref={this.board}
            gameOn={this.state.gameOn}
            player1Turn={this.state.player1.active}
            changeTurn={this.changeTurn}
            stopGame={this.stopGame}
            increaseScore={this.increaseScore}
          />
        </div>
        <div>
          <PlayersWrapper>
            <Player
              name={this.state.player1.name}
              score={this.state.player1.score}
              active={this.state.player1.active}
              chipType={this.state.player1.chipType}
              handleNameChange={this.handleNameChangePlayer1}
            />
            <Player
              name={this.state.player2.name}
              score={this.state.player2.score}
              active={this.state.player2.active}
              chipType={this.state.player2.chipType}
              handleNameChange={this.handleNameChangePlayer2}
            />
          </PlayersWrapper>
          <Button
            text={gameStarted ? "Start New Game" : "Start Game"}
            onClick={this.handleClickStartGame}
          />
          <Button text="New Round" onClick={this.handleClickNewRound} />
          <h3>
            {gameStarted
              ? `Game started. Round ${round}`
              : "Click 'Start Game' to start"}
          </h3>
          <h3>
            {winner ? `${winner} wins!` : "Click Player name to change it."}
          </h3>
        </div>
      </Wrapper>
    );
  }
}

export default TicTacToe;

const Wrapper = styled.div`
  display: grid;
  /* border: dashed 1px white; // to be removed */
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const PlayersWrapper = styled.div`
  display: grid;
  /* border: dashed 1px white; // to be removed */
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
`;
