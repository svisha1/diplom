import React from "react";
import "../css/profileCard.css";
import Image from "./image";

const ProfileCard = ({ userName, src, index }) => {
    return (
        <div className="profile-card">
            <Image src={src} id="img-profileCard" />
            <p className="p-userNameCard">{userName}</p>
            <a href={`/user/${index}`} className="a-profileCard">Просмотреть</a>
        </div>
    );
};

export default ProfileCard