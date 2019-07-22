import React from 'react';
import './App.css';
import Button from './Components/Button';
import Display from './Components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
