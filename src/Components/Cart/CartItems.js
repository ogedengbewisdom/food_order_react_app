import classes from "./CartItems.module.css"

const CartItems = (props) => {
    const price = `N${props.price.toFixed(2)}`
    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span>{price}</span>
                    <span>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.action}>
                <button onClick={props.onRemove}>-</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    )
}


export default CartItems