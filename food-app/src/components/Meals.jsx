import React, { useCallback, useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

// Preventing infinite loop
const config = {};

const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  if (isLoading) return <p className="center">Loading...</p>;
  if (error) return <Error title="Failed to fetch meals" message={error} />;

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
};

export default Meals;
