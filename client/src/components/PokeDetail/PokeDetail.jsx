
// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../../actions/actions'
import Nav from '../Home/Nav'
import Footer from '../Home/Footer';
import styles from './PokeDetail.module.css'
import LazyLoad from 'react-lazyload'

function PokeDetail({ match }) {


    const { id } = match.params


    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch])

    const pokemon = useSelector(state => state.detail)


        return (
            <div className={styles.main}>
                <div>
                    <Nav />
                </div>
                <br />
                <br />
                <br />
    
                <LazyLoad>
                <div className={styles.dogDetail}>
                    <br />
                    <p className={styles.dogName}><br />{pokemon?.name.toUpperCase()}</p>
    
                    <br />
                    <br />
    
                    <img className={styles.dogImage} src={pokemon?.imagen}/>
    
                    <br />
                    <br />
                    <p className={styles.dogTemp}>Types:</p>
                    <p className={styles.tempBD}>
                    
                    {pokemon?.types.map((t) => t[0].toUpperCase() + t.slice(1))
                    .join(' - ')}
                    
                    </p>

                    {/* <p><br />{pokemon?.types}</p> */}
                    {/* {pokemon?.types.map((e) => (
                                   <p value={e.id} key={e.id} >{e.name}</p>)
                                )} */}
        
    
                    <br />
    
                    <p className={styles.dogWeight}>Vida: <br /> {pokemon?.vida} Kg.</p>
    
                    <br />
    
                    <p className={styles.dogHeight}>Fuerza: <br />{pokemon?.fuerza} cm.</p>
    
                    <br />
    
                    <p className={styles.dogLife}>Defensa <br /> {pokemon?.defensa}</p>
    
                </div>
                </LazyLoad>
                <Footer/>
            </div>
    
        )
    }

    
export default PokeDetail;
