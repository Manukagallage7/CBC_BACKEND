import express from 'express';

import { createItem, getItem } from '../controller/itemController.js'

const itemRouter = express.Router();

itemRouter.post('/',
    createItem
)
itemRouter.get('/',
    getItem
)

export default itemRouter