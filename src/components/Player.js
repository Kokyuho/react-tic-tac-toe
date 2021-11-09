import React from "react";
import styled from "styled-components";

class Player extends React.Component {
  render() {
    return (
      <Wrapper>
        <StyledPlayer active={this.props.active}>
          <p>{this.props.name}</p>
          <p className="chipType">{this.props.chipType}</p>
          <p>Score: {this.props.score}</p>
        </StyledPlayer>
      </Wrapper>
    );
  }
}

export default Player;

const Wrapper = styled.div``;

const StyledPlayer = styled.div`
  border-color: ${(props) => (props.active ? "yellow" : "white")};
  border-style: solid;
  border-width: ${(props) => (props.active ? "2px" : "1px")};
  border-radius: 40px;
  margin: 0 20px;
  > p {
    margin: 10px 0;
  }
  .chipType {
    font-family: "Fredoka One", cursive;
    font-size: 2rem;
    margin: 0;
  }
`;
