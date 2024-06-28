import React, { useState } from "react";
import "../css/capsulePage.css";
import capsule1 from "../img/capsule1.jfif";
import capsule3 from "../img/capsule3.jfif";
import likeIcon from "../img/like.png";
import CapsuleCard from "./capsuleCard";
import Gallery2 from "./gallery2";
import HeaderAdmin from "./headerAdmin";

const CapsulePage2 = () => {

    const tags = ["Деловой"];
    const description = "Белые брюки и топ подчеркнут вашу утонченность и аккуратность.";
    const links = [
        { name: "Топ", url: "https://www.wildberries.ru/catalog/183894519/detail.aspx?size=303041131" },
        { name: "Брюки", url: "https://www.wildberries.ru/catalog/182398637/detail.aspx?size=300871098" },
        { name: "Пиджак", url: "https://www.wildberries.ru/catalog/183358222/detail.aspx?size=302212528" },
    ];
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("Olesya"); // Установка статического имени пользователя
    const [likes, setLikes] = useState(1);

    const key1 = 1;
    const key2 = 3;
  
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() && userName.trim()) {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
            const comment = {
                userName,
                text: newComment,
                dateTime: formattedDate
            };
            setComments([comment, ...comments]); // Добавляем новый комментарий в начало массива
            setNewComment("");
        }
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleSaveCapsule = () => {
        alert("Капсула сохранена!");
    };

    return (
        <div className="capsule-page">
            <div className="grid1">
                <HeaderAdmin/>
            </div>
            <div className="grid2">
                <div className="gallery-container">
                    <Gallery2/>
                    <div className="gallery-footer">
                        <span className="likes">{likes}</span>
                        <button className="like-button" onClick={handleLike}>
                            <img src={likeIcon} alt="Like" className="like-icon" />
                        </button>
                        <button className="save-button" onClick={handleSaveCapsule} style={{marginLeft:"50px"}}>Сохранить капсулу</button>
                    </div>
                </div>
                <div className="info-container">
                    <a href="#" className="a_username">Olesya</a>
                    <h1 className="h1_name">Образ для собеседования на работу</h1>
                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <h2 className="description-title">Описание</h2>
                    <p className="description">{description}</p>
                    <h2 className="links-title">Ссылки</h2>
                    <ul className="links-list">
                        {links.map((link, index) => (
                            <li key={index} className="link-item">
                                <span className="link-name">{link.name}</span>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid3">
                <h2 className="comments-title">Комментарии</h2>
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <textarea
                        className="comment-input"
                        placeholder="Ваш комментарий"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="comment-button">Добавить комментарий</button>
                </form>
                <div className="comments-container">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <span className="comment-username">{comment.userName}:</span>
                            <span className="comment-text">{comment.text}</span>
                            <span className="comment-date">{comment.dateTime}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid4">
            <h2 className="related-title">Смотреть также</h2>
                <div className="related-capsules">
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
                            title="Образ для похода в ресторан"
                            userName="Olesya"
                            tags="Вечерний"
                            src = {capsule3}
                            index = {key2}
                        />
                </div>
            </div>
        </div>
    );
};



export default CapsulePage2;
