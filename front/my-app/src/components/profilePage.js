import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import "../css/profilePage.css";
import capsule2 from "../img/capsule2.jfif";
import capsule3 from "../img/capsule3.jfif";
import capsule4 from "../img/capsule4.jfif";
import capsule5 from "../img/capsule6.jfif";
import CapsuleCard2 from './capsuleCard2'; // Компонент карточки капсулы
import Header from './header';
import HeaderAdmin from "./headerAdmin";
import HeaderWithOutAuth from "./header_withOut_Auth";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const key1 = 1;
    const key2 = 2;
    const key3 = 3;
    const key4 = 4;
    const key5 = 5;
    const key6 = 6;

    let headerComponent;
    if (!user) {
        headerComponent = <HeaderWithOutAuth />;
    } else if (user.role === 'admin') {
        headerComponent = <HeaderAdmin />;
    } else {
        headerComponent = <Header />;
    }
    const [userInfo, setUserInfo] = useState(null);
    const [activeTab, setActiveTab] = useState('myCapsules');
    const capsulesContainerRef = useRef(null);
    const [userId, setUserId] = useState(null);

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

  
    const [capsules, setCapsules] = useState([
        // Пример данных капсул
        { id: 1, title: 'Capsule 1', image: 'path/to/image1.jpg', tag: 'Tag1' },
        { id: 2, title: 'Capsule 2', image: 'path/to/image2.jpg', tag: 'Tag2' },
        { id: 3, title: 'Capsule 3', image: 'path/to/image3.jpg', tag: 'Tag3' },
        { id: 4, title: 'Capsule 1', image: 'path/to/image1.jpg', tag: 'Tag1' },
        { id: 5, title: 'Capsule 2', image: 'path/to/image2.jpg', tag: 'Tag2' },
        { id: 6, title: 'Capsule 3', image: 'path/to/image3.jpg', tag: 'Tag3' },
    ]);

    const [savedCapsules, setSavedCapsules] = useState([
        // Пример данных сохраненных капсул
        { id: 7, title: 'Saved Capsule 1', image: 'path/to/image4.jpg', tag: 'Tag4' },
        { id: 8, title: 'Saved Capsule 2', image: 'path/to/image5.jpg', tag: 'Tag5' },
    ]);


    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/api/profile/${userId}`)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(error => console.error('Error fetching user info:', error));
        }
    }, [userId]);

    console.log(userId);
    console.log(userInfo);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const navigate = useNavigate();

    const handleEditProfileClick = () => {
      navigate(`/profile/${userId}/edit`);
    };
  
    const handleCreateCapsuleClick = () => {
      navigate(`/profile/${userId}/createCapsule`);
    };

    if (!userInfo) {
        return <div>Loading...</div>; // Показываем загрузочный экран, пока данные пользователя не будут загружены
    }

    return (
        <div className='profilePage-container'>
            {headerComponent}
            <div className="profile-page">
                <div className="profile-header">
                <img src="https://sun9-24.userapi.com/impg/BQ2WJsjv-ZwK6c5P4ERJw3HvjtZbvqPoOOEYTQ/SLYdqIvA1yc.jpg?size=960x1280&quality=95&sign=5d3b687ebd3654d2ffe0d51296e861da&type=album" alt="Avatar" className="avatar" />
                    <div className="user-info">
                        <h1>{userInfo.username}</h1>
                        <div className="user-stats">
                            <a href="/followers">{userInfo.followers} Подписчики</a>
                            <a href="/followers">{userInfo.following} Подписки</a>
                        </div>

                        <p>{userInfo.description}</p>
                        <div className="profile-buttons">
                            <button className="edit-profile-button" onClick={handleEditProfileClick}>Редактировать</button>
                            <button className="create-capsule-button" onClick={handleCreateCapsuleClick}>Создать капсулу</button>
                        </div>
                    </div>
                </div>
                <div className="profile-tabs">
                    <button
                        className={`tab-button ${activeTab === 'myCapsules' ? 'active' : ''}`}
                        onClick={() => handleTabClick('myCapsules')}
                    >
                        Капсулы
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'savedCapsules' ? 'active' : ''}`}
                        onClick={() => handleTabClick('savedCapsules')}
                    >
                        Сохраненные капсулы
                    </button>
                </div>
                <div className="profile-content">
                    {activeTab === 'myCapsules' && (
                        <div className="capsules-scroll-wrapper">
                            <div className="capsules-container" ref={capsulesContainerRef}>
                            <CapsuleCard2 
                            key="4"
                            title="Образ для похода в тренажерный зал"
                            userName="admin"
                            tags="Спортивный"
                            src = {capsule4}
                            index = {key4}
                        />
                                        <CapsuleCard2 
                            key="5"
                            title="Образ на выпускной"
                            userName="admin"
                            tags="Вечерний"
                            src = {capsule5}
                            index = {key5}
                        />
                                        <CapsuleCard2 
                            key="6"
                            title="Образ для универа"
                            userName="admin"
                            tags="Деловой"
                            src = 'https://i.pinimg.com/564x/b1/8a/e3/b18ae3738b6f45e6f48b7eb6037f135a.jpg'
                            index = {key6}
                        />
                            </div>
                        </div>
                    )}
                    {activeTab === 'savedCapsules' && (
                        <div className="capsules-scroll-wrapper">
                            <div className="capsules-container" ref={capsulesContainerRef}>
                            <CapsuleCard2 
                            key="2"
                            title="Образ для собеседования на работу"
                            userName="Olesya"
                            tags="Деловой"
                            src = {capsule2}
                            index = {key2}
                        />
                                        <CapsuleCard2 
                            key="3"
                            title="Образ для похода в ресторан"
                            userName="Olesya"
                            tags="Вечерний"
                            src = {capsule3}
                            index = {key3}
                        />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;