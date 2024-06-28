import React from "react";
import '../css/main.css';

class DateOfBirthInput extends React.Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <div>
                <label htmlFor="dob" className="form__label" id="date">Дата рождения:</label>
                <input
                    type="date"
                    id="dob"
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default DateOfBirthInput;
