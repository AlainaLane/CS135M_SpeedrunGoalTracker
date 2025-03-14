import React, { createContext, useState, useEffect } from "react";
import goalsData from "@/data/goalsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(goalsData);
  }, []);

  // Runs on first page load. Loads goal data from async storage
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const value = await AsyncStorage.getItem("goals");
        if (value !== null) {
          const parsedGoals = JSON.parse(value);
          setGoals(parsedGoals);
        }
      } catch (error) {
        console.error("Error reading goals from storage:", error);
      }
    };
    
    loadGoals();
  }, []);

  const storeGoals = async (goals) => {
    try {
      const jsonValue = JSON.stringify(goals);
      await AsyncStorage.setItem("goals", jsonValue);
    } catch (error) {
      console.error("Error storing goals to storage:", error);
    }
  };

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => {
      const updatedGoals = [...prevGoals, newGoal];
      storeGoals(updatedGoals);
      return updatedGoals;
    });
  };

  const updateGoal = (id, updatedGoal) => {
    setGoals((prevGoals) => {
      const updatedGoals = prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      );
      storeGoals(updatedGoals);
      return updatedGoals;
    });
  };

  const deleteGoal = (id) => {
    setGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== id);
      storeGoals(updatedGoals);
      return updatedGoals;
    });
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, deleteGoal, updateGoal }} >
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
