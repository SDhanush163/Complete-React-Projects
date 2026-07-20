import React, { useCallback, useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        alert("error");
        return;
      }
      const mealsFromResponse = await response.json();
      setMeals(mealsFromResponse);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
};

export default Meals;
