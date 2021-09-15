const axios = require ('axios');
const { Router }  = require ('express');
const { Pokemon, Types } = require('../../db');
// const {v4: uuid } = require ('uuid');
const router = Router();

// [ ] GET /pokemons (40) + GET /pokemons?name="..." (búsqueda x query)
// podría hacer que en el splice me traiga menos... 9


router.get("/", async function (req, res) {
    const { q } = req.query
    if (q) {  //búsqueda x query exacta --> trae info desde api o pókemon creado desde BD
        
        const db = await Pokemon.findOne({
            where: {
              name: q,
            },
            include: Types,
          });
          if (db) {
            const pokemonDb = [
              {
                name: db.name,
                types: db.Types.map((e) => e.name),
                fuerza: db.fuerza,
                defensa: db.defensa,
                fuerza: db.fuerza,
                altura: db.altura,
                peso: db.peso,
                id: db.id
              },
            ];
            res.json(pokemonDb);
            
        } else  { 

        axios.get("https://pokeapi.co/api/v2/pokemon/" + q)
            .then(response => {

                let pokemon = response.data
                const cuarentaPoke = [

               {
                    name: pokemon.name,
                    types: pokemon.types.map((e) => e.type.name),
                    imagen: pokemon.sprites.other["official-artwork"].front_default,
                    fuerza: pokemon.stats[1].base_stat,
                    id: pokemon.id

                },
              ];
              res.json(cuarentaPoke);
            })




 

























            
            .catch(() => res.json(
                {
                    name: "Not Found",
                    imagen: "https://i1.wp.com/hipertextual.com/wp-content/uploads/2020/05/hipertextual-nuevo-pokemon-go-es-hacer-que-tus-pokemon-se-vean-mas-reales-2020697065.jpg?fit=1200%2C771&ssl=1"
                    // imagen default de no encontrar poke x query ---> ver desp en front
                }
            ))
        }
    
    
}})


module.exports = router