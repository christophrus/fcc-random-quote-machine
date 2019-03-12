import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import QuoteBox from './components/QuoteBox';
import Button from './components/Button';
import Quote from './components/Quote';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuote: '',
      currentAuthor: '',
      currentColor: '',
      quotes: {data: [], isLoaded: false, error: null},
      colors: ['grey', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']
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
      let randomQ = Math.floor( Math.random() * this.state.quotes.data.length );
      let randomC = Math.floor( Math.random() * this.state.colors.length );
      this.setState({
        currentAuthor: this.state.quotes.data[randomQ].quoteAuthor,
        currentQuote: this.state.quotes.data[randomQ].quoteText,
        currentColor: this.state.colors[randomC]
      });
    }
  }
  

  render() {
    let twitterUrl = "https://twitter.com/intent/tweet?text=" + escape( `"${this.state.currentQuote}"\n\t- ${this.state.currentAuthor}`);
    let color = this.state.currentColor;
    if (this.state.quotes.error) {
      return (
        <div id="error">An error occured.</div>
      )
    } else if (!this.state.quotes.isLoaded) {
      return (
        <div id="loading">Loading ...</div>
      )
    }
    let classes = `flex justify-center items-center h-screen w-full bg-${color}-dark text-${color}-darkest`;
    return (
      <main className={classes}>
        <QuoteBox color={color}>
            <Quote quote={this.state.currentQuote} author={this.state.currentAuthor} />
            <div className="mt-4">
              <Button className="float-left" color={color} id="tweet-quote" href={twitterUrl}>
                <i className="fa fa-twitter"></i>
              </Button>
              <Button className="float-right" color={color} onClick={this.getRandomQuote} id="new-quote">
                <span>New Quote</span>
              </Button>
            </div>
        </QuoteBox>
      </main>

    );
  }
}

export default App;
