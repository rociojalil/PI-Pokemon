import React, { useEffect, useState } from 'react'
import {filter, masFuerza, menosFuerza, getTypes, getZA, getSource, getAZ } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux'
import styles from './Order.module.css'

function Order() {

    const [selectedTemp, setSelectedTemp] = useState('')
    const [tempToFilterBy, setTempToFilterBy] = useState([])

    const dispatch = useDispatch()

    // Filtro orden alfabético
    function orderAlph(e) {
        e.preventDefault();
        if(e.target.value === 'getAZ') {
            dispatch(getAZ())
        }
        else{
            dispatch(getZA())
        }
    }

    // function orderAsc(e) {
    //     e.preventDefault();
    //     dispatch(getAZ())
    // }

    // filtro Peso
    function orderWeight(e){
        e.preventDefault();
        if(e.target.value === 'menosFuerza') {
            dispatch(menosFuerza())
        }
        else{
            dispatch(masFuerza())
        }
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    // Filtro Temperament

    function handleSubmit(e) {
        e.preventDefault();
        setTempToFilterBy([...tempToFilterBy, selectedTemp]);
        handleClick()
    }

    function handleChange(e) {
        setSelectedTemp(e.target.value)
    }

    function handleClick() {
        let filtered = []
        pokemons?.forEach((b) => {
            if (b.id.length) {
                b.Types.map(t =>
                    t.name === selectedTemp ? filtered.push(b) : null
                )
            } else {
                if (b.types?.includes(selectedTemp)) {
                    filtered.push(b)
                } 
        }})

        dispatch(filter(filtered))
    }

        // Filtro BD-API
        function handleSelect(e){
            dispatch(getSource(e.target.value))
        }

    const temp = useSelector(state => state.temps)
    const pokemons = useSelector(state => state.pokemons)

  
    return (
        <div className={styles.contenedor}>
            <form className={styles.conteiner}>
                <select className={styles.btn} onChange={orderAlph} value='' name="by">
                    <option value="" disabled selected>Order by Alphabet </option>
                    <option value='getAZ'onClick={(e) => getAZ(e)}>Alphabet - A-Z</option>
                    <option value='getZA'onClick={(e) => getZA(e)}>Alphabet - Z-A</option>
                </select>
            </form>
    
            <form className={styles.weight}>
                <select className={styles.btn} onChange={orderWeight} value='' name="by">
                    <option value="" disabled selected>Order by Attack</option>
                    <option value='menosFuerza'onClick={(e) => menosFuerza(e)}>Min - Max</option>
                    <option value='masFuerza'onClick={(e) => masFuerza(e)}>Max - Min</option>
                </select>
            </form>


        <div className={styles.temperaments}>
            <form className={styles.btn1} onSubmit={handleSubmit}>
                <select className={styles.btn1} onChange={handleChange} name="temperaments" value={selectedTemp} type='text'>
                    <option value="" disabled selected>Filter by Types...</option>
                    {temp?.map(t => {
                        return (
                            <option  value={t.name}>{t.name}</option>
                        )
                        })}
                    
                </select>
                    <button type="submit" className={styles.btn1}> Search </button>
            </form>
            </div>

            <div className={styles.source}>
            <form>
                <select className={styles.btn2} onChange={handleSelect}> 
                    <option value="" disabled selected>Select source</option>
                    <option value='DB'>Created</option>
					<option value='API'>API</option>
                    <option value="ALL">ALL</option>	
                </select>
               
            </form>
            </div>
          </div>
    )
}

export default Order;
