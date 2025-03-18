const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemon/:query', pokemonController.getPokemon);
router.get('/pokemons-list', pokemonController.getPokemonsList);


module.exports = router;

