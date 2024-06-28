import React, { useState } from "react";
import '../css/header.css';
import img1_header from "../img/logo2.png";
import Image from "./image";
import InputSearch from "./searchInput";

const HeaderWithOutAuth = () => {
    const user = { id: 1, name: 'Olesya', bio: "Люблю красиво одеваться", photo: 'img3_header' };
    const userId = user.id;
    const [searchValue, setSearchValue] = useState("");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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

    return (
        <header>
            <a href="/">
                <Image src={img1_header} id="img1_header" />
            </a>
            <InputSearch value={searchValue} onChange={handleSearchChange} onKeyPress={handleKeyPress}/>
            <a href="/login" style={{color: "white", fontSize:"20px", fontWeight:"bold", textDecoration:"none", marginLeft:"45vw"}}>Вход</a>
            <a href="/reg" style={{color: "white", fontSize:"20px", fontWeight:"bold", textDecoration:"none", marginLeft:"50px"}}>Регистрация</a>
        </header>
    );
};

export default HeaderWithOutAuth;