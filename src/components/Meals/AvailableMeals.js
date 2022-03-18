import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "../Meals/MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-tut-http-839ca-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    
      fetchMeals().catch (error => {
      setIsLoading(false);
      setFetchError(error.message);
    })
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading meals...</p>
      </section>
    );
  }
  if (fetchError) {
    return (
      <section className={classes.mealsError}>
        <p>{fetchError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
