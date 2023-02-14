import { useContext } from "react"
import CartContext from "../../Store/auth-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItems from "./CartItems"



const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const addItemHandler = item => {
        let amount = 1;
        cartCtx.addItem({...item, amount: amount++});
        
    }
    const removeItemHandler = id => {
        cartCtx.removeItem(id);
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
    return (
        <Modal onClick={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onCloseCart}>Close</button>
                {showOrderBtn && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}


export default Cart;