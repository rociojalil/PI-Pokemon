
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions/actions';
// import axios from 'axios';
import styles from './CreatePokemon.module.css'
import Nav from '../Home/Nav'
import Footer from '../Home/Footer'
import pokeimage from '../Home/img/pikachu.png'
import { useHistory} from 'react-router-dom';

function validateForm(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "You must type a name";
    } else {
        errors.name = "";
    }
    if (!input.defensa) {
        errors.defensa = "Type a valid defense range";
    } else if (!/\d{1,2} - \d{1,2}/g.test(input.defensa)) {
        errors.defensa =
            "Defense must have min-max values. Example: '10-100'";
    } else {
        errors.defensa = "";
    }
    if (!input.velocidad) {
        errors.velocidad = "Type a valid speed range";
    } else if (!/\d{1,2} - \d{1,2}/g.test(input.velocidad)) {
        errors.velocidad =
            "Speed must have min-max values. Example: '10-100'";
    } else {
        errors.velocidad = "";
    }
    if (!input.altura) {
        errors.altura = "Type a valid height range";
    } else if (!/\d{1,2} - \d{1,2}/g.test(input.altura)) {
        errors.altura =
            "Height must have min-max values. Example: '10-100'";
    } else {
        errors.altura = "";
    }
    if (!input.peso) {
        errors.peso = "Type a valid weight range";
    } else if (!/\d{1,2} - \d{1,2}/g.test(input.peso)) {
        errors.peso =
            "Weight must have min-max values. Example: '10-100'";
    } else {
        errors.peso = "";
    }
    

    if (!input.fuerza) {
        errors.fuerza = "Type a valid strength range";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.fuerza)) {
        errors.fuerza=
            "Strength must have min-max values. Example: '10-100'";
    } else {
        errors.height = "";
    }
    if (!input.vida) {
        errors.vida = "Type a valid life span";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.vida)) {
        errors.vida =
            "Life span must have min-max values. Example: '1-100'";
    } else {
        errors.vida = "";
    }
    return errors;
};


