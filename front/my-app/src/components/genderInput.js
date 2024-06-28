import React from "react";
import '../css/main.css';

class GenderInput extends React.Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <div className="form_radio">
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={value === "male"}
                        onChange={onChange}
                    />
                    Мужчина
                </label>
                <label id="radio2">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={value === "female"}
                        onChange={onChange}
                    />
                    Женщина
                </label>
            </div>
        );
    }
}

export default GenderInput;
