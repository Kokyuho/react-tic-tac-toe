import React from "react";
import styled from "styled-components";

class Chip extends React.Component {
  render() {
    return (
      <Content>
        <p>{this.props.type}</p>
      </Content>
    );
  }
}

export default Chip;

const Content = styled.div`
  font-size: 4rem;
  > p {
    font-family: "Fredoka One", cursive;
    margin: 0;
  }
`;
