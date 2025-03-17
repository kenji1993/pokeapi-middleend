const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemon/:query', pokemonController.getPokemon);
router.get('/pokemons', pokemonController.getPokemons);


module.exports = router;

