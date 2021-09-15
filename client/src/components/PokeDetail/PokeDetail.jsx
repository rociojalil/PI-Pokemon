
// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../../actions/actions'
import Nav from '../Home/Nav'
import Footer from '../Home/Footer';
import styles from './PokeDetail.module.css'
import LazyLoad from 'react-lazyload'
import pokeImage from '../Home/img/dragoncito.png';
import video from './media/videodetalle.mp4'

function PokeDetail({ match }) {


    const { id } = match.params


    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch])

    const pokemon = useSelector(state => state.detail)

 

    if(typeof pokemon?.id == "number"){
        

    
    return (
        <div className={styles.main}>
                    <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "60%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1"
                    }}
                >
                <source src={video} type="video/mp4"></source>
            </video>
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
                <p className={styles.dogWeight}>Types:</p>
                <p className={styles.tempBD}>
                 
                {pokemon?.types.map((t) => t[0].toUpperCase() + t.slice(1))
                .join(' - ')}  

                {/* {pokemon?.Types.map((t) => t.name[0].toUpperCase() + t.name.slice(1))
                .join(' - ')} */}
               
    
                
              
              
                



        {/* {pokemon?.types.map((t) => t[0].toUpperCase() + t.slice(1))
                .join(' - ')} 
                {pokemon?.Types.map((t) => t.name[0].toUpperCase() + t.name.slice(1))
                .join(' - ')} */}
        
                </p>

                {/* <p><br />{pokemon?.types}</p> */}
                {/* {pokemon?.types.map((e) => (
                               <p value={e.id} key={e.id} >{e.name}</p>)
                            )} */}
    
{/*     
     {(d?.image === d.image) ?
                                <img className={styles.cardName}src={d.imagen}
                                style={{ objectFit: "contain", borderRadius: "1rem"}}
                                />
                                :
                                <img src="https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg" alt="Not Found" width="550px" height="300px" />
                                } */}
                <br />

                <p className={styles.dogWeight}>Life:  {pokemon?.vida} years</p>

              

                <p className={styles.dogWeight}>Attack: {pokemon?.fuerza} </p>

               

                <p className={styles.dogWeight}>Defense:  {pokemon?.defensa}</p>
                <p className={styles.dogWeight}>Speed:  {pokemon?.velocidad}</p>
                <p className={styles.dogWeight}>Height: {pokemon?.altura} cm</p>
                <p className={styles.dogWeight}>Weight:  {pokemon?.peso} kg</p>

            </div>
            </LazyLoad>
            <Footer/>
        </div>
    

    )


      
    
} else  {
      return (
            <div className={styles.main}>
                 <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "60%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1"
                    }}
                >
                <source src={video} type="video/mp4"></source>
            </video>
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

                    <img className={styles.dogImage} src={pokeImage} alt="Not Found"  />
    
                    <br />
                    <br />
                    <p className={styles.dogWeight}>Types:</p>
                    <p className={styles.tempBD}>

                    {pokemon?.Types.map((t) => t.name[0].toUpperCase() + t.name.slice(1))
                    .join(' - ')}
            
                    </p>

                
    
                    <p className={styles.dogWeight}>Life:  {pokemon?.vida} years</p>
    
                  
    
                    <p className={styles.dogWeight}>Attack: {pokemon?.fuerza} </p>
    
                   
    
                    <p className={styles.dogWeight}>Defense:  {pokemon?.defensa}</p>
                    <p className={styles.dogWeight}>Speed:  {pokemon?.velocidad}</p>
                    <p className={styles.dogWeight}>Height:  {pokemon?.altura} cm</p>
                    <p className={styles.dogWeight}>Weight: {pokemon?.peso} kg</p>
    
                </div>
                </LazyLoad>
                <Footer/>
            </div>

        )
                    }


}


    
export default PokeDetail;
