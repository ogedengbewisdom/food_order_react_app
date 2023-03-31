import { Fragment, useContext, useState } from "react"
import CartContext from "../../Store/auth-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItems from "./CartItems"
import Checkout from "./Checkout"



const Cart = (props) => {
    const [ isCheckout, setIsCheckout ] = useState(false)
    const [ isSubmiting, setIsSubmiting ] = useState(false)
    const [ submited, setSubmited ] = useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const addItemHandler = item => {
        let amount = 1;
        cartCtx.addItem({...item, amount: amount++});
        
    }
    const removeItemHandler = id => {
        cartCtx.removeItem(id);
    }

    const orderButtonHandler = () => {
        setIsCheckout(true)
    }

    const confirmOrderHandler = async (userData) => {
        setIsSubmiting(true)
        try {
            const response = await fetch( `https://foodorderapp-1a847-default-rtdb.firebaseio.com/order.json`, {
                method: "POST",
                body: JSON.stringify ({
                    user: userData,
                    orderedItem: cartCtx.items
                }),
                headers: {
                   "Content-Type" : "application/json"    
                }
            } )


            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const data = await response.json()

            const orderId = data.name
            const orderItem = {id: orderId, user: userData}
            console.log(orderItem.user)
        }   
        
        catch (error) {
            console.log(error.message)
        }
        setSubmited(true)
        setIsSubmiting(false)
    }

    const cartItems = <ul className={classes["cart-items"]}>{cartCtx.items.map(item =>
         <CartItems
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price} 
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
           />)}
           </ul>
    const showOrderBtn = cartCtx.items.length > 0

    const modalAction = (
    <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>Close</button>
        {showOrderBtn && <button className={classes.button} onClick={orderButtonHandler}>Order</button>}
  </div>)

  let cartOrderContent = <p>Sending Order data...</p>

  if (!isSubmiting) {
    cartOrderContent =     
    
    <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={confirmOrderHandler} onCancel={props.onCloseCart} />}
        {!isCheckout && modalAction}
    </Fragment>
  }
  
    return (
        <Modal onClick={props.onCloseCart}>
            {cartOrderContent}
        </Modal>
    )
}


export default Cart;