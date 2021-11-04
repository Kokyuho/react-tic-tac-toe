import React from "react";
import styled from "styled-components";

//Components
import Chip from "./Chip";

class Board extends React.Component {
  render() {
    return (
      <Content>
        <div>
          <Chip type="X" />
        </div>
        <div>
          <Chip type="O" />
        </div>
        <div>
          <Chip type="X" />
        </div>
        <div>
          <Chip type="" />
        </div>
        <div>
          <Chip type="" />
        </div>
        <div>
          <Chip type="X" />
        </div>
        <div>
          <Chip type="X" />
        </div>
        <div>
          <Chip type="X" />
        </div>
        <div>
          <Chip type="X" />
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
