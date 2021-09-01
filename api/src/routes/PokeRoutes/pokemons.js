const axios = require ('axios');
const { Router }  = require ('express');
// const {v4: uuid } = require ('uuid');
const router = Router();

// [ ] GET /pokemons (40) + GET /pokemons?name="..." (búsqueda x query)
// podría hacer que en el splice me traiga menos... 9

let store = []

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
                    // me traigo lo que quiero de api y lo almaceno en store []
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
                }).catch(error => json({ error: "Ups!" }))
         
        //  acá es donde le digo que me muestre 40
        res.json({cuarentaPoke: store.splice(0, 40), cuantosQuedan: store.length });
        }

        else if (q) {  //búsqueda x query exacta --> trae info desde api

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
})


module.exports = router