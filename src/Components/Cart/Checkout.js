import useInput from "../hooks/useInput"
import classes from "./Checkout.module.css"

const Checkout = (props) => {

    const {

        value: name,
        valueIsvalid: nameIsvalid,
        valueIsInvalid: nameIsInvalid,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandler,
        reset: nameReset

    } = useInput(name => name.trim() !== "")

    const {

        value: street,
        valueIsvalid: streetIsvalid,
        valueIsInvalid: streetIsInvalid,
        valueChangeHandler: streetChangeHandler,
        valueBlurHandler: streetBlurHandler,
        reset: streetReset

    } = useInput(street => street.trim() !== "")

    const {

        value: postal,
        valueIsvalid: postalIsvalid,
        valueIsInvalid: postalIsInvalid,
        valueChangeHandler: postalChangeHandler,
        valueBlurHandler: postalBlurHandler,
        reset: postalReset

    } = useInput(postal => postal.trim() !== "")

    const {

        value: city,
        valueIsvalid: cityIsvalid,
        valueIsInvalid: cityIsInvalid,
        valueChangeHandler: cityChangeHandler,
        valueBlurHandler: cityBlurHandler,
        reset: cityReset

    } = useInput(city => city.trim() !== "")

    let formIsvalid = false

    if (cityIsvalid && postalIsvalid && nameIsvalid && streetIsvalid) {
        formIsvalid = true
    }

    const checkoutOrderHandler = (event) => {
        event.preventDefault()
        if (!formIsvalid) {
            return;
        } else {
            const data = {
                Name: name,
                Street: street,
                "Postal Code": postal,
                City: city
            }
            console.log(data)
            nameReset()
            streetReset()
            cityReset()
            postalReset()
        }
    }

    
    return (
        <form onSubmit={checkoutOrderHandler} className={classes.form}>
                <div className={`${classes.control} ${nameIsInvalid ? classes.invalid : ""}`}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text" 
                      id="name" 
                      onChange={nameChangeHandler} 
                      value={name} 
                      onBlur={nameBlurHandler} />
                      {nameIsInvalid && <p className={classes.errorText}>Please enter a valid name!</p>}
                </div>

                <div className={`${classes.control} ${streetIsInvalid ? classes.invalid : ""}`}>
                    <label htmlFor="street">Street</label>
                    <input
                     type="text" 
                     id="street" 
                     value={street}
                     onChange={streetChangeHandler}
                     onBlur={streetBlurHandler}
                     />
                    {streetIsInvalid && <p className={classes.errorText}>Please enter a valid street!</p>}
                </div>

                <div className={`${classes.control} ${postalIsInvalid ? classes.invalid : ""}`}>
                    <label htmlFor="postal">Postal Code</label>
                    <input
                     type="text" 
                     id="postal" 
                     value={postal}
                     onChange={postalChangeHandler}
                     onBlur={postalBlurHandler}
                     />

                    {postalIsInvalid && <p className={classes.errorText}>Please enter a valid postal code!</p>}
                </div>

                <div className={classes.control}>
                    <label htmlFor="city">City</label>
                    <input
                     type="text" 
                     id="city"
                     value={city}
                     onChange={cityChangeHandler}
                     onBlur={cityBlurHandler}
                      />

                    {cityIsInvalid && <p className={classes.errorText}>Please enter a valid City!</p>}
                </div>

            <div className={classes.actions}>
                <button disabled={!formIsvalid} className={classes.submit}>Confirm</button>
                <button type="button" onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default Checkout