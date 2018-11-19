import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleBlur() {
    const { label, type, name, options, validate } = this.props;

    if (validate && !this.state.value) {
      this.setState({
        error: 'Field is mandatory',
      });
      return false;
    }
    return true;



    if (name === 'email') {
      this.validate();
    } else if (name === 'number') {
      this.validate();
    }
    this.props.checkValid(true);
  }

  render() {
    const { label, type, name, options } = this.props;
    if (type === 'dropdown') {
      if (!options) {
        return null;
      }
      return (
        <div className="form-group">
          <label for={name}>{label}</label>
          <select
            className="form-control"
            id={name}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value=''>{label}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      )
    }
    return (
      <div className="form-group">
        <label for={name}>{label}</label>
        <input
          className="form-control"
          id={name}
          type={type}
          name={name}
          placeholder={label}
          value={this.state.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange} />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  options: [],
}
