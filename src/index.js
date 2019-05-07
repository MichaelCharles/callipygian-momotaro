import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    phrase: "",
    phrases: ["elephant", "scray", "coffee", "tofu"],
    limit: 1,
    results: []
  };

  handleAdd() {
    let { phrases, phrase } = this.state;
    phrases.push(phrase);
    this.setState({ phrases: phrases, phrase: "" });
  }

  onPhraseChange(newPhrase) {
    this.setState({
      phrase: newPhrase
    });
  }

  removePhrase(e, index) {
    let { limit, phrases } = this.state;
    phrases.splice(index, 1);
    this.setState({ phrases });
    if (limit >= phrases.length) {
      limit = phrases.length;
    }
    this.setState({ limit });
  }

  increment() {
    let { limit, phrases } = this.state;
    limit++;
    if (limit >= phrases.length) {
      limit = phrases.length;
    }
    this.setState({ limit });
  }

  decrement() {
    let { limit } = this.state;
    this.setState({ limit: limit-- <= 0 ? "0" : limit });
  }

  getRandom() {
    let { limit } = this.state;
    let results = [];
    let phrases = [].concat(this.state.phrases);
    for (let i = 0; i < limit; i++) {
      results.push(phrases.splice(Math.floor(Math.random() * phrases.length),1));
    }
    this.setState({ results });
  }

  handleKeyDown(key) {
    if (key === 'Enter') {
      this.handleAdd();
    }
  }

  render() {
    const { limit, phrases, phrase, results } = this.state;
    return (
      <div class="App">
        <h1>Callipygian Momotaro</h1>
        <input
          type="text"
          value={phrase}
          onChange={e => this.onPhraseChange(e.target.value)}
          onKeyDown={e => this.handleKeyDown(e.key)}
        />
        <button
          onClick={() => {
            this.handleAdd();
          }}
        >
          +
        </button>
        <ul>
          {phrases.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <span
                className="clickable-text"
                onClick={e => {
                  this.removePhrase(e, index);
                }}
              >
                [x]
              </span>
            </li>
          ))}
        </ul>
        <div>
          Limit: {limit} &nbsp;
          <button
            onClick={() => {
              this.increment();
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              this.decrement();
            }}
          >
            -
          </button>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              this.getRandom();
            }}
          >
            Get Random
          </button>
        </div>
        <div>
          {results.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
