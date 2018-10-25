import React from 'react';

const UserData = props => {
    return (
        <div>
            <h2>User Data</h2>

            {!props.isLoading && Object.keys(props.userData).length !== 0 ? (

                <div className="user">
                    <p className="user__text">
                        <span>{props.userData.name}</span>
                    </p>
                    <p className="user__text">
                        <span>{props.userData.username}</span>
                    </p>
                    <p className="user__text">
                        <span>{props.userData.email}</span>
                    </p>
                </div>
            ): (
                <p className="error">Keinen Benutzer mit der ID {props.userData.userId} gefunden</p>
            )}
        </div>
    );
};

export default UserData;