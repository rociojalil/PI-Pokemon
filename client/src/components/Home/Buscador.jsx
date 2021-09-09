import React from 'react'
import { useDispatch } from 'react-redux'
import {  useState, useEffect } from 'react'
import { getId } from '../../actions/actions';
import styles from './Buscador.module.css';

function Buscador() {
    const [busqueda, setBusqueda] = useState('');

    const handleChange = (b) => {
        setBusqueda(b)
    }

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getId(busqueda))
    }

    // const breed = useSelector((state) => state.breeds)


    return (
        <div className={styles.searchBox}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.searchBox}>
                    <input className={styles.input}
                        type='text'
                        // value={busqueda}
                        placeholder='Type...'
                        onChange={(e) => handleChange(e.target.value)}
                        />
                        <input className={styles.input}
                         type="submit" value= "Search" />
                         <div className={styles.icon}>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Buscador
