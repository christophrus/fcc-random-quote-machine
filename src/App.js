import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { Helmet } from 'react-helmet';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuote: '',
      currentAuthor: '',
      quotes: {data: [], isLoaded: false, error: null}
    }
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            quotes: { isLoaded: true, data: result }
          });
          this.getRandomQuote();
        },
        (error) => {
          this.setState({
            quotes: {isLoaded: true, error }
          });
        }
      )
  }

  getRandomQuote() {
    if (!this.state.quotes.error) {
      let random = Math.floor( Math.random() * this.state.quotes.data.length );
      console.log(random);
      this.setState({
        currentAuthor: this.state.quotes.data[random].quoteAuthor,
        currentQuote: this.state.quotes.data[random].quoteText
      });
    }
  }
  

  render() {
    let twitterUrl = "https://twitter.com/intent/tweet?text=" + escape( `"${this.state.currentQuote}"\n\t- ${this.state.currentAuthor}`);
    if (this.state.quotes.error) {
      return (
        <div id="error">An error occured.</div>
      )
    } else if (!this.state.quotes.isLoaded) {
      return (
        <div id="loading">Loading ...</div>
      )
    }
    return (
      <main>
        <Helmet>
          <script type="text/javascript" src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
        </Helmet>
        <div id="quote-box">
          <div className="row">
            <div id="text">{this.state.currentQuote}</div>
          </div>
          <div className="row">
            <div id="author">{this.state.currentAuthor}</div>
          </div>
          <div className="row">
            <a id="tweet-quote" href={twitterUrl} className="left button"><i className="fa fa-twitter"></i></a>
            <button className="right" onClick={this.getRandomQuote} id="new-quote">New Quote</button>
          </div>
        </div>
      </main>

    );
  }
}

export default App;
