import React from "react";
import styled from "styled-components";

class Chip extends React.Component {
  render() {
    return (
      <Content highlight={this.props.highlight}>
        <p>{this.props.type}</p>
      </Content>
    );
  }
}

export default Chip;

const Content = styled.div`
  font-size: ${(props) => (props.highlight ? "6rem" : "4rem")};
  /* transition: all 1s ease; */
  @keyframes win {
    0% {
      font-size: 4rem;
    }
    50% {
      font-size: 8rem;
    }
    100% {
      font-size: 6rem;
    }
  }
  animation: ${(props) => (props.highlight ? "win 0.5s linear 0s" : "")};
  > p {
    font-family: "Fredoka One", cursive;
    margin: 0;
  }

  @media screen and (max-width: 1000px) {
    font-size: ${(props) => (props.highlight ? "4rem" : "3rem")};
    @keyframes win {
      0% {
        font-size: 3rem;
      }
      50% {
        font-size: 5rem;
      }
      100% {
        font-size: 4rem;
      }
    }
  }
`;
