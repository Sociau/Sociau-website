import { useState } from 'react';
import iconUser from '../../assets/icons/icon-user.svg'
import "./styles.css";

const ProfileButtonFragment = ({ isLogged }: { isLogged: boolean }) => {

    return (
        <section className='profile-button'>
            <p>Olá, aumigo <img src={iconUser} alt="User icon" /></p>
        </section>
    )
}

export default ProfileButtonFragment;