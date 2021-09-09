import styles from './pokecards.module.css'
import LazyLoad from 'react-lazyload'
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons} from '../../actions/actions';
// import image from '../perrito_panzon.jpg'
import { Link } from 'react-router-dom';


function PokeCards() {


    

    // guardar en estados locales

    // estado con mi pagina actual seteado en 1
    const [currentPage, setCurrentPage] = useState(1)
    // perros x pagina 8
    const [dogsPerPage, setDogsPerPage] = useState(9)
    // indice del ultimo dog va a ser la pagina actual donde estoy x la cantidad de perros x pag. indexoflastItem son 8
    const indexOfLastItem = currentPage * dogsPerPage;
    // indice primer dog. indice del ultimo menos dogs x pagina eso da 0
    const indexOfFirstItem = indexOfLastItem - dogsPerPage;
    // todos dogs que van a estar en la pagina actual me los traigo con useSelector
    const breed = useSelector((state) => state.pokemons);
    // slice: toma porcion el [] - que agarre el primero(0) y el ultimo (7 o 8)? toma el ultimo o no lo toma
    const currentItems = breed?.slice(indexOfFirstItem, indexOfLastItem);


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }
 
    const pages = [];
    // math-ceil redondea para arriba me renderiza todos los personajes x la cantidad q quiero x pag
    for (let i = 1; i <= Math.ceil(breed?.length / dogsPerPage); i++) {
        pages.push(i);
    }



    const [pageNumberLimit, setpageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0)



   
    

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? styles.active : null}
                >

                    {number}

                </li>
            )
        } else {
            return null;
        }

    })


    const dispatch = useDispatch();

    // eslint-disable-next-line
    useEffect(() => {
        dispatch(getPokemons());
    }, []);



    const handleNext = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }


    const filteredBreeds = useSelector((state) => state.filter);


    function displayBreeds(array) {

        const breedsToDisplay = array

        if (typeof breedsToDisplay === "string") {
            return (
                <div className={styles.cardError}>

                    <p className={styles.msgError}>We could not find the pokémon </p>
                    <br />
                    <img alt="Not Found" height="400px" width="350px" />
                </div>

            )
        } else {
            return breedsToDisplay?.length ? (
                breedsToDisplay.map(d => {
                    return (
                        <div>

                            <LazyLoad>
                                    <br />
                                    <div className={styles.cardContainer}>
                                        <div className={styles.cardName}>{d.name}</div>
                                        {/* <div className={styles.cardName}>{d.imagen}</div> */}
                                        <img
                                            src={d.imagen}
                                                //  height="74%"
                                                style={{ objectFit: "contain", borderRadius: "1rem", marginTop: "2vh" }}
                                                 />
                                        

                                        {/* {d.id.length ?
                                            
                                            <LazyLoad><img src='https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg' /></LazyLoad>

                                            :

                                            (d.id === 15 || d.id === 125 || d.id === 212) ?
                                                <img  alt="Not Found" />
                                                :
                                                <img alt="Not Found" />



                                        } */}

                                            <div className={styles.detail}>
                                                <Link  to={`/pokeid/${d.id}`} style={{ color: "black", textDecoration: "none" }}>
                                                <p>
                                                    Detail
                                                </p>
                                                </Link>
                                            </div>
                                            


                                    </div>
                            </LazyLoad>




                        </div >
                    )
                })

            ) : <div > 
                <p className={styles.doggy}>No Pokémon</p>
                <iframe src="https://giphy.com/embed/L95W4wv8nnb9K" width="480" height="273" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/L95W4wv8nnb9K">via GIPHY</a></p>
        
              
          </div>

                // <div className={styles.containerLoading}>
                //     <p className={styles.msgCharge}>Loading...</p>
                // </div>
        }

    }


    return (
        <div>
            
            
            <div className={styles.main}>
                {/* primero fijate si hay algo si es asi renderiza mi filtro si no mostra mensaje de error */}
                {filteredBreeds?.length > 0 ?
                    displayBreeds(filteredBreeds)
                    :
                    displayBreeds(currentItems)
                }
                {/* <Pagination breedsPerPage={breedsPerPage} totalBreeds={breeds.length} paginate={paginate} /> */}
            </div>

            <div>
                <ul className={styles.pagination}>
                    <li>
                        <button onClick={handlePrev}
                            disabled={currentPage === pages[0] ? true : false}>
                            Prev
                        </button>
                    </li>
                    {renderPageNumbers}
                    <li>
                        <button onClick={handleNext}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default PokeCards;
