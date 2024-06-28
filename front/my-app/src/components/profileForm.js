import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../css/profileForm.css';
import Header from './header';
import HeaderAdmin from "./headerAdmin";
import HeaderWithOutAuth from "./header_withOut_Auth";

const ProfileEditForm = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    let headerComponent;
    if (!user) {
        headerComponent = <HeaderWithOutAuth />;
    } else if (user.role === 'admin') {
        headerComponent = <HeaderAdmin />;
    } else {
        headerComponent = <Header />;
    }
    const [userInfo, setUserInfo] = useState({
        username: '',
        description: '',
        gender: '',
        birthDate: '',
        avatar: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoFileName, setPhotoFileName] = useState('');
    const [userId, setUserId] = useState(null);
    const [updatedUser, updateUser] = useState(null);

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

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/api/profile/${userId}`)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(error => console.error('Error fetching user info:', error));
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('description', userInfo.description);
        if (photoFile) {
            formData.append('avatar', photoFile);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/profile/${userInfo.email}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                navigate(`/profile/${userInfo.email}`);
            } else {
                console.error('Error updating profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>; // Показываем загрузочный экран, пока данные пользователя не будут загружены
    }

    return (
    <div className="profile-edit-page-container">
        {headerComponent}
        <div className="profile-edit-container">
            <h2>Редактировать профиль</h2>
            <form className="profile-edit-form" onSubmit={handleSubmit}>
                <div className="form__group field">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        className = "form__field"
                        style={{ marginTop: '10px'}}
                        required
                    />
                    <label htmlFor="username" className='form__label' style={{ fontSize: '20px'}}>Имя пользователя:</label>
                </div>
                <div className="form__group field">
                    <textarea
                        id="description"
                        name="description"
                        value={userInfo.description}
                        onChange={handleChange}
                        className = "form__field"
                        style={{ marginTop: '10px'}}
                        required
                    />
                    <label htmlFor="description" className='form__label' style={{ fontSize: '20px'}}>Описание:</label>
                </div>
                <div className="form-group">
                    <label htmlFor="photo" style={{ fontSize: '20px'}}>Фотография:</label>
                    <label htmlFor="photo" className='custom-file-upload-profile' style={{ marginTop: '10px', color:'white'}}>Выбрать файл</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handlePhotoChange}
                        className="input-field input-none"
                    />
                     {photoFile && (
                            <img
                                src={URL.createObjectURL(photoFile)}
                                alt="Profile"
                                className="profile-photo-preview"
                            />
                        )}
                </div>
                <div className="form__group field">
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value="Female"
                        className = "form__field"
                        style={{ marginTop: '15px', paddingLeft: '5px'}}
                        disabled
                    />
                    <label htmlFor="gender" className='form__label' style={{ fontSize: '20px'}}>Пол:</label>
                </div>
                <div className="form__group field">
                    <input
                        type="text"
                        id="birthDate"
                        name="birthDate"
                        value="20.09.2002"
                        className = "form__field"
                        style={{width: '97%', marginTop: '15px', paddingLeft: '5px'}}
                        disabled
                    />
                    <label htmlFor="birthDate" className='form__label' style={{ fontSize: '20px'}}>Дата рождения:</label>
                </div>
                <button type="submit" style={{marginTop: '15px', width: '80.5%'}}>Сохранить изменения</button>
            </form>
        </div>
    </div>
    );
};

export default ProfileEditForm;


