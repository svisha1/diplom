import React from "react";
import "../css/capsuleCard.css";
import Image from "./image";

class CapsuleCard2 extends React.Component {
    render() {
        const { title, userName, tags, src, index } = this.props;
        return (
            <div className="capsule-card">
                <Image src={src} id="img_cardCapsule" />
                <p className="p-cardCapsule">{title}</p>
                <p className="p-cardCapsule">{userName}</p>
                <p className="p-cardCapsule">{tags}</p>
                <div className="a-container">
                    <a className="a-cardCapsule" href={`/capsule/${index}`}>Просмотреть</a>
                    <a className="a-cardCapsule" href="#">Удалить</a>
                </div>
            </div>
        );
    }
}

export default CapsuleCard2