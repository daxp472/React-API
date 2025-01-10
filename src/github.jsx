import React, { useEffect, useState } from 'react';

const GitHubUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://four-api-1.onrender.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>GitHub Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {/* Dynamically print all user properties */}
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GitHubUsers;
