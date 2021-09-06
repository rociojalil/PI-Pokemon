import React from 'react'
import styles from './Nav.module.css'
import logo from './img/logo.png';
// import Buscador from './Buscador'

function Nav() {
    return (
        <div className={styles.navBar}>
            <div className={styles.dogApp}>
                <img src={logo} alt="logo" />
                {/* <i class="fas fa-paw"></i> */}
            </div >
            <ol className={styles.navigation}>
                <li><a href="/">Welcome</a></li>
                <li><a href="/home">Pokemons</a></li>
                <li><a href="/createBreed">Create a Pokemon!</a></li>
            </ol>
            <div>
                {/* <Buscador /> */}
            </div>
        </div>
    )
}

export default Nav