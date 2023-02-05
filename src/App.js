import { Fragment } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meal";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Cart />
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
