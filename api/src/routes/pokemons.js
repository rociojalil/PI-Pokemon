const axios = require ('axios');
const { Router }  = require ('express');
const {v4: uuid } = require ('uuid');
const { conn, Pokemon, Types } = require('../db');
const router = Router();


let store = []

//Deja todo a 0 - refresca tablas
router.put("/", (req, res) => {
    store = []  //limpia el buffer
    conn.sync({ force: true }).then(() => res.send("resfresh exitoso")) 
})

// Trae 40 pokemones pero los envia de a 9 cada vez que piden
router.get("/", async function (req, res) {

    const { q } = req.query

    // si la búsqueda no es por query --> trae los 40 de API
        if (!q) {
            let array = []
            //recorro hasta 40 poke
            for (let i = 1; i <= 40; i++) {
                array.push(axios.get("https://pokeapi.co/api/v2/pokemon/" + i))}

            await Promise.all(array)
                .then(resolve => {
                    // me traigo lo que quiero de api y lo almaceno en store
                    resolve.forEach((result => {
                        let pokemon = result.data
                        store.push({
                            id: pokemon.id,
                            name: pokemon.name,
                            types: pokemon.types.map((e) => e.type.name),
                            imagen: pokemon.sprites.other["official-artwork"].front_default,
                            // ver el de dream world imagen
                            fuerza: pokemon.stats[1].base_stat

                        })   
                    }))

                }).catch(err => next(err))
         }
        //  acá es donde finalmente le digo que me muestre 9
        res.json({ nuevePoke: store.splice(0, 9), cuantosQuedan: store.length })

    
     if (q) {  // búsqueda x query. Me traigo los de mi BD si no API.

        let pokeDb = await Pokemon.findAll({
            where: { name: q }, include: Types
        })

        if (pokeDb.length !== 0) {

            pokeDb = pokeDb[0].dataValues
            res.json({
                name: pokeDb.name,
                types: pokeDb.Types.map((e) => e.type),
                fuerza: pokeDb.fuerza,
                imagen: pokeDb.imagen,
                id: pokeDb.uuidv4()
            })
        }

        else { //desde la API (mismo que antes)

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

                // VER TEMA DE CATCH
                .catch(() => res.json(
                    {
                        name: "No encontrado",
                        types: [],
                        fuerza: "",
                        id: "",
                        imagen: "https://pm1.narvii.com/6121/2985db5e175084c069f3cab12a9afb5a896ee276_hq.jpg"
                    }
                ))
        }


    }


})







module.exports = router