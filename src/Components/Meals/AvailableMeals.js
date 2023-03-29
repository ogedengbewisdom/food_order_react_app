
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealsItem/MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = () => {

  const [ error, setError ] = useState(null)
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(null)

  useEffect(()=> {
      const fetchMeals = async () => {
        setError(null)
        setIsLoading(true)
    try {
      const response = await fetch(`https://foodorderapp-1a847-default-rtdb.firebaseio.com/meals.json`)
      if ( !response.ok ) {
        throw new Error("Something went wrong try again later")
      }
      const data = await response.json()
      console.log(data)

      let savedMeals = []

      for ( const key in data) {
        console.log(data[key].description)
        savedMeals.push({
          id: key,
          description: data[key].description,
          name: data[key].name,
          price: data[key].price
        })
        setMeals(savedMeals)
      }
    } catch(error) {
      setError("Something went wrong try again later")
      console.log(error.message)
    }
    setIsLoading(false)
  }
    fetchMeals()
  }, [])

    const mealsList = meals.map(meal =>
         <MealItem 
           key={meal.id}
           id={meal.id}
           name={meal.name}
           description={meal.description}
           price={meal.price}
         />)

         let movieContent = <p>No meals available!</p> 

         if (meals.length > 0) {
          movieContent = <ul>{mealsList}</ul>
         } else if (isLoading) {
          movieContent = <p className={classes.isLoading}>Loading...</p>
         } else if (error) {
          movieContent = <p className={classes.errorText}>{error}</p>
         }

    return (
    <div className={classes.meals}>
        <Card> 
          {movieContent} 
        </Card>
    </div>
    )
}

export default AvailableMeals