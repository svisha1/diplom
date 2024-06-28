import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import "../css/mainPage.css";
import capsule1 from "../img/capsule1.jfif";
import capsule2 from "../img/capsule2.jfif";
import capsule3 from "../img/capsule3.jfif";
import CapsuleCard from "./capsuleCard";
import Header from "./header";
import HeaderAdmin from "./headerAdmin";
import HeaderWithOutAuth from "./header_withOut_Auth";
import ProfileCard from "./profileCard";

const MainPage = () => {
    const [users, setUsers] = useState([]);
    const [capsules, setCapsules] = useState([]);
    const { user } = useContext(AuthContext);

    const userId = user ? user.id : null; 

    const key1 = 1;
    const key2 = 2;
    const key3 = 3;
    const key4 = 4;
    const key5 = 5;
    const key6 = 6;

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.slice(1, 5)))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/capsules')
            .then(response => response.json())
            .then(data => setCapsules(data.slice(0, 9)))
            .catch(error => console.error('Error fetching capsules:', error));
    }, []);

    let headerComponent;
    if (!user) {
        headerComponent = <HeaderWithOutAuth />;
    } else if (user.role === 'admin') {
        headerComponent = <HeaderAdmin />;
    } else {
        headerComponent = <Header />;
    }

    return (
        <div className="main-page">
            {headerComponent}
            <div className="recommended-capsules">
                <h2>Рекомендованные капсулы</h2>
                <div className="capsule-cards">
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
            <div className="recommended-users" style={{paddingLeft:"162px", paddingRight:"160px"}}>
                <h2>Рекомендованные пользователи</h2>
                <div className="profile-cards">
                    {users.map((user, index) => (
                        <ProfileCard key={index} userName={user.username} src={user.avatar} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;