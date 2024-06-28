import React from "react";

class Image extends React.Component {
    render() {
        const { src, id } = this.props;
        return (
            <img
                src={src}
                id={id}
            />
        );
    }
}

export default Image;