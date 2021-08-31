const { Router } = require('express');
const pokemons = require('./pokemons');
const pokeId = require('./pokeId');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemons);
router.use("/pokeId", pokeId);


module.exports = router;
