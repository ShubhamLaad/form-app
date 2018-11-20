import React, { Component } from 'react';
import Step from './Step';

const STEP = [
  {
    title: "Step 1",
    fields: [
      { name: "full_name", label: "FULL NAME", type: "text", validate: true },
      { name: "email", label: "EMAIL ID", type: "text", validate: true },
      { name: "mobile_number", label: "MOBILE NUMBER", type: "number", validate: false }
    ]
  },
  {
    title: "Step 2",
    fields: [
      { name: "experience", label: "EXPERIENCE", type: "text", validate: false },
      { name: "ctc", label: "CTC", type: "text", validate: false },
      { name: "city", label: "CURRENT CITY", type: "dropdown", options: ["Mumbai", "Bengaluru", "Vadodara"], validate: true },
    ]
  }
];
export default class App extends Component {

  static ucFirstWord(str) {
    if (!str) return '';
    let inStr = str.toLowerCase();
    let outStr = '', prevStrFlag = false;
    for (let i = 0; i < inStr.length; i++) {
      let char = inStr.charAt(i);
      if (char === '_') {
        prevStrFlag = true;
        continue;
      }
      if (prevStrFlag) {
        outStr += char.toUpperCase();
        prevStrFlag = false;
      } else {
        outStr += char;
      }
    }
    return outStr;
  }

  constructor() {
    super();
    this.state = {
      steps: STEP,
      activeIndex: 0,
    }

    this.changeStep = this.changeStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkActiveStepValid() {
    const { steps, activeIndex } = this.state;
    return steps[activeIndex].fields.every(field => field.isValid);
  }

  changeStep(step) {
    const steps = [...this.state.steps];
    const { activeIndex } = this.state;
    steps[activeIndex] = step;
    this.setState(({ activeIndex }) => ({
      steps,
      activeIndex: this.checkActiveStepValid() && activeIndex < steps.length - 1 ? activeIndex + 1 : activeIndex,
    }));
  }

  handleSubmit(event = { preventDefault() { } }) {
    event.preventDefault();
    this.state.steps.forEach(step => {
      step.fields.forEach(field => {
        if (field.value && field.isValid) { console.log(`${App.ucFirstWord(field.name)}: ${field.value}`) }
      })
    });
    alert('Thank You');
    this.setState({ activeIndex: 0 });
  }

  render() {
    const step = this.state.steps[this.state.activeIndex];
    return (
      <div className="app">
        <h1>Form App</h1>
        {step ? <form onSubmit={this.handleSubmit}>
          <Step step={step} changeStep={this.changeStep} />
          <button className="btn" type="submit">SUBMIT</button>
        </form> : <p>No Step</p>}
      </div>
    );
  }
}
