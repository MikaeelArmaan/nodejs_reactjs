import React from 'react';
import styles from './Profile.module.scss';
import { connect } from 'react-redux';
import { ADMIN } from '../../../utils/UserTypes';


const Profile = ({ user, isAuthenticated }) => {
    const user_name = user && user.name ? user.name.split(' ') : ['User'];
    return (
        <>
            {
                (user && isAuthenticated) && (
                    <div className={styles['container']}>
                        <div className={styles['message']}>
                            <p>Welcome back, {user_name[0]}! 👋</p>
                            <p>{user.type === ADMIN ? 'Create and manage your' : 'View all'} documents from here.</p>
                        </div>
                        <div className={styles.profile}>
                            <img src={user.picture} alt='' />
                            <div className={styles['user-details']}>
                                <p>{user.email}</p>
                                {user.type === ADMIN && (
                                    <p>{user.type}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Profile)