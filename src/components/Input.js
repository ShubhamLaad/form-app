import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_REGEX = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.field.value || '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.field.value && nextProps.field.value !== prevState.value) {
      this.setState({
        value: nextProps.field.value
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.value !== nextState.value;
  }

  handleChange(event) {
    const { value, type } = event.target;
    this.setState({ value }, () => {
      if (type === 'select-one') {
        this.validateField();
      }
    });
  }

  handleBlur() {
    this.validateField();
  }

  validateField() {
    const { name, validate } = this.props.field;

    let { errorMsg, value } = this.state;
    let isValid = true;

    if (validate && !value) {
      errorMsg = 'Field is mandatory';
      isValid = false;
    }

    if (value) {
      switch (name) {
        case 'email':
          isValid = EMAIL_REGEX.test(String(value).toLowerCase());
          errorMsg = isValid ? '' : 'Email is invalid';
          break;
        case 'mobile_number':
          isValid = MOBILE_REGEX.test(value);
          errorMsg = isValid ? '' : 'Mobile Number is invalid';
          break;
        default:
          errorMsg = '';
          isValid = true;
          break;
      }
    }

    this.setState({
      errorMsg,
    });
    this.props.checkValidation({ ...this.props.field, isValid, value: this.state.value });
  }

  render() {
    const { label, type, options, name } = this.props.field;
    if (type === 'dropdown') {
      if (!options) {
        return null;
      }
      return (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select
            id={name}
            name={name}
            className="form-control"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value=''>{label}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          {this.state.errorMsg && (
            <div className="text-danger">{this.state.errorMsg}</div>
          )}
        </div>
      )
    }
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          className="form-control"
          type={type}
          placeholder={label}
          value={this.state.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange} />
        {this.state.errorMsg && (
          <div className="text-danger">{this.state.errorMsg}</div>
        )}
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  checkValidation: PropTypes.func.isRequired,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  options: [],
};
