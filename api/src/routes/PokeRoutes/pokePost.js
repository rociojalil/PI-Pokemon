const axios = require ('axios');
const { Router } = require ('express');
const { Pokemon, Types } = require('../../db');


const router = Router();

// POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos

// primero me traigo todo por req.body
	// despues creo mi dog en mi bd pero el temperament a parte lo agrego con ADD o SET (metodos del belongTomany)
	// tambien podria ser un temperament.findAll donde le digo que where: temperament o sea el q me llega x body y ahi le hago el add
	// con un res.send('perro creado con exito!')


router.post("/", async function (req, res) {
    //me traigo todo x body
    let { name, vida, fuerza, defensa, velocidad, altura, peso, tipos } = req.body;
// try {
  console.log(req.body);

        if (
            isNaN(vida) ||
            isNaN(fuerza) ||
            isNaN(defensa) ||
            isNaN(velocidad) ||
            isNaN(altura) ||
            isNaN(peso)
            )
            // comprobaciones de numero-obligatorio y poke repetido
        return res.json({ error: "Alguno de los argumentos no es un numero" });

        if (!name) return res.json({ error: "El nombre es obligatorio" });

        const existe = await Pokemon.findOne({ where: { name: name } });
        if (existe) return res.json({ info: "El pokemon ya existe" });

// creación del pokemon
  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    vida: Number(vida),
    fuerza: Number(fuerza),
    defensa: Number(defensa),
    velocidad: Number(velocidad),
    altura: Number(altura),
    peso: Number(peso),
  });

//  add - set : metodos de belongToMany donde agrego mi otro modelo Types
  await pokemon.addTypes(tipos);
  res.json({ info: "Pokemon creado" });
  console.log(pokemon, 'acá están los datos del pokemon creado')
},)

//   catch{(err) =>  res.json(
//     {
//         error: "No pudimos crearlo",
//     }, next(err))
//   }})








module.exports = router