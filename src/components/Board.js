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
      winLine: null,
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
        this.setState({
          winLine: line,
        });
      }
    });

    return winner;
  }

  resetBoard() {
    this.setState({
      chips: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      winLine: null,
      result: 0, // 0: playing, 1: winner X, 2: winner O
    });
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
    const gameOn = this.props.gameOn;
    return (
      <Content>
        <ChipWrapper
          onClick={() => this.handleClick(0, 0)}
          pointer={!gameOn || this.state.chips[0][0] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[0][0]}
            highlight={
              this.state.winLine && this.state.winLine.includes(0)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(0, 1)}
          pointer={!gameOn || this.state.chips[0][1] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[0][1]}
            highlight={
              this.state.winLine && this.state.winLine.includes(1)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(0, 2)}
          pointer={!gameOn || this.state.chips[0][2] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[0][2]}
            highlight={
              this.state.winLine && this.state.winLine.includes(2)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(1, 0)}
          pointer={!gameOn || this.state.chips[1][0] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[1][0]}
            highlight={
              this.state.winLine && this.state.winLine.includes(3)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(1, 1)}
          pointer={!gameOn || this.state.chips[1][1] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[1][1]}
            highlight={
              this.state.winLine && this.state.winLine.includes(4)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(1, 2)}
          pointer={!gameOn || this.state.chips[1][2] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[1][2]}
            highlight={
              this.state.winLine && this.state.winLine.includes(5)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(2, 0)}
          pointer={!gameOn || this.state.chips[2][0] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[2][0]}
            highlight={
              this.state.winLine && this.state.winLine.includes(6)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(2, 1)}
          pointer={!gameOn || this.state.chips[2][1] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[2][1]}
            highlight={
              this.state.winLine && this.state.winLine.includes(7)
                ? true
                : false
            }
          />
        </ChipWrapper>
        <ChipWrapper
          onClick={() => this.handleClick(2, 2)}
          pointer={!gameOn || this.state.chips[2][2] ? "" : "pointer"}
        >
          <Chip
            type={this.state.chips[2][2]}
            highlight={
              this.state.winLine && this.state.winLine.includes(8)
                ? true
                : false
            }
          />
        </ChipWrapper>
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
  width: 500px;
  height: 500px;
  > div {
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChipWrapper = styled.div`
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.pointer};
`;
