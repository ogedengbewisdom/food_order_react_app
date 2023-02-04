import { Fragment } from "react"
import classes from "./Header.module.css"

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>RashDLMeals</h1>
                <button>Cart</button>
            </header>

            <div className={classes["main-image"]}>
                <img src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg" alt="A tabel of delicious meals" />
            </div>
        </Fragment>
    )
}

export default Header