import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../Util/formatting";
import Button from "./UI/Button";

// Displays a single meal item
const MealItem = ({ meal }) => {
  // Access cart actions from context
  const cartCtx = useContext(CartContext);

  // Add the selected meal to the cart
  const handleAddMealItemToCart = () => cartCtx.addItem(meal);

  return (
    <li className="meal-item">
      <article>
        {/* Meal image */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>

          {/* Display formatted meal price */}
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealItemToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
