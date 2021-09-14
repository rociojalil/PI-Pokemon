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

                res.json(pokeDb)

            
                                 
                console.log( pokeDb, 'soy de base de datos');
    } else {

        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)    // viene la data de la api
        .then(response => {

            let pokemon = response.data

            let estadisticas = pokemon.stats

            res.json({
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((e) => e.type.name),
                imagen: pokemon.sprites.other["official-artwork"].front_default,

                vida: pokemon.stats[0].base_stat,
                fuerza: pokemon.stats[1].base_stat,
                defensa: pokemon.stats[3].base_stat,
                velocidad: pokemon.stats[5].base_stat,
                vida: estadisticas[0].base_stat,
                fuerza: estadisticas[1].base_stat,
                defensa: estadisticas[3].base_stat,
                velocidad: estadisticas[5].base_stat,

                altura: pokemon.height,
                peso: pokemon.weight,

            })
            // console.log(response);
    })
}
        })

        // .catch(error => res.status(500).json({ error: "Ups!Id", er: error.stack }))


/* pokemon.sprites.other.official-artwork.front_default */

// const {id} = req.params;
// const {data} = await axios.get(`https://breakingbadapi.com/api/characters/${id}`)
// if(id) {
//     try {
//     if(id.length > 10) {
//         const idDb = await Character.findOne({
//             where: {
//                 id: id
//             },
//             include: [{
//                 model: Occupation,
//                 through: character_occuption
//             }]
//         })
//         console.log(idDb)
//         const all = idDb.dataValues
//         return res.status(200).send(all) 
//     }
//     for(var i = 0; i < data.length; i++) {
//         const info = {
//         id: data[i].char_id,
//         name: data[i].name,
//         image: data[i].img,
//         nickName: data[i].nickname,
//         status: data[i].status,
//         occupation: data[i].occupation,
//         birthday: data[i].birthday
//     }
//     console.log(info);
//     return res.status(200).send(info)
//     }
//     } catch (err) {
//         console.log(err)
//     }
    
// } else {
//     res.status(404).send("No hay personaje")
// }

// })






















//     const pokeId = req.params.id //llega como STRING!!

//     // console.log(pokeId, "aca");
//     if (pokeId.slice(0, 2) == "db") {

//         let pokeDb = await Pokemon.findByPk(pokeId, { include: Types })

//         if (pokeDb) {
//             //Procesado para el front//
//             pokeDb = pokeDb.dataValues //se queda solo con el dataValues
//             pokeDb.types = pokeDb.Types.map(e => e.type)//crea el tipes a partir del Types
//             { ["createdAt", "updatedAt", "Types"].forEach(e => delete pokeDb[e]) }//elimina lo que sobra
//             console.log("||||", pokeDb)
//             //////////////////////////
//             res.json(pokeDb)
//         }
//         else res.json("No encontrado")

//     }

//     else {
//         axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeId)

//             .then(response => {

//                 let pokemon = response.data
//                 let estadisticas = pokemon.stats

//                 res.json({
//                     id: pokemon.id,
//                     name: pokemon.name,
//                     types: pokemon.types.map((e) => e.type.name),
//                     imagen: pokemon.sprites.other["official-artwork"].front_default,

//                     vida: estadisticas[0].base_stat,
//                     fuerza: estadisticas[1].base_stat,
//                     defensa: estadisticas[3].base_stat,
//                     velocidad: estadisticas[5].base_stat,

//                     altura: pokemon.height,
//                     peso: pokemon.weight,
//                 })
//             })

//             .catch(error => res.status(500).json({ error: "Ups!Id", er: error.stack }))
//     }

//     /* pokemon.sprites.other.official-artwork.front_default */

// })


module.exports = router























    // const { id } = req.params   // llega como string
    
    //     if (id.length > 10) {    // busqueda en mi bd (OJO QUE ME TRAE NULL SI PONGO > 2 ALGO NO SE SI FUNCIONA BIEN)
    //         const pokeDb = await Pokemon.findByPk(
    //             id, {
    //                 include: {
    //                     model: Types
    //                 }});
    //                 console.log( pokeDb, 'soy de base de datos');
    //                 return res.json(pokeDb);
    //     } else {

    //         axios.get("https://pokeapi.co/api/v2/pokemon/" + id)    // viene la data de la api
    //         .then(response => {

    //             let pokemon = response.data
            
    //             res.json({
    //                 id: pokemon.id,
    //                 name: pokemon.name,
    //                 types: pokemon.types.map((e) => e.type.name),
    //                 imagen: pokemon.sprites.other["official-artwork"].front_default,

    //                 vida: pokemon.stats[0].base_stat,
    //                 fuerza: pokemon.stats[1].base_stat,
    //                 defensa: pokemon.stats[3].base_stat,
    //                 velocidad: pokemon.stats[5].base_stat,

    //                 altura: pokemon.height,
    //                 peso: pokemon.weight,

    //             })
    //             // console.log(response);
    //     })
    
    // .catch (error => res.json({error: 'We couldnt find that PokemonID'})) ;
    //     }
    // })


module.exports = router