import React from "react";
import styled from "styled-components";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNameEdit: false,
    };
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameClick() {
    const playerNameEdit = this.state.playerNameEdit;
    this.setState({
      playerNameEdit: !playerNameEdit,
    });
  }

  handleSubmit(event) {
    this.setState({
      playerNameEdit: false,
    });
    event.preventDefault();
  }

  render() {
    return (
      <Wrapper>
        <StyledPlayer active={this.props.active}>
          {this.state.playerNameEdit ? (
            <form onSubmit={this.handleSubmit}>
              <input
                autoFocus
                type="text"
                value={this.props.name}
                onChange={this.props.handleNameChange}
                onSubmit={this.handleSubmit}
              />
            </form>
          ) : (
            <p id="playerName" onClick={this.handleNameClick}>
              {this.props.name}
            </p>
          )}
          <p className="chipType">{this.props.chipType}</p>
          <p>Score: {this.props.score}</p>
        </StyledPlayer>
      </Wrapper>
    );
  }
}

export default Player;

const Wrapper = styled.div`
  @media screen and (max-width: 1000px) {
    margin-top: 20px;
  }
`;

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
  #playerName {
    cursor: pointer;
  }
  input {
    width: 150px;
    margin: 10px;
    font-size: 1.5rem;
  }
`;
