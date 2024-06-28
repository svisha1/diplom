import React, { useEffect, useState } from "react";
import '../css/header.css';
import img3_header from "../img/avatar.jpg";
import img1_header from "../img/logo2.png";
import img2_header from "../img/notification.png";
import Image from "./image";
import InputSearch from "./searchInput";

const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [userId, setUserId] = useState(null); // Стейт для хранения ID пользователя

    useEffect(() => {
        // Получаем токен из локального хранилища
        const token = localStorage.getItem('token');
        if (token) {
            // Парсим токен и извлекаем ID пользователя
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.sub; // ID пользователя из токена
            setUserId(userId);
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Вызываем метод для выполнения поиска
        }
    };

    const handleSearch = () => {
        // Здесь можно выполнить логику поиска             
        console.log('Выполняем поиск по запросу:', searchValue);
        setSearchValue("");
    };

    const handleNotificationClick = (event) => {
        event.preventDefault();
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена из локального хранилища
        window.location.reload(); // Перезагрузка страницы
    };

    return (
        <header>
            <a href="/">
                <Image src={img1_header} id="img1_header" />
            </a>
            <InputSearch value={searchValue} onChange={handleSearchChange} onKeyPress={handleKeyPress}/>
            <a href="" onClick={handleNotificationClick}>
                <Image src={img2_header} id="img2_header" />
            </a>
            <a href={`/profile/${userId}`} className="a3" style={{marginLeft:'50vw'}}>
                <Image src={img3_header} id="img3_header" />
            </a>
            <a href="/" onClick={handleLogout} style={{color: "white", fontSize:"20px", fontWeight:"bold", textDecoration:"none", marginLeft:"150px"}}>Выход</a>
            {isNotificationOpen && (
                <div className="notification">
                    Уведомления
                </div>
            )}
        </header>
    );
};

export default Header;

