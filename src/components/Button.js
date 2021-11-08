import React, { Component } from "react";
import styled from "styled-components";

export default class Button extends Component {
  render() {
    return (
      <StyledButton onClick={this.props.onClick}>
        {this.props.text}
      </StyledButton>
    );
  }
}

const StyledButton = styled.button`
  font-size: 2rem;
  display: block;
  margin: 30px auto;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: lightyellow;
  }
  &:active {
    background: yellow;
  }
`;
