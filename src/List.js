import { users } from "./data-mock";
import React, { useState, useEffect } from "react";
import styles from './List.module.css'

// TO DO:
// data source: file data-mock.js
// - display list of users in following pattern "1. lastName, firstName"
// - if firstName is not present, display only lastName so "1. lastName"
// - list should be filtered with input #filter-input
// - filter should check if lastName of user starts with query from input
// - filtering should NOT be case sensitive


export default function List() {
    const [usersState, setUsersState] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [startDefault, setStartDefault] = useState(true);

    useEffect(() => {
        users.then(
            data => setUsersState(data)
        )
    }, [])

    useEffect(() => {
        setFilteredUsers(filterInputUsers(usersState, searchInput))
        setStartDefault(false)
    }, [searchInput, usersState])

    const filterInputUsers = (array, input) => {
        let newArray = array.filter((user) => user.lastName.toUpperCase().includes(input.toUpperCase()));
        return newArray
    }

    const inputChangeHandler = (event) => {
        setSearchInput(event.target.value)
    }

    return (
        <React.Fragment>
            <a className={styles.gitLink}
                href="https://github.com/wolf-ed/filternames/tree/main/src"
                target="_blank"
                rel="noreferrer"
            >github.com/wolf-ed</a>
            <input
                className={styles.filterinput}
                id="filter-input"
                placeholder="Filter..."
                type="text"
                value={searchInput}
                onChange={inputChangeHandler} />
            {
                filteredUsers.length !== 20 && filteredUsers.length !== 0 ?
                    <p className={styles.usersfound}>
                        {`${filteredUsers.length} user${filteredUsers.length > 1 ? 's' : ''} found:`}
                    </p>
                    : ''
            }
            <ul className={styles.ul}>
                {
                    startDefault
                        ? usersState.map(user => {
                            return (<li key={user.id}>
                                {`${user.id}. ${user.lastName}${user.firstName !== null ? ', ' + user.firstName : ''}`}
                            </li>)
                        })

                        : filteredUsers.map(user => {
                            return (<li key={user.id}>
                                {`${user.id}. ${user.lastName}${user.firstName !== null ? ', ' + user.firstName : ''}`}
                            </li>)
                        })
                }
                {
                    filteredUsers.length === 0 && searchInput.length > 0 ? <p className={styles.usersfound}>No users found</p> : ''
                }
            </ul>
        </React.Fragment>
    );
}
