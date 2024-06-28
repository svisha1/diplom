import React, { useRef, useState } from "react";
import "../css/gallery.css";
import img from "../img/capsule1.jpg";
import img2 from "../img/capsule11.jpg";
import img3 from "../img/capsule12.jpg";
import img4 from "../img/capsule13.jpg";
import img5 from "../img/capsule14.jpg";


const Gallery1 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [img, img2, img3, img4, img5];
    const imageContainerRef = useRef(null);

    const back = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        scrollToImage(newIndex);
    };

    const next = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        scrollToImage(newIndex);
    };

    const scrollToImage = (index) => {
        const imageWidth = imageContainerRef.current.scrollWidth / images.length;
        imageContainerRef.current.scrollLeft = index * imageWidth;
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
        scrollToImage(index);
    };

    return (
            <div className="content">
                <div className="back" onClick={back}></div>
                <div className="thumbnails">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
                <div className="slide-panel" ref={imageContainerRef}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index + 1}`} className="gallery-image"/>
                    ))}
                </div>
                <div className="next" onClick={next}></div>
            </div>
    );
};

export default Gallery1;