function CreatePokemon(props) {

    const dispatch = useDispatch();
    // me traigo los temperamentos del estado temps
    const temperaments = useSelector(state => state.temps)
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [touched, setTouched] = useState({});

// acá para guardarme datos del form - un objeto con todo 
    const [input, setInput] = useState({
        name: '',
        vida: '',
        fuerza: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        types: [],    //array vacío para crear más de uno
        imagen: '',
    })

    // const dispatch = useDispatch();
    // despachar para renderizar
    useEffect(() => {

        dispatch(getTypes())

    }, [dispatch])

// cada vez que cambian los inputs de todos los anteriores voy guardando lo que va escribiendo en mi estado input
    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
            );
            console.log(input)
    }
    // on focus para q aparezcan los mensajes de como debe ser los input
    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true,
        });
    }
    // acá enviar todos mis datos al back! crear personaje finalmente
    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input)) 
        alert("Your Pokémon has been created successfully!")
        setInput({
            idPokeCreado: '',
            name: '',
            vida: '',
            fuerza: '',
            defensa: '',
            velocidad: '',
            altura: '',
            peso: '',
            types: [],    //array vacío para crear más de uno
            imagen:''
        })
        history.push('/home')
    }

    // mensajitos de alerta con respecto a cuantos seleccionar + setInput para pasar muchos
    function handleSelect(e) {
        if (input.types.includes(parseInt(e.target.value))) {
            alert('You already selected this type. Try again.')
        } else if (input.types.length >= 3) {
            alert('You can select up to 3 types.')
        } else {
            // traeme lo que ya habia y concatenale el target value donde va a meter en un [] todo lo que yo agregue
            setInput((prev) => ({
                 ...prev, 
                 types: [...prev.types, parseInt(e.target.value)] }))
        }
    }

    function deleteTemp(e, t) {
        setInput((prev) => ({ ...prev, types: prev.types.filter(temp => temp !== parseInt(t)) }))
    }


    function getNames(arr) {
        let names = [];
        temperaments?.forEach((t) => {
            arr.forEach((id) => {
                if (parseInt(id) === t.id) {
                    names.push(t.name)
                }
            })

        })
        return names;
    }

    return (
        <div className={styles.main}>
                {/* así no hago botón para volver la barra de navegación se muestra siempre y así podes volver */}
                <Nav />
           
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className={styles.form}>
                <form onSubmit={e => {handleSubmit(e)}}>

                    <div className={styles.cards}>
                        <div>
                            <p className={styles.title}>How would you like your <br/>Pokémon to be?</p>
                            <p className={styles.inputNames}>Name</p>

                            <input
                                type="text"
                                name="name"
                                placeholder="Type..."
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.name}

                            ></input>
                            <br />
                            {errors.name && touched.name && (
                                <p className={styles.errorMsg}>{errors.name}</p>
                            )}
                        </div>
                        
                        <div >
                            <p className={styles.inputNames}>Life</p>
                            <input
                                type="text"
                                name="vida"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.vida}

                            ></input>
                            {errors.vida && touched.vida && (
                                <p className={styles.errorMsg}>{errors.vida}</p>
                            )}
                        </div>
                        <br />

                        <div >
                            <p className={styles.inputNames}>Strength</p>
                            <input
                                type="text"
                                name="fuerza"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.fuerza}

                            ></input>
                            {errors.fuerza && touched.fuerza && (
                                <p className={styles.errorMsg}>{errors.fuerza}</p>
                            )}
                        </div>
                        <br />
                        <div >
                            <p className={styles.inputNames}>Defense</p>
                            <input
                                type="text"
                                name="defensa"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.defensa}

                            ></input>
                            {errors.defensa && touched.defensa && (
                                <p className={styles.errorMsg}>{errors.defensa}</p>
                            )}
                        </div>

                        <br />
                        <div >
                            <p className={styles.inputNames}>Speed</p>
                            <input
                                type="text"
                                name="velocidad"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.velocidad}

                            ></input>
                            {errors.velocidad && touched.velocidad && (
                                <p className={styles.errorMsg}>{errors.velocidad}</p>
                            )}
                        </div>

                        <br />
                        <div >
                            <p className={styles.inputNames}>Height</p>
                            <input
                                type="text"
                                name="altura"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.altura}

                            ></input>
                            {errors.altura && touched.altura && (
                                <p className={styles.errorMsg}>{errors.altura}</p>
                            )}
                        </div>

                        <br />
                        <div >
                            <p className={styles.inputNames}>Weight</p>
                            <input
                                type="text"
                                name="peso"
                                placeholder="Type..."
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.peso}

                            ></input>
                            {errors.peso && touched.peso && (
                                <p className={styles.errorMsg}>{errors.peso}</p>
                            )}
                        </div>

                        <br />
                        
                        <div >
                            <p className={styles.inputNames}>Image:</p>
                            <input
                                type="url"
                                name="imagen"
                                // placeholder="Paste URL..."
                                onChange={handleInput}
                                required='required'
                                value={input.imagen}

                            ></input>
                          
                        </div>

                        <br />










                        <div >
                            <p className={styles.inputNames}>Types</p>
                            {/* a medida que selecciona el usuario ve lo que selecciona */}
                            <select name="types" onChange={(e) => handleSelect(e)} required value={input.types} className={styles.dropdown}>
                                <option>
                                    Select
                                </option>
                                {/* .id .name? */}
                                {temperaments?.map((e) => (
                                    <option value={e.id} key={e.id} >{e.name}</option>)
                                )}
                            </select>
                        </div>
                        <div className={styles.tempContainer}>
                            {
                                input.types.map(t => (
                                    <p id={t} className={styles.temp}>
                                        {getNames([t])}
                                        <button onClick={(e) => deleteTemp(e, t)} className={styles.closeBtn}>x</button>
                                    </p>
                                ))
                            }
                        </div>
                    
                        <br />
                        <button type='submit' className={styles.btnSubmit}>
                            Create!
                            <img src={pokeimage} alt="logo" 
                            style={{
                            position: "relative",
                            width: "35px",
                            
                            left: "3%",
                    }}/>
                        </button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default CreatePokemon

