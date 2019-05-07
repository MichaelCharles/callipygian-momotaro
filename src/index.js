import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const setCookie = function setCookie(cname, cvalue, exdays = 365) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

const getCookie = function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return undefined;
}

class App extends React.Component {
  state = {
    phrase: "",
    phrases: [],
    limit: 1,
    results: []
  };

  componentWillMount() {
    let phrasesToLoad = getCookie('phrases')
    if (typeof phrasesToLoad === 'undefined') {
      phrasesToLoad = ['tofu', 'coffee', 'callipygian', 'Momotaro']
    }
    this.setState({phrases: phrasesToLoad});
  }

  handleAdd() {
    let { phrases, phrase } = this.state;
    phrases.push(phrase);
    this.setState({ phrases: phrases, phrase: "" });
    setCookie('phrases', this.state.phrases)
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
    setCookie('phrases', this.state.phrases)
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
      <div className="App">
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
          Limit: {phrases.length === 0 ? 0 : limit} &nbsp;
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
