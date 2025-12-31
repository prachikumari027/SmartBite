"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  ChefHat,
  Clock,
  Users,
  Flame,
  Star,
  Filter,
  Shuffle,
  X,
  CookingPot,
  Sparkles,
} from "lucide-react";

export default function GenerateMeal() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    time: "any",
    difficulty: "any",
    servings: "2",
    cuisine: "any",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeals, setGeneratedMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // AI-generated recipes based on inventory
  const [aiRecipes, setAiRecipes] = useState([]);

  // Simulated inventory items for AI matching
  const userInventory = [
    "Pasta",
    "Garlic",
    "Chicken",
    "Rice",
    "Eggs",
    "Bread",
    "Tomatoes",
    "Cheese",
    "Mushrooms",
  ];

  // Initial empty AI recipes
  useEffect(() => {
    // This would be replaced with actual AI generation
    // For now, we'll start with empty array
    setAiRecipes([]);
  }, []);

  const handleGenerateMeals = () => {
    setIsGenerating(true);

    // Simulate AI generation with 2-second delay
    setTimeout(() => {
      // AI generates recipes based on inventory and filters
      const aiGeneratedRecipes = [
        {
          id: 101,
          name: "AI-Powered Mushroom Pasta",
          description:
            "AI suggested based on your mushrooms and pasta inventory",
          time: 25,
          difficulty: "easy",
          servings: parseInt(filters.servings),
          cuisine: filters.cuisine === "any" ? "Italian" : filters.cuisine,
          rating: 4.7,
          calories: 380,
          ingredients: ["Pasta", "Mushrooms", "Garlic", "Cheese", "Herbs"],
          match: calculateMatch([
            "Pasta",
            "Mushrooms",
            "Garlic",
            "Cheese",
            "Herbs",
          ]),
          steps: [
            "Clean and slice mushrooms",
            "Boil pasta until al dente",
            "Sauté garlic in olive oil",
            "Add mushrooms and cook until tender",
            "Mix with pasta and cheese",
            "Garnish with fresh herbs",
          ],
          image: "🤖🍝",
          isAiGenerated: true,
        },
        {
          id: 102,
          name: "Smart Chicken Stir Fry",
          description: "Perfect for using your chicken and vegetables",
          time: filters.time === "any" ? 25 : parseInt(filters.time),
          difficulty:
            filters.difficulty === "any" ? "medium" : filters.difficulty,
          servings: parseInt(filters.servings),
          cuisine: filters.cuisine === "any" ? "Asian" : filters.cuisine,
          rating: 4.6,
          calories: 320,
          ingredients: [
            "Chicken",
            "Rice",
            "Soy Sauce",
            "Garlic",
            "Bell Peppers",
          ],
          match: calculateMatch([
            "Chicken",
            "Rice",
            "Soy Sauce",
            "Garlic",
            "Bell Peppers",
          ]),
          steps: [
            "Slice chicken into strips",
            "Cook rice according to package",
            "Stir-fry chicken until cooked",
            "Add chopped vegetables",
            "Mix with sauce and serve over rice",
          ],
          image: "🧠🥘",
          isAiGenerated: true,
        },
        {
          id: 103,
          name: "AI-Crafted Breakfast Bowl",
          description: "Healthy breakfast using your eggs and bread",
          time: 15,
          difficulty: "easy",
          servings: parseInt(filters.servings),
          cuisine: "American",
          rating: 4.5,
          calories: 280,
          ingredients: ["Eggs", "Bread", "Tomatoes", "Cheese"],
          match: calculateMatch(["Eggs", "Bread", "Tomatoes", "Cheese"]),
          steps: [
            "Toast bread slices",
            "Scramble eggs with cheese",
            "Slice tomatoes",
            "Assemble breakfast bowl",
            "Season to taste",
          ],
          image: "⚡🥣",
          isAiGenerated: true,
        },
      ].filter((recipe) => {
        // Apply filters to AI-generated recipes
        if (filters.time !== "any" && recipe.time > parseInt(filters.time))
          return false;
        if (
          filters.difficulty !== "any" &&
          recipe.difficulty !== filters.difficulty
        )
          return false;
        if (recipe.servings < parseInt(filters.servings)) return false;
        if (filters.cuisine !== "any" && recipe.cuisine !== filters.cuisine)
          return false;
        return true;
      });

      setAiRecipes(aiGeneratedRecipes);
      setIsGenerating(false);

      console.log(`AI generated ${aiGeneratedRecipes.length} recipes!`);
    }, 2000);
  };

  const calculateMatch = (recipeIngredients) => {
    const matchingIngredients = recipeIngredients.filter((ingredient) =>
      userInventory.some(
        (invItem) =>
          invItem.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(invItem.toLowerCase())
      )
    );
    return Math.round(
      (matchingIngredients.length / recipeIngredients.length) * 100
    );
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);

    // Show quick details modal for 2 seconds, then auto-navigate to cooking
    setShowDetailsModal(true);

    // setTimeout(() => {
    //   handleStartCooking(meal);
    // }, 2000);
  };

  const handleStartCooking = (meal) => {
    localStorage.setItem("selectedMeal", JSON.stringify(meal));
    router.push("/cooking-mode");
  };

  const clearFilters = () => {
    setFilters({
      time: "any",
      difficulty: "any",
      servings: "2",
      cuisine: "any",
    });
    setAiRecipes([]);
  };

  const timeOptions = ["any", "15", "30", "45", "60"];
  const difficultyOptions = ["any", "easy", "medium", "hard"];
  const cuisineOptions = [
    "any",
    "Italian",
    "Asian",
    "Indian",
    "Mexican",
    "American",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-primary-400" size={28} />
          <h1 className="text-3xl font-bold">AI Meal Generator</h1>
        </div>
        <p className="text-gray-400">
          Our AI analyzes your inventory and preferences to create perfect
          recipes
        </p>
      </div>

      {/* AI Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary-500/20">
              <Sparkles className="text-primary-400" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">AI Recipes</p>
              <p className="text-xl font-bold">{aiRecipes.length}</p>
            </div>
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <Flame className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Match</p>
              <p className="text-xl font-bold">
                {aiRecipes.length > 0
                  ? Math.round(
                      aiRecipes.reduce((sum, r) => sum + r.match, 0) /
                        aiRecipes.length
                    )
                  : "0"}
                %
              </p>
            </div>
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <Clock className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Time</p>
              <p className="text-xl font-bold">
                {aiRecipes.length > 0
                  ? Math.round(
                      aiRecipes.reduce((sum, r) => sum + r.time, 0) /
                        aiRecipes.length
                    )
                  : "0"}{" "}
                min
              </p>
            </div>
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <ChefHat className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Your Inventory</p>
              <p className="text-xl font-bold">{userInventory.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Generation Card */}
      <Card>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 bg-linear-to-r from-primary-500/20 to-purple-500/20 text-primary-400 rounded-full text-sm">
                🤖 AI-Powered
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Smart Matching
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Meal Generation</h3>
            <p className="text-gray-400 max-w-2xl">
              Our AI analyzes your inventory, dietary preferences, and cooking
              style to generate personalized recipes. Each recipe is crafted to
              maximize ingredient usage and match your selected filters.
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-linear-to-r from-primary-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-4xl">🧠</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              ⏱️ Max Time (min)
            </label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => setFilters({ ...filters, time })}
                  className={`px-3 py-2 rounded-lg transition-all text-sm ${
                    filters.time === time
                      ? "bg-primary-500 text-white"
                      : "bg-dark-300 hover:bg-dark-200"
                  }`}
                >
                  {time === "any" ? "Any" : `≤${time}`}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              🎯 Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setFilters({ ...filters, difficulty: diff })}
                  className={`px-3 py-2 rounded-lg transition-all capitalize text-sm ${
                    filters.difficulty === diff
                      ? "bg-primary-500 text-white"
                      : "bg-dark-300 hover:bg-dark-200"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Servings Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              👥 Servings
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="8"
                value={filters.servings}
                onChange={(e) =>
                  setFilters({ ...filters, servings: e.target.value })
                }
                className="flex-1 accent-primary-500"
              />
              <div className="w-10 text-center font-bold text-lg">
                {filters.servings}
              </div>
            </div>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">🌍 Cuisine</label>
            <select
              value={filters.cuisine}
              onChange={(e) =>
                setFilters({ ...filters, cuisine: e.target.value })
              }
              className="input-field w-full"
            >
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine} className="capitalize">
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-6 border-t border-primary-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-2">Ready for AI Magic?</h4>
              <p className="text-sm text-gray-400">
                Click generate to let AI create recipes based on your inventory
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={clearFilters}
              >
                <X size={16} />
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={handleGenerateMeals}
                disabled={isGenerating}
                className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-purple-600"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AI Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate AI Recipes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Generated Results */}
      {aiRecipes.length > 0 ? (
        <>
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-primary-400" size={20} />
                <h2 className="text-2xl font-bold">
                  AI Generated {aiRecipes.length} Recipes
                </h2>
              </div>
              <p className="text-gray-400">
                Click any recipe to start cooking immediately
              </p>
            </div>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleGenerateMeals}
            >
              <Shuffle size={18} />
              Regenerate
            </Button>
          </div>

          {/* AI Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer group hover:border-primary-500 hover:scale-[1.02] transition-all duration-300 relative"
                onClick={() => handleMealSelect(recipe)}
              >
                {/* AI Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-linear-to-r from-primary-500/20 to-purple-500/20 text-primary-400 rounded-full text-sm font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    AI
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      recipe.match >= 90
                        ? "bg-green-500/20 text-green-400"
                        : recipe.match >= 70
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {recipe.match}% Match
                  </div>
                </div>

                {/* Recipe Emoji */}
                <div className="text-5xl mb-4 text-center mt-6">
                  {recipe.image}
                </div>

                {/* Recipe Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-center group-hover:text-primary-400 transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    {recipe.description}
                  </p>
                </div>

                {/* Recipe Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-dark-300 rounded-lg p-3 text-center group-hover:bg-dark-200 transition-colors">
                    <Clock
                      size={16}
                      className="inline-block mb-1 text-blue-400"
                    />
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-bold">{recipe.time} min</p>
                  </div>
                  <div className="bg-dark-300 rounded-lg p-3 text-center group-hover:bg-dark-200 transition-colors">
                    <Flame
                      size={16}
                      className="inline-block mb-1 text-red-400"
                    />
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="font-bold">{recipe.calories}</p>
                  </div>
                  <div className="bg-dark-300 rounded-lg p-3 text-center group-hover:bg-dark-200 transition-colors">
                    <Users
                      size={16}
                      className="inline-block mb-1 text-green-400"
                    />
                    <p className="text-xs text-gray-500">Servings</p>
                    <p className="font-bold">{recipe.servings}</p>
                  </div>
                  <div className="bg-dark-300 rounded-lg p-3 text-center group-hover:bg-dark-200 transition-colors">
                    <Star
                      size={16}
                      className="inline-block mb-1 text-yellow-400"
                    />
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-bold">{recipe.rating}</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-500/10 rounded-full text-sm">
                    {recipe.cuisine}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 rounded-full text-sm capitalize">
                    {recipe.difficulty}
                  </span>
                </div>

                {/* Cooking Button */}
                <div className="pt-4 border-t border-primary-500/20">
                  <div
                    onClick={() => handleStartCooking(selectedMeal)}
                    className="flex items-center justify-center gap-2 text-primary-400 font-semibold cursor-pointer hover:text-primary-300 transition"
                  >
                    <CookingPot size={18} />
                    Click to Start Cooking →
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Insights */}
          <Card>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-linear-to-r from-primary-500/20 to-purple-500/20 text-primary-400 rounded-full text-sm">
                    🧠 AI Insights
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">
                  Smart Cooking Suggestions
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-gray-400">
                      All recipes are optimized for your inventory - average{" "}
                      {Math.round(
                        aiRecipes.reduce((sum, r) => sum + r.match, 0) /
                          aiRecipes.length
                      )}
                      % ingredient match
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      ⏱️
                    </div>
                    <p className="text-gray-400">
                      Recipes selected to fit your{" "}
                      {filters.time === "any"
                        ? "preferred"
                        : `≤${filters.time} minute`}{" "}
                      cooking time
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                      ♻️
                    </div>
                    <p className="text-gray-400">
                      Prioritizing ingredients that expire soon to reduce food
                      waste
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-0">
                <div className="w-48 h-48 rounded-2xl bg-linear-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center relative">
                  <div className="text-6xl">🤖</div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-linear-to-r from-primary-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : !isGenerating ? (
        /* Empty State - Before Generation */
        <Card>
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-linear-to-br from-primary-500/10 to-purple-500/10 flex items-center justify-center">
              <Sparkles size={64} className="text-primary-400/50" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready for AI Magic?</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Set your preferences and let our AI analyze your inventory to
              generate personalized recipes. Each recipe is crafted just for
              you!
            </p>
            <Button
              variant="primary"
              onClick={handleGenerateMeals}
              className="px-8 py-4 bg-linear-to-r from-primary-500 to-purple-600"
            >
              <Sparkles className="mr-2" size={20} />
              Generate AI Recipes
            </Button>
          </div>
        </Card>
      ) : null}

      {/* AI Thinking Animation */}
      {isGenerating && (
        <Card>
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              {/* Outer pulsing circle */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary-500/20 to-purple-500/20 animate-ping"></div>
              {/* Inner spinning circle */}
              <div className="absolute inset-4 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin"></div>
              {/* AI Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">🤖</div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">AI is Cooking Up Recipes</h3>
            <p className="text-gray-400 mb-6">
              Analyzing your inventory and preferences to create perfect
              meals...
            </p>

            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Scanning inventory...</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Applying filters...</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Generating recipes...</span>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Details Modal (Auto-closes) */}
      {showDetailsModal && selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowDetailsModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-dark-400 border border-primary-500/30 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Header */}
            <div className="bg-linear-to-r from-primary-500/20 to-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{selectedMeal.image}</div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedMeal.name}</h2>
                    <p className="text-sm text-gray-300">
                      {selectedMeal.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Loading Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Starting cooking mode...
                  </span>
                  <span className="text-primary-400">2s</span>
                </div>
                <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-primary-500 to-purple-600 rounded-full animate-[loading_2s_linear_forwards]"></div>
                </div>
              </div>

              {/* Quick Preview */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <ChefHat size={16} className="mr-2" />
                  Quick Preview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-bold">{selectedMeal.time} min</p>
                  </div>
                  <div className="bg-dark-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Match</p>
                    <p className="font-bold text-green-400">
                      {selectedMeal.match}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-semibold mb-2">Ingredients You Have</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-500/10 rounded-lg text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Note */}
              <div className="bg-linear-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-primary-400" />
                  <p className="font-semibold text-primary-400">
                    AI-Powered Recipe
                  </p>
                </div>
                <p className="text-sm text-gray-300">
                  This recipe was generated specifically for your inventory and
                  preferences. Step-by-step guidance will begin automatically in
                  cooking mode.
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="sticky bottom-0 bg-dark-400 border-t border-primary-500/20 p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  Starting Cooking...
                </div>
                <p className="text-sm text-gray-400">
                  Get ready for step-by-step AI guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
