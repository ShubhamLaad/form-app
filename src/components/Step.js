import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

export default class Step extends Component {

  checkValidation(field, index) {
    const step = { ...this.props.step };
    step.fields[index] = field;
    this.props.changeStep(step);
  }

  render() {
    const { step } = this.props;
    return (
      <div>
        <h3>{step.title}</h3>
        {
          step.fields.map((field, index) => <Input
            key={field.name}
            checkValidation={(field) => this.checkValidation(field, index)}
            field={field}
          />)
        }
      </div>
    );
  }
}

PropTypes.Step = {
  step: PropTypes.shape({
    title: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      options: PropTypes.array,
      checkValidation: PropTypes.func.isRequired,
    })),
  })
};


