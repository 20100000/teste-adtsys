import express from 'express';
import Controller from './controller';
const PATH = '/pokemon';


const router = express.Router();

const controller = Controller.getController();

router.get('/:city', controller.getPokemon);

module.exports = { path: PATH, router };