import React from "react";
import '../css/main.css';

class Input extends React.Component {
    render() {
        const { type, name, id, placeholder, className, value, onChange, required } = this.props;
        return (
            <input
                type={type}
                name = {name}
                id={id}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={onChange}
                required={required}
            />
        );
    }
}

export default Input