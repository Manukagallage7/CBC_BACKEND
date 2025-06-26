import Order from "../models/order.js"
import { isAdmin, isCustomer} from "./userController.js"

export async function createOrder(req,res) {

    if(!isCustomer(req)){
        res.json({
            message: "Please Login as Customer to Create Order"
        })
        return
    }

    try{
        const latestOrder = await Order.find().sort({
            date: -1
        }).limit(1)

        let orderId

        if(latestOrder.length == 0){
            orderId = "CBC0001"
        }else {
            const currentOrderId = latestOrder[0].orderId

            const numberString = currentOrderId.replace("CBC","")

            const number = parseInt(numberString)

            const newNumber = (number + 1).toString().padStart(4, "0")

            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body
        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message: "Order Created"
        })

    }catch(error){
        res.status(500).json(
            {
                message: error.message
            }
        )
    }
}

export async function getOrder(req,res){
    try{
        if(isCustomer(req)){
            const order = await Order.find({email: req.user.email})

            res.json(order)
            return
        } else if(isAdmin(req)){
            const order = await Order.find({})

            res.json(order)
            return
        } else {
            res.json({
                message: "Please login to view orders"
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
