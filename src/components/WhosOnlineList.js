import React from 'react'
function WhosOnlineList(props) {
    if(props.users) {
        return (
            <ul>
                { 
                    props.users.map((user, index) => {
                        return <li key={index}>{user.name} ({user.presence.state})</li>
                    })
                }   
            </ul>
        )
    } else {
        return <p>Loading...</p>
    }

}

export default WhosOnlineList