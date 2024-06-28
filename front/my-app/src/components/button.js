import React from "react";
import '../css/main.css';

class Button extends React.Component {
    render() {
        const { type, className, onClick, children } = this.props;
        return (
            <button type={type} className={className} onClick={onClick}>
                {children}
            </button>
        );
    }
}

export default Button