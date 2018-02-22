import React, { Component } from 'react';

export class GuessForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      proposal: '',
    };

    this.onProposalChange = this.onProposalChange.bind(this);
  }

  render() {
    const { onSubmit, label, placeholder } = this.props;
    const { proposal } = this.state;

    return (
      <div>
        <input type="text" placeholder={placeholder} value={proposal} onChange={this.onProposalChange} />
        <button onClick={() => onSubmit(proposal)}>
          {label}
        </button>
      </div>
    );
  }

  onProposalChange(event) {
    this.setState({ proposal: event.target.value });
  }
}
