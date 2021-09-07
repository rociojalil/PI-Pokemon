// import styles from './pokecards.module.css'
// import LazyLoad from 'react-lazyload'
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getBreeds } from '../actions/actions';
// // import image from '../perrito_panzon.jpg'
// import { Link } from 'react-router-dom';


//     function displayBreeds(array) {

//         const breedsToDisplay = array

//         if (typeof breedsToDisplay === "string") {
//             return (
//                 <div className={styles.cardError}>

//                     <p className={styles.msgError}>We could not find the breed </p>
//                     <br />
//                     <img src={image} alt="Not Found" height="400px" width="350px" />
//                 </div>

//             )
//         } else {
//             return breedsToDisplay?.length ? (
//                 breedsToDisplay.map(d => {
//                     return (
//                         <div>

//                             <LazyLoad>
//                                     <br />
//                                     <div className={styles.cardContainer}>
//                                         <div className={styles.cardName}>{d.name}</div>
                                        

//                                         {d.id.length ?
                                            
//                                             <LazyLoad><img src='https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg' /></LazyLoad>

//                                             :

//                                             (d.id === 15 || d.id === 125 || d.id === 212) ?
//                                                 <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.png'} alt="Not Found" />
//                                                 :
//                                                 <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.jpg'} alt="Not Found" />



//                                         }

//                                             <div className={styles.detail}>
//                                                 <Link  to={`/dogs/${d.id}`} style={{ color: "black", textDecoration: "none" }}>
//                                                 <p>
//                                                     Detail
//                                                 </p>
//                                                 </Link>
//                                             </div>
                                            


//                                     </div>
//                             </LazyLoad>




//                         </div >
//                     )
//                 })

//             ) : <div > 
//                 <p className={styles.doggy}>No dogs</p>
//             <iframe  src="https://giphy.com/embed/7XuKKmGiaxXe6EjOj4" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
//             <p><a href="https://giphy.com/gifs/dog-face-front-camera-7XuKKmGiaxXe6EjOj4">Gif</a></p>
        
              
//           </div>

//                 // <div className={styles.containerLoading}>
//                 //     <p className={styles.msgCharge}>Loading...</p>
//                 // </div>
//         }

//     }

//     return (
//         <div>
            
            
//             <div className={styles.main}>
//                 {/* primero fijate si hay algo si es asi renderiza mi filtro si no mostra mensaje de error */}
//                 {filteredBreeds?.length > 0 ?
//                     displayBreeds(filteredBreeds)
//                     :
//                     displayBreeds(currentItems)
//                 }
//                 {/* <Pagination breedsPerPage={breedsPerPage} totalBreeds={breeds.length} paginate={paginate} /> */}
//             </div>

//             <div>
//                 <ul className={styles.pagination}>
//                     <li>
//                         <button onClick={handlePrev}
//                             disabled={currentPage === pages[0] ? true : false}>
//                             Prev
//                         </button>
//                     </li>
//                     {renderPageNumbers}
//                     <li>
//                         <button onClick={handleNext}
//                             disabled={currentPage === pages[pages.length - 1] ? true : false}>
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </div>

//         </div>
//     );

// export default DogCards;
