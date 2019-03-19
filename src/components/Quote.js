import React, { Component } from 'react';
class Quote extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="p-2 text-center text-2xl" id="text">
                    <i className="fa fa-quote-left"></i>
                    <span> {this.props.quote} </span>
                    <i className="fa fa-quote-right"></i>
                </div>
                <div className="p-2 text-right text-lg" id="author">
                    <span>- {this.props.author}</span>
                </div>
            </div>
        );
    }
}

export default Quote;