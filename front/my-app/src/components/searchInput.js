import React from "react";
import '../css/search.css';

class InputSearch extends React.Component {
    render() {
        const { value, onChange, onKeyPress } = this.props;
        return (
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress = {onKeyPress}
                placeholder="Найти"
                className="input-search"
            />
        );
    }
}

export default InputSearch;
