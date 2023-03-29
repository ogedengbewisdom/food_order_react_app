import { useContext, useState } from "react"
import CartContext from "../../Store/auth-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItems from "./CartItems"
import Checkout from "./Checkout"



const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
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
    return (
        <Modal onClick={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onCloseCart} />}
            {!isCheckout && modalAction}
        </Modal>
    )
}


export default Cart;