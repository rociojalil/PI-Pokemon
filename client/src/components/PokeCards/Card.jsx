import React from 'react';
import { Link } from "react-router-dom";

function Pokemon({name, types, imagen, fuerza, id, idPokemonCreado }) {
    return(
        <div>
            
  let imgPoke = id || idPokemonCreado ? (
      <Link to={"/detalle/" + id}>
      <img src={imagen} alt="no hay" width='200px' height='250px'></img>
      </Link>
    ) : (
      <img src={imagen} alt="no hay" width='200px' height='250px'></img>
      
    );

    return (
    
        <h3>{name}</h3>
        <h3>{(types).join(", ")}</h3>
        <h3>{fuerza}</h3>
        <img src={imagen} alt="no hay" width='200px' height='250px'></img>
        </div>

    
  );
    }
  


export default Pokemon;









