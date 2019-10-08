import React from 'react';
import './App.css';
import Button from './Components/Button';
import Display from './Components/Display';

const isOperator = /[*/+%-]/,
  endsWithOperator = /[*+/%-]$/,
  endsWithNum = /[0123456789]$/,
  endsWithSubtract = /[-]$/,
  endsWithDecimal = /['.']$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      formula: '',
      evaluated: ''
    };
    this.initialize = this.initialize.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  initialize() {
    this.setState({
      currentVal: '0',
      preExpression: '',
      evaluated: ''
    });
  }
  // numbers
  handleNumber(e) {
    if (this.state.currentVal == '0' || this.state.evaluated === true) {
      this.setState({
        currentVal: e.target.value,
        evaluated: false
      });
    } else if (
      this.state.currentVal.length < 14 &&
      this.state.currentVal !== 0
    ) {
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        evaluated: false
      });
    }
  }
  // Operator

  handleOperators(e) {
    if (endsWithOperator.test(this.state.currentVal)) {
      this.setState({
        currentVal: this.state.currentVal.slice(0, -1) + e.target.value
      });
    } else if (this.state.currentVal == '0' && e.target.value.includes('-')) {
      this.setState({
        currentVal: e.target.value
      });
    } else {
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        evaluated: false
      });
    }
  }
  handleEvaluate() {
    let formula = this.state.currentVal;
    if (endsWithOperator.test(formula)) {
      formula = formula.slice(0, -1);
      let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
      this.setState({ currentVal: answer, evaluated: true });
    } else {
      let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
      this.setState({ currentVal: answer, evaluated: true });
    }
  }
  // Negative

  // handleNegative(e) {
  //   if (
  //     endsWithOperator.test(this.state.currentVal) &&
  //     !endsWithSubtract.test(this.state.currentVal)
  //   ) {
  //     this.setState({ currentVal: this.state.currentVal + e.target.value });
  //   } else if (
  //     endsWithDecimal.test(this.state.currentVal) ||
  //     endsWithNum.test(this.state.currentVal)
  //   ) {
  //     this.setState({ currentVal: this.state.currentVal * -1 });
  //   }
  // }

  handleDecimal() {
    if (this.state.evaluated === true || this.state.currentVal == '0') {
      this.setState({ currentVal: '0.', evaluated: false });
    } else if (
      !this.state.currentVal.includes('.') &&
      endsWithNum.test(this.state.currentVal) &&
      !endsWithDecimal.test(this.state.currentVal)
    ) {
      this.setState({
        currentVal: this.state.currentVal + '.',
        evaluated: false
      });
    } else if (
      endsWithOperator.test(this.state.currentVal) &&
      this.state.currentVal.includes('.') &&
      !endsWithDecimal.test(this.state.currentVal)
    ) {
      this.setState({
        currentVal: this.state.currentVal + '0.',
        evaluated: false
      });
    } else if (
      isOperator.test(this.state.currentVal) &&
      this.state.currentVal.includes('.') &&
      endsWithNum.test(this.state.currentVal)
    ) {
      this.setState({
        currentVal: this.state.currentVal + '.',
        evaluated: false
      });
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
