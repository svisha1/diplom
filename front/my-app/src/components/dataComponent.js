import React, { useEffect, useState } from 'react';

const DataComponent = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/data')
            .then(response => response.text())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default DataComponent;