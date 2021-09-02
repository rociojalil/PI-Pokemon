import React from 'react';
import PokeCards from '../PokeCards/pokecards';
import Footer from '../Home/Footer';
import Filters from '../Filtros/filters';
import Nav from '../Home/Nav';
import styles from './Home.module.css'


function Home() {
    
    return (

        <div className={styles.main}>
            <div>
                <Nav />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <Filters />
            </div>
            <div>
                <PokeCards />
            </div>
            <br />
            <br />
            <br />
            <br />
            <Footer/>
        </div>


    )
}

export default Home