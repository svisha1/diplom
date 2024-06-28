import React, { useState } from 'react';
import '../css/searchResultsPage.css';
import CapsuleCard from './capsuleCard';
import HeaderAdmin from './headerAdmin';
import ProfileCard from './profileCard';

const SearchResultsPage = () => {
    const [showCapsules, setShowCapsules] = useState(true);
    const [filter, setFilter] = useState('new');

    const capsuleResults = [
        {
            id: 1,
            title: 'Образ для универа',
            userName: 'admin',
            tags: 'Деловой',
            date: '2024-06-01',
            likes: 10,
            src: 'https://i.pinimg.com/564x/b1/8a/e3/b18ae3738b6f45e6f48b7eb6037f135a.jpg',
        },
        {
            id: 2,
            title: 'Образ для собеседования на работу',
            userName: 'Olesya',
            tags: 'Деловой',
            date: '2024-05-20',
            likes: 20,
            src: 'https://i.pinimg.com/736x/5e/7f/7b/5e7f7bb45f58b01cf34fd7f679c3e4b0.jpg',
        },
    ];
    
    const userResults = [

    ];
    

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const sortResults = (results) => {
        switch (filter) {
            case 'new':
                return [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'old':
                return [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'popular':
                return [...results].sort((a, b) => b.likes - a.likes);
            default:
                return results;
        }
    };

    const filteredCapsules = sortResults(capsuleResults);
    const filteredUsers = sortResults(userResults);

    console.log(capsuleResults[0].src);

    return (
        <div className='search-results-page-container'>
            <HeaderAdmin/>
        <div className="search-results-page">
            <div className="filter-container">
                <ul className="view-options">
                    <li
                        className={showCapsules ? 'active' : ''}
                        onClick={() => setShowCapsules(true)}
                    >
                        Капсулы
                    </li>
                    <li
                        className={!showCapsules ? 'active' : ''}
                        onClick={() => setShowCapsules(false)}
                    >
                        Пользователи
                    </li>
                </ul>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="new">Сначала новые</option>
                    <option value="old">Сначала старые</option>
                    <option value="popular">Сначала популярные</option>
                </select>
            </div>
            <div className="results-container">
                {showCapsules
                    ? filteredCapsules.map((capsule, index) => (
                        <CapsuleCard 
                        key={index}
                        title={capsule.title}
                        userName={capsule.userName}
                        tags={capsule.tags}
                        src = {capsule.src}
                        index = {index}
                    />
                      ))
                    : filteredUsers.map((user, index) => (
                          <ProfileCard key={index} user={user} />
                      ))}
            </div>
        </div>
        </div>
    );
};

export default SearchResultsPage;
