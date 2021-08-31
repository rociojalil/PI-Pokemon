const axios = require ('axios');
const { Router } = require('express');
const { Types } = require('../db');

const router = Router();
//  GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async (req, res, next) => {
    
        const tipos  = await axios.get("https://pokeapi.co/api/v2/type")

        const pokeTipos = tipos.data.results.map((c) => {       //están todos dentro de results en la api
			return {
				name: c.name || 'Could not get name',
			}
		});
        const datos = await Types.bulkCreate(pokeTipos) //acá es donde me lo guardo en mi base de datos
        // console.log( datos, 'aca estan desde mi BD')
        res.json(datos);
        });



module.exports = router