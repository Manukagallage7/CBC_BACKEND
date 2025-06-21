import Item from '../models/item.js'

export function createItem(req,res) {
    const newItemData = req.body

    const item = new Item(newItemData)

    item.save().then(() =>{
        res.json({
            message: "Item Created"
        })
    }).catch((error) =>{
        res.json({
            message: "Product not Created"
        })
    })

}

export function isAdmin(req){
    if(req.user == null){
        return false
    }

    if(req.user.type !== "Admin"){
        return false
    }
    return true
}

export function isCustomer(req){
    if(req.user == null){
        return false
    }

    if(req.user.type !== "Customer"){
        return false
    }
    return true
}
