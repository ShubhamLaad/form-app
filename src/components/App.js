import React, { Component } from 'react';
import Input from './Input';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Step: [
        {
          title: "Step 1",
          fields: [
            { name: "full_name", label: "FULL NAME", type: "text", validate: true },
            { name: "email", label: "EMAIL ID", type: "text", validate: true },
            { name: "mobile_number", label: "MOBILE NUMBER", type: "number", validate: true }
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
      ],
      activeIndex: 0,
    }
  }

  render() {
    const step = this.state.Step[this.state.activeIndex];
    return (
      <div className="app">
        <h1>Form App Assignment</h1>
        <form>
          <div>
            <h3>{step.title}</h3>
            {
              step.fields.map(field => <Input key={field.name} {...field} />)
            }
          </div>
        </form>
      </div>
    );
  }
}
