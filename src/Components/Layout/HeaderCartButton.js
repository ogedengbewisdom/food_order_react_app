
import { useContext, useEffect, useState } from "react"
import CartContext from "../../Store/auth-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const [btnIsHighligted, setBtnIsHighLighted] = useState(false)

    const keyframeButtons  = `${classes.button} ${btnIsHighligted ? classes.bump : ""}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighLighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false)
        }, 300);
        
        return () => {
            clearTimeout(timer)
        }
    },[items])
    return (
        <button className={keyframeButtons} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton