import React from 'react';
import './App.css';
import Button from './Components/Button';
import Display from './Components/Display';

const isOperator = /[*/+‑%]/,
  endsWithOperator = /[*+‑/%]$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      formula: '',
      lastClicked: ''
    };
    this.initialize = this.initialize.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  initialize() {
    this.setState({
      currentVal: '0',
      formula: '',
      lastClicked: ''
    });
  }

  handleNumber(e) {
    if (
      this.state.currentVal == '0'
      // isOperator.test(this.state.currentVal)
    ) {
      this.setState({
        currentVal: e.target.value
      });
    } else if (
      this.state.currentVal.length < 14 &&
      this.state.currentVal !== 0
    ) {
      this.setState({ currentVal: this.state.currentVal + e.target.value });
    }
  }
  // Operator

  handleOperators(e) {
    // if (!isOperator.test(this.state.currentVal)) {
    //   this.setState({
    //     currentVal: this.state.currentVal + e.target.value
    //   });
    // } else
    if (endsWithOperator.test(this.state.currentVal)) {
      this.setState({
        currentVal: this.state.currentVal.slice(0, -1) + e.target.value
      });
    } else if (this.state.currentVal.length < 14) {
      this.setState({
        currentVal: this.state.currentVal + e.target.value
      });
    }
    // else
    // {
    //   let answer =
    //     Math.round(1000000000000 * eval(this.state.currentVal)) / 1000000000000;
    //   this.setState({
    //     currentVal: answer
    //   });
    // }
  }
  handleEvaluate() {
    if (endsWithOperator.test(this.state.currentVal)) {
      this.setState({ formula: this.state.currentVal.slice(0, -1) });
      let answer =
        Math.round(1000000000000 * eval(this.state.currentVal)) / 1000000000000;
      this.setState({ currentVal: answer });
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='App'>
          <Display currentValue={this.state.currentVal} />
          <Button
            initialize={this.initialize}
            numbers={this.handleNumber}
            operators={this.handleOperators}
            decimal={this.handleDecimal}
            evaluate={this.handleEvaluate}
          />
        </div>
      </div>
    );
  }
}

export default App;
