import styles from './User.module.css';

const User = props => {
    return <li className={styles.user}
        key={props.id}>
        {`${props.id}. ${props.lastName}${props.firstName !== null ? ', ' + props.firstName : ''}`}
    </li>
};

export default User;