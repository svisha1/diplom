import React, { useEffect, useState } from 'react';
import '../css/adminPanel.css';
import HeaderAdmin from './headerAdmin';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('tags');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
      <div className="admin-panel-page-container">
        <HeaderAdmin/>
          <div className="admin-panel-container">
              <div className="tabs">
                  <button onClick={() => handleTabChange('tags')} className={activeTab === 'tags' ? 'active' : ''}>Теги</button>
                  <button onClick={() => handleTabChange('events')} className={activeTab === 'events' ? 'active' : ''}>События</button>
                  <button onClick={() => handleTabChange('users')} className={activeTab === 'users' ? 'active' : ''}>Пользователи</button>
              </div>
              <div className="tab-content">
                  {activeTab === 'tags' && <TagsTab />}
                  {activeTab === 'events' && <EventsTab />}
                  {activeTab === 'users' && <UsersTab />}
              </div>
          </div>
        </div>
    );
};

const TagsTab = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/tags')
            .then(response => response.json())
            .then(data => setTags(data));
    }, []);

    const handleAddTag = () => {
        if (newTag) {
            fetch('http://localhost:8080/api/admin/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newTag }),
            })
            .then(response => response.json())
            .then(tag => setTags([tag, ...tags]));
            setNewTag('');
        }
    };

    const handleRemoveTag = (name) => {
        fetch(`http://localhost:8080/api/admin/tags/${name}`, { method: 'DELETE' })
            .then(() => setTags(tags.filter(tag => tag.name !== name)));
    };

    return (
        <div className="tags-tab form__group field" style={{width:'100%'}}>
            <h3>Управление тегами</h3>
            <input
                type="text"
                id="tag_input"
                name="tag_input"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className = "form__field"
                placeholder="Добавить новый тег"
            />
            <label htmlFor="tag_input" className='form__label' style={{marginTop:'40px'}}>Добавить новый тег:</label>
            <button onClick={handleAddTag}>Добавить тег</button>
            <ul className='tag_ul'>
                {tags.map(tag => (
                    <li key={tag.name} id ={tag.id} >
                        {tag.name} <button onClick={() => handleRemoveTag(tag.name)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const EventsTab = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', text: '', date: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedEvent, setEditedEvent] = useState({ title: '', text: '', date: '' });

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.text && newEvent.date) {
            fetch('http://localhost:8080/api/admin/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            })
            .then(response => response.json())
            .then(event => setEvents([event, ...events]));
            setNewEvent({ title: '', text: '', date: '' });
        }
    };

    const handleRemoveEvent = (date) => {
        fetch(`http://localhost:8080/api/admin/events/${date}`, { method: 'DELETE' })
            .then(() => setEvents(events.filter(event => event.date !== date)));
    };

    const handleEditEvent = (index) => {
        setEditingIndex(index);
        setEditedEvent(events[index]);
    };

    const handleSaveEvent = () => {
        fetch(`http://localhost:8080/api/admin/events/${events[editingIndex].id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedEvent),
        })
        .then(response => response.json())
        .then(updatedEvent => {
            const newEvents = [...events];
            newEvents[editingIndex] = updatedEvent;
            setEvents(newEvents);
            setEditingIndex(null);
            setEditedEvent({ title: '', text: '', date: '' });
        });
    };

    return (
        <div className="events-tab form__group field" style={{width:'100%'}}>
            <h3>Управление событиями</h3>
            <input
                type="text"
                id="name_event"
                name="name_event"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Заголовок"
                className = "form__field"
            />
            <label htmlFor="name_event" className='form__label' style={{marginTop:'40px'}}>Заголовок:</label>
            <div className="form__group field">
                <textarea
                    value={newEvent.text}
                    id="des_event"
                    name="des_event"
                    onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
                    placeholder="Текст"
                    style={{width:'125%'}}
                    className = "form__field"
                />
                <label htmlFor="des_event" className='form__label'>Текст:</label>
            </div>
            <input
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className = "form__field"
            />
            <button onClick={handleAddEvent}>Добавить событие</button>
            <ul className='des_ul'>
                {events.map((event, index) => (
                    <li key={event.id}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedEvent.title}
                                    onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                                />
                                <textarea
                                    value={editedEvent.text}
                                    onChange={(e) => setEditedEvent({ ...editedEvent, text: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    value={editedEvent.date}
                                    onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                                />
                                <button onClick={handleSaveEvent}>Сохранить</button>
                            </>
                        ) : (
                            <>
                                <h4>{event.title}</h4>
                                <p style={{paddingLeft:'50px', paddingRight:'10px'}}>{event.text}</p>
                                <p>{event.date}</p>
                                <button onClick={() => handleEditEvent(index)}>Редактировать</button>
                                <button style={{marginLeft:"5px"}} onClick={() => handleRemoveEvent(event.date)}>Удалить</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UsersTab = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleRoleChange = (index, newRole) => {
        const user = users[index];
        fetch(`http://localhost:8080/api/admin/users/${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: newRole }),
        })
        .then(response => response.json())
        .then(updatedUser => {
            const newUsers = [...users];
            newUsers[index] = updatedUser;
            setUsers(newUsers);
        });
    };

    const handleBlockUser = (username) => {
        fetch(`http://localhost:8080/api/admin/users/${username}`, { method: 'DELETE' })
            .then(() => setUsers(users.filter(user => user.username !== username)));
    };



    return (
        <div className="users-tab">
            <h3>Управление пользователями</h3>
            <ul className='us_ul'>
                {users.map((user, index) => (
                    <li key={user.username}>
                        <span>{user.username}</span>
                        <select value={user.role} onChange={(e) => handleRoleChange(index, e.target.value)}>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                        <button onClick={() => handleBlockUser(user.username)}>Заблокировать</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

