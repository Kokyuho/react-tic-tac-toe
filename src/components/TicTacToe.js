import React from "react";

// Components
import Board from "./Board";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: false,
    };
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default TicTacToe;
