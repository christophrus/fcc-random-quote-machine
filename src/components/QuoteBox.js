import React, { Component } from 'react';
class QuoteBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let classes = `w-2/3 bg-${this.props.color}-lighter p-4 shadow-md font-sans` + this.props.className;

        return (
            <div className={classes} id="quote-box">
                {this.props.children}
            </div>
        );
    }
}

export default QuoteBox;