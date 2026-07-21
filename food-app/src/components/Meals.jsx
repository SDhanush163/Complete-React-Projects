import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./UI/Error";

// Shared config object to prevent unnecessary re-renders
const config = {};

const Meals = () => {
  // Fetch the list of meals from the backend
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  // Show loading state while fetching data
  if (isLoading) return <p className="center">Loading...</p>;

  // Show error message if the request fails
  if (error) return <Error title="Failed to fetch meals" message={error} />;

  return (
    <ul id="meals">
      {/* Render each meal item */}
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
};

export default Meals;
