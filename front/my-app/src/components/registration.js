import React from "react";
import { AuthContext } from '../AuthContext';
import '../css/main.css';
import Button from "./button";
import DateOfBirthInput from "./dobInput";
import GenderInput from "./genderInput";
import Input from "./input";

class Registration extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        // Инициализируем состояния для email и пароля
        this.state = {
            email: "",
            password: "",
            passwordSecond: "",
            username: "",
            gender: "",
            dateOfBirth: ""
        };
    }

    // Обработчик изменения ввода email
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    // Обработчик изменения ввода пароля
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handlePasswordSecondChange = (event) => {
        this.setState({ passwordSecond: event.target.value });
    }

    handleUserNameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }
    handleDateOfBirthChange = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth
        };
    
        // Отправка данных на сервер
        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                this.context.login(data.token);
                window.location.href = '/';
            } else {
                // В случае, если сервер вернул сообщение об ошибке
                if (data.error) {
                    alert(data.error);
                } else {
                    // Если сервер не вернул токен и не вернул сообщение об ошибке
                    throw new Error('Ошибка при регистрации');
                }
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            // Обработка других видов ошибок
        });}

    render() {
        return (
            <div className="registration-сontainer">
                <div className="form-container">
                    <h1>Регистрация</h1>
                    <form onSubmit={this.handleSubmit} className="form-reg">
                    <div className="form2__group field">
                            <Input
                                type="text"
                                name = "username"
                                placeholder = "username"
                                id="username"
                                className = "form__field"
                                value={this.state.username}
                                onChange={this.handleUserNameChange}
                                required
                            />
                            <label htmlFor="username" className="form__label">UserName</label>
                        </div>
                        <div className="form2__group field">
                            <Input
                                type="password"
                                id="password"
                                name = "password"
                                placeholder = "Введите пароль"
                                className = "form__field"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                required
                            />
                            <label htmlFor="password" className="form__label">Пароль</label>
                        </div>
                        <div className="form2__group field">
                            <Input
                                type="email"
                                name = "email"
                                placeholder = "Введите Email"
                                id="email"
                                className = "form__field"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                required
                            />
                            <label htmlFor="email" className="form__label">Email</label>
                        </div>
                        <div className="form2__group field">
                            <Input
                                type="password"
                                id="passwordSecond"
                                name = "passwordSecond"
                                placeholder = "Введите пароль"
                                className = "form__field"
                                value={this.state.password}
                                onChange={this.handlePasswordSecondChange}
                                required
                            />
                            <label htmlFor="passwordSecond" className="form__label">Подтверждение пароля</label>
                        </div>
                        <div className="form2__group field">
                            <GenderInput
                                 value={this.state.gender}
                                 onChange={this.handleGenderChange}
                            />
                            <label className="form__label" id="gender">Выберите пол</label>
                        </div>
                        <div className="form2__group field">
                            <DateOfBirthInput
                                value={this.state.dateOfBirth}
                                onChange={this.handleDateOfBirthChange}
                            />
                        </div>
                        <Button type="submit" className="button2" onClick={this.handleSubmit}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration