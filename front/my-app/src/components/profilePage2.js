import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import "../css/profilePage.css";
import capsule1 from "../img/capsule1.jfif";
import capsule2 from "../img/capsule2.jfif";
import capsule3 from "../img/capsule3.jfif";
import CapsuleCard from './capsuleCard';
import Header from './header';
import HeaderAdmin from "./headerAdmin";
import HeaderWithOutAuth from "./header_withOut_Auth";

const ProfilePage2 = () => {
    const { user } = useContext(AuthContext);

    const [isSubscribed, setIsSubscribed] = useState(false);

    const [count, setCount] = useState(0);

    const handleSubscriptionToggle = () => {
        setIsSubscribed(!isSubscribed);
        setCount(prevCount => isSubscribed ? prevCount - 1 : prevCount + 1);
    };

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
                <img src="https://i.pinimg.com/564x/9d/8a/67/9d8a677dd9d964689969a30a1aa534d1.jpg" alt="Avatar" className="avatar" />
                    <div className="user-info">
                        <h1>Olesya</h1>
                        <div className="user-stats">
                            <a href="/">{count} Подписчики</a>
                            <a href="/">0 Подписки</a>
                        </div>

                        <p>{userInfo.description}</p>
                        <div className="profile-buttons">
                            <button className="edit-profile-button" onClick={handleSubscriptionToggle}>{isSubscribed ? "Отписаться" : "Подписаться"}</button>
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
                </div>
                <div className="profile-content">
                    {activeTab === 'myCapsules' && (
                        <div className="capsules-scroll-wrapper">
                            <div className="capsules-container" ref={capsulesContainerRef}>
                            <CapsuleCard 
                            key={key1}
                            title="Образ для комфортной прогулки по парку"
                            userName="Olesya"
                            tags="Уличный"
                            src = {capsule1}
                            index = {key1}
                        />
                                        <CapsuleCard 
                            key="2"
                            title="Образ для собеседования на работу"
                            userName="Olesya"
                            tags="Деловой"
                            src = {capsule2}
                            index = {key2}
                        />
                                        <CapsuleCard 
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

export default ProfilePage2;