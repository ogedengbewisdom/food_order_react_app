import { useContext } from "react"
import CartContext from "../../Store/auth-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"


const Cart = (props) => {

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItems = <ul className={classes["cart-items"]}>{cartCtx.items.map(item => <li key={Math.random()}>{item.name}</li>)}</ul>
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


export default Cart