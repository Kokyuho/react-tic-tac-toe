import React from "react";
import styled from "styled-components";

//Components
import Chip from "./Chip";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      result: 0, // 0: playing, 1: winner X, 2: winner O
    };
    this.handleClick = this.handleClick.bind(this);
  }

  winner(player) {
    this.props.increaseScore(player);
    this.props.stopGame();
    this.setState({
      result: player === "X" ? 1 : 2,
    });
    console.log(`${player} wins`);
    return 1;
  }

  evaluateBoard(newChips) {
    // Put all chips in a single array
    const flatChips = [...newChips[0], ...newChips[1], ...newChips[2]];

    // Winner combinations posibilities
    const lines = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winner = 0;
    lines.forEach((line) => {
      if (
        flatChips[line[0]] !== "" &&
        flatChips[line[0]] === flatChips[line[1]] &&
        flatChips[line[1]] === flatChips[line[2]]
      ) {
        flatChips[line[0]] === "X" ? (winner = 1) : (winner = 2);
        this.winner(flatChips[line[0]]);
      }
    });

    return winner;
  }

  handleClick(row, col) {
    // If game is not on, do nothing
    if (!this.props.gameOn) {
      return 0;
    }

    // Get chips state
    const chips = this.state.chips;

    // Get clicked chip state
    const chip = chips[row][col];

    // If chip is not empty, do nothing
    if (chip !== "") {
      return 0;
    }

    // Create new chip corresponding with active player
    let newChip = chip;
    if (this.props.player1Turn) {
      newChip = "X";
    } else {
      newChip = "O";
    }

    // Create new chips state
    let newChips = [
      ...chips.slice(0, row),
      [...chips[row].slice(0, col), newChip, ...chips[row].slice(col + 1)],
      ...chips.slice(row + 1),
    ];

    // Evaluate board with new chips state
    let newResult = this.evaluateBoard(newChips);

    // Change player turn if still playing
    if (newResult === 0) {
      this.props.changeTurn();
    }

    // Update chips state
    this.setState((state) => {
      return {
        chips: newChips,
        result: newResult,
      };
    });
  }

  render() {
    return (
      <Content>
        <div onClick={() => this.handleClick(0, 0)}>
          <Chip type={this.state.chips[0][0]} />
        </div>
        <div onClick={() => this.handleClick(0, 1)}>
          <Chip type={this.state.chips[0][1]} />
        </div>
        <div onClick={() => this.handleClick(0, 2)}>
          <Chip type={this.state.chips[0][2]} />
        </div>
        <div onClick={() => this.handleClick(1, 0)}>
          <Chip type={this.state.chips[1][0]} />
        </div>
        <div onClick={() => this.handleClick(1, 1)}>
          <Chip type={this.state.chips[1][1]} />
        </div>
        <div onClick={() => this.handleClick(1, 2)}>
          <Chip type={this.state.chips[1][2]} />
        </div>
        <div onClick={() => this.handleClick(2, 0)}>
          <Chip type={this.state.chips[2][0]} />
        </div>
        <div onClick={() => this.handleClick(2, 1)}>
          <Chip type={this.state.chips[2][1]} />
        </div>
        <div onClick={() => this.handleClick(2, 2)}>
          <Chip type={this.state.chips[2][2]} />
        </div>
      </Content>
    );
  }
}

export default Board;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  border: 2px white solid;
  width: 400px;
  height: 400px;
  > div {
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
