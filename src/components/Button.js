import React, { Component } from 'react';
class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let classes = `p-3 bg-${this.props.color}-darkest hover:bg-${this.props.color}-darker shadow-md text-${this.props.color}-lightest no-underline text-sm ` + this.props.className;

        return (
            <a href={this.props.href} className={classes} onClick={this.props.onClick} id={this.props.id}>
                {this.props.children}
            </a>
        );
    }
}

Button.defaultProps = {
    id: "",
    href: "#",
    onClick: null
  };

export default Button;