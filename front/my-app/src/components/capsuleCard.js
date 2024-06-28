import React from "react";
import "../css/capsuleCard.css";
import capsule5 from '../img/capsule5.jfif';
import Image from "./image";

class CapsuleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaved: false
        };
    }

    handleSaveToggle = () => {
        this.setState((prevState) => ({ isSaved: !prevState.isSaved }));
    };
    render() {
        const { title, userName, tags, src, index } = this.props;
        const { isSaved } = this.state;
        const test = {capsule5};
        return (
            <div className="capsule-card">
                <Image src={src} id="img_cardCapsule" />
                <p className="p-cardCapsule">{title}</p>
                <p className="p-cardCapsule">{userName}</p>
                <p className="p-cardCapsule">{tags}</p>
                <div className="a-container">
                    <a className="a-cardCapsule" href={`/capsule/${index}`}>Просмотреть</a>
                    <a className="a-cardCapsule" href="#" onClick={this.handleSaveToggle}> {isSaved ? "Удалить" : "Сохранить"}</a>
                </div>
            </div>
        );
    }
}

export default CapsuleCard