import Item from '../models/item.js'

export function createItem(req,res) {

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
caam