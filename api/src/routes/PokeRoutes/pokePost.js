const axios = require ('axios');
const { Router } = require ('express');
const { Pokemon, Types } = require('../../db');


const router = Router();

// POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos


router.post("/", async function (req, res) {
    //me traigo todo x body
    let { name, vida, fuerza, defensa, velocidad, altura, peso, types } = req.body;
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

        const existe = await Pokemon.findOne({ 
            where: { 
                name: name 
                    } 
        });

        if (existe) return res.json({ warning: "El pokemon ya existe" });

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
// tambien podria ser un Pokemon.findAll donde le digo que where: tipos o sea el q me llega x body y ahi le hago el add
// con un res.send('perro creado con exito!')

  await pokemon.addTypes(types);
  res.json({ info: "Pokemon creado con éxito" });
  console.log(pokemon, 'acá están los datos del pokemon creado')
},)

//   catch{(err) =>  res.json(
//     {
//         error: "No pudimos crearlo",
//     }, next(err))
//   }})


module.exports = router