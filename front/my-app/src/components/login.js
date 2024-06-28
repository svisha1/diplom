import React from "react";
import '../css/main.css';
import img from "../img/logo2.png";
import Button from "./button";
import Image from "./image";
import Input from "./input";

class Login extends React.Component {
    constructor(props) {
        super(props);
        // Инициализируем состояния для email, пароля и сообщения об ошибке
        this.state = {
            email: "",
            password: "",
            error: ""
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

    // Обработчик отправки формы
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        
        try {
            // Отправка данных на сервер для аутентификации
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Проверка статуса ответа
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                this.setState({ isAuthenticated: true });
                window.location.href = '/';
            } else {
                // Если ответ с ошибкой, обновляем состояние с сообщением об ошибке
                const errorData = await response.json();
                this.setState({ error: errorData.message });
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            // Обработка других видов ошибок
        }
    }

    render() {
        const { error } = this.state;

        return (
            <div className="login-сontainer">
                <div className="container-imglog" style={{paddingLeft: "20px"}}>
                    <Image src={img} id="1" />
                </div>
                <div className="form-container">
                    <h1>Вход</h1>
                    <form onSubmit={this.handleSubmit} className="form-log">
                        <div className="form__group field">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Введите Email"
                                id="email"
                                className="form__field"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                required
                            />
                            <label htmlFor="email" className="form__label">Email</label>
                        </div>
                        <div className="form__group field">
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Введите пароль"
                                className="form__field"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                required
                            />
                            <label htmlFor="password" className="form__label">Пароль</label>
                        </div>
                        <Button type="submit" className="button" onClick={this.handleSubmit}>Войти</Button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;