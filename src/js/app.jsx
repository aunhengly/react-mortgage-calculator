import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here

  constructor(props){
    super(props);
    this.state ={
      balance: 0,
      rate: 0,
      term: 30,
      monthly: null
     };
    this.calculate = this.calculate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  handleOnChange(event) {  //manage change of the input.
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value, //[name] here is bring object name. if we put name or "name" it will make it as the string
    });
  }

  calculate(e) {
    e.preventDefault();//prevent the form from submitting and reset the page.
    // M is monthly payment
    // P is the principal amount
    // r is the rate
    // n is the number of months 15*12=180 months
    var P = parseFloat(this.state.balance);
    var r = parseFloat(this.state.rate / 100 / 12);
    var n = parseFloat(this.state.term * 12);
    var M = P * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
    //var M = 1 / 3 ;
    this.setState({
        monthly: M.toFixed(2)
    })
  }

  render() {
    return (
      <div className='container'>
        {/* <form > */}
        <form onSubmit={this.calculate}>
              <h3>Mortgage Calculator</h3>
          <label>
            Loan Balance <input name="balance" type="number" defaultValue={this.state.balance} onChange={this.handleOnChange} />
          </label> <br />
          <label>
            Interest Rate(%) <input name="rate" type="number" step="0.01" defaultValue={this.state.rate} onChange ={this.handleOnChange} />
          </label> <br />
          <label>
            Loan Term (years)
            <select name="term" defaultValue={this.state.term} onChange ={this.handleOnChange} >
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </label> <br />
          {/* <button name="submit" onClick={this.calculate}>Calculate</button> */}
          <button name="submit" type="submit">Calculate</button>
        </form>

        <div id='output'>
          {this.state.monthly}
        </div>

      </div>
     
    );
  }
}