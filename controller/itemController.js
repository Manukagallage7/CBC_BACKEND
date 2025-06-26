import Item from '../models/item.js'
import { isAdmin } from './userController.js';

export async function createItem(req,res) {

    if(!isAdmin){
        res.json({
            message:  "Please Login As Administrator to add Items"
        })
        return
    }

    const newItemData = req.body;

    try{
        const item = new Item(newItemData);
        await item.save();
        res.json({
            message: "Item Has Been Created"
        })
    } catch(error){
        res.status(403).json({
            message: error.message
        })
    }

}

export async function getItem(req,res){
    
    try{
        const Items = await Item.find({})
        res.json(Items)
    } catch (error){
        res.json({
            message: error.message
        })
    }
}

