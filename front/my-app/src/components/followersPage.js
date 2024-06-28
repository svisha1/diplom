import React from "react";
import "../css/followersPage.css"; // Подключите ваши CSS стили
import Header from "./header";

const followersData = [
  {
    id: 1,
    name: "Olesya",
    avatar: "https://i.pinimg.com/564x/9d/8a/67/9d8a677dd9d964689969a30a1aa534d1.jpg",
  },
];

const FollowersPage = () => {
  return (
    <div className="followersPage-container">
        <Header/>
        <div className="followers-page">
        <h1 style={{marginLeft:"40px"}}>Подписки</h1>
        <div className="followers-list">
            {followersData.map((follower) => (
            <div className="follower-item" key={follower.id}>
                <img src={follower.avatar} alt={`Avatar of ${follower.name}`} />
                <a href={`/user/0`}>{follower.name}</a>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default FollowersPage;
