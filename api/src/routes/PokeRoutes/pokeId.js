const axios = require ('axios');
const { Router } = require ('express');
const { Pokemon, Types } = require('../../db');

const router = Router();

// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get('/:id', async (req, res, next) => {

    const { id } = req.params   // llega como string
    
        if (id.length > 5) {    // busqueda en mi bd (OJO QUE ME TRAE NULL SI PONGO > 2 ALGO NO SE SI FUNCIONA BIEN)
            const pokeDb = await Pokemon.findByPk(
                id, {
                    include: {
                        model: Types
                    }});
                    console.log( pokeDb, 'soy de base de datos');
                    return res.json(pokeDb);
        } else {

            axios.get("https://pokeapi.co/api/v2/pokemon/" + id)    // viene la data de la api
            .then(response => {

                let pokemon = response.data
            
                res.json({
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map((e) => e.type.name),
                    imagen: pokemon.sprites.other["official-artwork"].front_default,

                    vida: pokemon.stats[0].base_stat,
                    fuerza: pokemon.stats[1].base_stat,
                    defensa: pokemon.stats[3].base_stat,
                    velocidad: pokemon.stats[5].base_stat,

                    altura: pokemon.height,
                    peso: pokemon.weight,

                })
                // console.log(response);
        })
    
    .catch (error => res.json({error: 'We couldnt find that ID'})) ;
        }
    })


module.exports = router