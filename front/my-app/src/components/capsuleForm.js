import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import "../css/capsuleForm.css";
import Header from './header';
import Input from './input';

const CapsuleForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [links, setLinks] = useState([{ name: "", link: "" }]);
    const [images, setImages] = useState([]);
    const [tagOptions, setTagOptions] = useState([]); // State for tag options

    const navigate = useNavigate();


    useEffect(() => {
        // Fetch tags from API
        fetch('http://localhost:8080/api/admin/tags')
            .then(response => response.json())
            .then(data => {
                const options = data.map(tag => ({ value: tag.id, label: tag.name }));
                setTagOptions(options);
            })
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleTagsChange = (selectedOptions) => setTags(selectedOptions);
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);
    };

    const handleAddLink = () => {
        setLinks([...links, { name: "", link: "" }]);
    };

    const handleRemoveLink = (index) => {
        const newLinks = links.filter((_, i) => i !== index);
        setLinks(newLinks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.map(tag => tag.value);
        const capsuleData = { title, description, tags: tagsArray, links, images };
        navigate('/capsule/21', { state: { capsuleData } }); // Перенаправление с передачей данных
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'orange' : '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px orange' : 'none',
            '&:hover': {
                borderColor: 'orange'
            }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#e0e0e0',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#333',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#333',
            ':hover': {
                backgroundColor: 'orange',
                color: 'white',
            },
        }),
    };

    return (
        <div className='capsuleFormPage-container'>
            <Header />
            <div className='capsuleForm-container'>
                <form className="capsule-form" onSubmit={handleSubmit}>
                    <div className="form__group field capsuleName">
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Введите название"
                            className="form__field"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                        <label htmlFor="title" className='form__label'>Название капсулы:</label>
                    </div>
                    <div className="form__group field">
                        <textarea
                            id="description"
                            name="description"
                            placeholder=""
                            className="form__field"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                        <label htmlFor="description" className='form__label'>Описание:</label>
                    </div>
                    <div className="form__group field">
                        <Select
                            isMulti
                            name="tags"
                            options={tagOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={tags}
                            onChange={handleTagsChange}
                            styles={customStyles}
                        />
                        <label htmlFor="tags" className='form__label' style={{ fontSize: '20px' }}>Теги:</label>
                    </div>
                    <div className="form__group field links-list">
                        <label htmlFor="links" className='form__label' style={{ fontSize: '20px' }}>Ссылки на элементы гардероба:</label>
                        <div className="links-container">
                            {links.map((link, index) => (
                                <div key={index} className="link-inputs">
                                    <div className="number">{index + 1}</div>
                                    <Input
                                        type="text"
                                        name={`link-name-${index}`}
                                        placeholder="Название элемента"
                                        className="input-field link-input"
                                        value={link.name}
                                        onChange={(e) => handleLinkChange(index, "name", e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        name={`link-url-${index}`}
                                        placeholder="Ссылка на элемент"
                                        className="input-field link-input"
                                        value={link.link}
                                        onChange={(e) => handleLinkChange(index, "link", e.target.value)}
                                    />
                                    <button type="button" className="remove-link-button" onClick={() => handleRemoveLink(index)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="add-link-button" onClick={handleAddLink} style={{marginTop:'15px' }}>Добавить ссылку</button>
                    </div>
                    <div className="form__group field" style={{marginTop:'35px' }}>
                        <Input
                            type="file"
                            name="images"
                            id="images"
                            className="input-field input-none"
                            onChange={handleImagesChange}
                            multiple
                        />
                        <label htmlFor="images" className='form__label' style={{ fontSize: '20px', marginTop: '-15px'}}>Загрузить изображения:</label>
                        <label htmlFor="images" className='custom-file-upload'>Выбрать файл</label>
                        <div className="image-previews">
                            {images.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                    <button type="button" onClick={() => handleImageRemove(index)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className='button_capsuleForm'>Создать капсулу</button>
                </form>
            </div>
        </div>
    );
};

export default CapsuleForm;



