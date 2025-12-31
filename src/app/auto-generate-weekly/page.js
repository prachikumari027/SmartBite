"use client";

import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Calendar, RefreshCw, ChefHat, CheckCircle } from "lucide-react";

export default function AutoGenerateWeekly() {
  const [mealPlan, setMealPlan] = useState([
    {
      day: "Monday",
      date: "Feb 12",
      meals: {
        breakfast: "Avocado Toast",
        lunch: "Chicken Salad",
        dinner: "Pasta Carbonara",
        snacks: ["Yogurt", "Fruit"],
      },
    },
    {
      day: "Tuesday",
      date: "Feb 13",
      meals: {
        breakfast: "Smoothie Bowl",
        lunch: "Leftover Pasta",
        dinner: "Vegetable Stir Fry",
        snacks: ["Nuts", "Cheese"],
      },
    },
    {
      day: "Wednesday",
      date: "Feb 14",
      meals: {
        breakfast: "Omelette",
        lunch: "Quinoa Bowl",
        dinner: "Salmon with Veggies",
        snacks: ["Protein Bar"],
      },
    },
    {
      day: "Thursday",
      date: "Feb 15",
      meals: {
        breakfast: "Greek Yogurt",
        lunch: "Chicken Wrap",
        dinner: "Mushroom Risotto",
        snacks: ["Apple", "Dark Chocolate"],
      },
    },
    {
      day: "Friday",
      date: "Feb 16",
      meals: {
        breakfast: "Pancakes",
        lunch: "Salad",
        dinner: "Homemade Pizza",
        snacks: ["Popcorn"],
      },
    },
    {
      day: "Saturday",
      date: "Feb 17",
      meals: {
        breakfast: "Brunch",
        lunch: "Burgers",
        dinner: "Date Night Recipe",
        snacks: ["Chips", "Dip"],
      },
    },
    {
      day: "Sunday",
      date: "Feb 18",
      meals: {
        breakfast: "French Toast",
        lunch: "Leftovers",
        dinner: "Roast Chicken",
        snacks: ["Ice Cream"],
      },
    },
  ]);

  const [editingMeal, setEditingMeal] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Generate new weekly plan
  const generateNewPlan = () => {
    const samplePlans = [
      // Sample plan 1
      [
        {
          day: "Monday",
          date: "Feb 12",
          meals: {
            breakfast: "Oatmeal",
            lunch: "Turkey Sandwich",
            dinner: "Beef Stir Fry",
            snacks: ["Apple"],
          },
        },
        {
          day: "Tuesday",
          date: "Feb 13",
          meals: {
            breakfast: "Smoothie",
            lunch: "Chicken Salad",
            dinner: "Pasta",
            snacks: ["Yogurt"],
          },
        },
        {
          day: "Wednesday",
          date: "Feb 14",
          meals: {
            breakfast: "Eggs",
            lunch: "Leftovers",
            dinner: "Fish Tacos",
            snacks: ["Nuts"],
          },
        },
        {
          day: "Thursday",
          date: "Feb 15",
          meals: {
            breakfast: "Toast",
            lunch: "Soup",
            dinner: "Chicken Curry",
            snacks: ["Fruit"],
          },
        },
        {
          day: "Friday",
          date: "Feb 16",
          meals: {
            breakfast: "Pancakes",
            lunch: "Salad",
            dinner: "Pizza",
            snacks: ["Popcorn"],
          },
        },
        {
          day: "Saturday",
          date: "Feb 17",
          meals: {
            breakfast: "Waffles",
            lunch: "Burgers",
            dinner: "Steak",
            snacks: ["Chips"],
          },
        },
        {
          day: "Sunday",
          date: "Feb 18",
          meals: {
            breakfast: "French Toast",
            lunch: "Roast",
            dinner: "Lasagna",
            snacks: ["Ice Cream"],
          },
        },
      ],
      // Sample plan 2
      [
        {
          day: "Monday",
          date: "Feb 12",
          meals: {
            breakfast: "Greek Yogurt",
            lunch: "Quinoa Bowl",
            dinner: "Salmon",
            snacks: ["Berries"],
          },
        },
        {
          day: "Tuesday",
          date: "Feb 13",
          meals: {
            breakfast: "Avocado Toast",
            lunch: "Leftover Salmon",
            dinner: "Chicken",
            snacks: ["Almonds"],
          },
        },
        {
          day: "Wednesday",
          date: "Feb 14",
          meals: {
            breakfast: "Smoothie",
            lunch: "Wrap",
            dinner: "Vegetarian Chili",
            snacks: ["Banana"],
          },
        },
        {
          day: "Thursday",
          date: "Feb 15",
          meals: {
            breakfast: "Omelette",
            lunch: "Salad",
            dinner: "Shrimp Pasta",
            snacks: ["Cheese"],
          },
        },
        {
          day: "Friday",
          date: "Feb 16",
          meals: {
            breakfast: "Bagel",
            lunch: "Soup",
            dinner: "Burgers",
            snacks: ["Fries"],
          },
        },
        {
          day: "Saturday",
          date: "Feb 17",
          meals: {
            breakfast: "Brunch",
            lunch: "Sandwiches",
            dinner: "Ribs",
            snacks: ["Wings"],
          },
        },
        {
          day: "Sunday",
          date: "Feb 18",
          meals: {
            breakfast: "Pancakes",
            lunch: "Leftovers",
            dinner: "Roast",
            snacks: ["Pie"],
          },
        },
      ],
    ];

    const randomPlan =
      samplePlans[Math.floor(Math.random() * samplePlans.length)];
    setMealPlan(randomPlan);
  };

  // Start editing a meal
  const startEditMeal = (dayIndex, mealType, currentValue) => {
    setEditingMeal({ dayIndex, mealType });
    setEditValue(currentValue);
  };

  // Save edited meal
  const saveEditMeal = () => {
    if (editingMeal) {
      const newMealPlan = [...mealPlan];
      const { dayIndex, mealType } = editingMeal;

      if (mealType === "snacks") {
        newMealPlan[dayIndex].meals.snacks = editValue
          .split(",")
          .map((s) => s.trim());
      } else {
        newMealPlan[dayIndex].meals[mealType] = editValue;
      }

      setMealPlan(newMealPlan);
      setEditingMeal(null);
      setEditValue("");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingMeal(null);
    setEditValue("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Weekly Diet Plan</h1>
          <p className="text-gray-400">
            AI-generated meal plan for the week ahead
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={generateNewPlan}
          >
            <RefreshCw size={18} />
            Generate New Plan
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Calendar size={18} />
            Save Plan
          </Button>
        </div>
      </div>

      {/* Weekly Meal Plan */}
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
          {mealPlan.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-dark-300 hover:bg-dark-200 rounded-xl p-4 transition-colors"
            >
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">{day.day}</div>
                <div className="text-lg font-bold">{day.date}</div>
              </div>

              <div className="space-y-3">
                {/* Breakfast */}
                <div className="bg-dark-400 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="text-sm font-semibold">Breakfast</div>
                    </div>
                    <button
                      onClick={() =>
                        startEditMeal(
                          dayIndex,
                          "breakfast",
                          day.meals.breakfast
                        )
                      }
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal &&
                  editingMeal.dayIndex === dayIndex &&
                  editingMeal.mealType === "breakfast" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-dark-300 border border-primary-500/30 rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditMeal}
                          className="text-xs bg-primary-500 hover:bg-primary-600 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-xs bg-dark-500 hover:bg-dark-600 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">{day.meals.breakfast}</div>
                  )}
                </div>

                {/* Lunch */}
                <div className="bg-dark-400 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="text-sm font-semibold">Lunch</div>
                    </div>
                    <button
                      onClick={() =>
                        startEditMeal(dayIndex, "lunch", day.meals.lunch)
                      }
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal &&
                  editingMeal.dayIndex === dayIndex &&
                  editingMeal.mealType === "lunch" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-dark-300 border border-primary-500/30 rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditMeal}
                          className="text-xs bg-primary-500 hover:bg-primary-600 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-xs bg-dark-500 hover:bg-dark-600 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">{day.meals.lunch}</div>
                  )}
                </div>

                {/* Dinner */}
                <div className="bg-dark-400 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="text-sm font-semibold">Dinner</div>
                    </div>
                    <button
                      onClick={() =>
                        startEditMeal(dayIndex, "dinner", day.meals.dinner)
                      }
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal &&
                  editingMeal.dayIndex === dayIndex &&
                  editingMeal.mealType === "dinner" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-dark-300 border border-primary-500/30 rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditMeal}
                          className="text-xs bg-primary-500 hover:bg-primary-600 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-xs bg-dark-500 hover:bg-dark-600 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">{day.meals.dinner}</div>
                  )}
                </div>

                {/* Snacks */}
                <div className="bg-dark-400 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="text-sm font-semibold">Snacks</div>
                    </div>
                    <button
                      onClick={() =>
                        startEditMeal(
                          dayIndex,
                          "snacks",
                          day.meals.snacks.join(", ")
                        )
                      }
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal &&
                  editingMeal.dayIndex === dayIndex &&
                  editingMeal.mealType === "snacks" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-dark-300 border border-primary-500/30 rounded px-2 py-1 text-sm"
                        placeholder="Enter snacks separated by commas"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditMeal}
                          className="text-xs bg-primary-500 hover:bg-primary-600 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-xs bg-dark-500 hover:bg-dark-600 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">{day.meals.snacks.join(", ")}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Recommendation */}
      <Card>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                🤖 AI Recommendation
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                95% Match with Inventory
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Perfect Weekly Match!</h3>
            <p className="text-gray-400 mb-6">
              This plan uses 92% of items from your inventory. You'll only need
              to buy
              <span className="text-primary-400 font-semibold">
                {" "}
                5 additional items
              </span>
              for the entire week, saving approximately{" "}
              <span className="text-green-400 font-semibold">$25</span>
              compared to eating out.
            </p>

            <div className="flex gap-4">
              <Button variant="primary" onClick={generateNewPlan}>
                Generate New Plan
              </Button>
              <Button variant="secondary">View Shopping List</Button>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="w-64 h-64 rounded-2xl bg-linear-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">92%</div>
                <div className="text-gray-400">Inventory Match</div>
                <div className="w-48 h-2 bg-dark-300 rounded-full mt-4">
                  <div className="w-44 h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
