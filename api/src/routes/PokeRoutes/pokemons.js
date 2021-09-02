const axios = require ('axios');
const { Router }  = require ('express');
const { Pokemon, Types } = require('../../db');
// const {v4: uuid } = require ('uuid');
const router = Router();

// [ ] GET /pokemons (40) + GET /pokemons?name="..." (búsqueda x query)
// podría hacer que en el splice me traiga menos... 9


router.get("/", async function (req, res) {
    
    const { q } = req.query
    
    // si la búsqueda no es por query --> trae los 40 de API
    if (!q) {
        
            let store = []
            let array = []
            //recorro hasta 40 poke
            for (let i = 1; i <= 40; i++) {
                array.push(axios.get("https://pokeapi.co/api/v2/pokemon/" + i))}

            await Promise.all(array)
                .then(resolve => {
                    // me traigo lo que quiero de api y lo almaceno en store []
                    resolve.forEach((result => {
                        let pokemon = result.data
                        store.push({
                            id: pokemon.id,
                            name: pokemon.name,
                            types: pokemon.types.map((e) => e.type.name),
                            vida: pokemon.stats[0].base_stat,
                            fuerza: pokemon.stats[1].base_stat,
                            defensa: pokemon.stats[2].base_stat,
                            velocidad: pokemon.stats[5].base_stat,
                            imagen: pokemon.sprites.other["official-artwork"].front_default,
                            altura: pokemon.altura,
                            peso: pokemon.peso,
                            // ver el de dream world imagen
                            // ver si traer todos o menos en front
                            
                        })   
                        // return store;
                    }))
                })
                // }).catch(error => json({ error: "algo pasó!" }))
                
                //  acá es donde le digo que me mande 40 (splice)
            
                res.json({cuarentaPoke: store.splice(0, 40), cuantosQuedan: store.length });
            }

    else if (q) {  //búsqueda x query exacta --> trae info desde api o pókemon creado desde BD

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
                    types: db.Types.map((e) => e.types),
                    fuerza: db.fuerza,
                    defensa: db.defensa,
                    fuerza: db.fuerza,
                    altura: db.altura,
                    peso: db.peso,
                    id: db.id
                  },
                ];
                res.json(pokemonDb);
                
            } else { 

            axios.get("https://pokeapi.co/api/v2/pokemon/" + q)
                .then(response => {

                    let pokemon = response.data

                    res.json({
                        name: pokemon.name,
                        types: pokemon.types.map((e) => e.type.name),
                        imagen: pokemon.sprites.other["official-artwork"].front_default,
                        fuerza: pokemon.stats[1].base_stat,
                        id: pokemon.id

                    })
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