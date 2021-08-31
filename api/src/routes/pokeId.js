const axios = require ('axios');
const { Router } = require ('express');
const { Pokemon, Types } = require('../db');
const { API_URL } = process.env;

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
            axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(response => {

                let pokemon = response.data
                let estadisticas = pokemon.stats

                res.json({
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map((e) => e.type.name),
                    imagen: pokemon.sprites.other["official-artwork"].front_default,

                    vida: estadisticas[0].base_stat,
                    fuerza: estadisticas[1].base_stat,
                    defensa: estadisticas[3].base_stat,
                    velocidad: estadisticas[5].base_stat,

                    altura: pokemon.height,
                    peso: pokemon.weight,

                })
                // console.log(response);
        })
    
    .catch (error => res.json({error: 'We couldnt find that ID'})) ;
        }
    })


module.exports = router