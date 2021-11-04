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
      result: 0, // 0: playing, 1: winner player1, 2: winner player2
    };
    this.handleClick = this.handleClick.bind(this);
  }

  evaluateBoard() {
    console.log("evaluating"); // TODO: HERE I NEED TO EVALUATE ALL POSSIBLE WINS
    this.setState({
      result: 1, // CHANGE THIS
    });
    return 1;
  }

  handleClick(row, col) {
    // Check clicked chip state
    let chip = this.state.chips[row][col];

    // If chip is empty...
    if (chip === "") {
      // Create new chip corresponding with active player
      let newChip = chip;
      if (this.props.player1Turn) {
        newChip = "X";
      } else {
        newChip = "O";
      }

      // Update chips state
      this.setState((state) => {
        return {
          chips: [
            ...state.chips.slice(0, row),
            [
              ...state.chips[row].slice(0, col),
              newChip,
              ...state.chips[row].slice(col + 1),
            ],
            ...state.chips.slice(row + 1),
          ],
        };
      });

      // Evaluate board result
      let result = this.evaluateBoard();

      // Change player turn if still playing
      if (result === 0) {
        this.props.changeTurn();
      }
    }
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
