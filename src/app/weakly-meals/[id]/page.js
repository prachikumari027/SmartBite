'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { Calendar, ArrowLeft, Download, Share2, ChefHat, Clock, Users, CheckCircle, Edit2 } from 'lucide-react';

export default function WeeklyMealDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Mock data - in real app, fetch by id
  const weeklyPlansData = {
    '1': {
      id: '1',
      weekNumber: 'Week 12',
      dateRange: 'Mar 18 - Mar 24, 2024',
      totalCalories: 1850,
      protein: 85,
      carbs: 210,
      fat: 65,
      cost: 85.50,
      inventoryMatch: 92,
      status: 'completed',
      meals: 21,
      daysCompleted: 7,
      mealPlan: [
        { 
          day: 'Monday', 
          date: 'Mar 18',
          meals: {
            breakfast: 'Avocado Toast',
            lunch: 'Chicken Salad',
            dinner: 'Pasta Carbonara',
            snacks: ['Yogurt', 'Fruit']
          }
        },
        { 
          day: 'Tuesday', 
          date: 'Mar 19',
          meals: {
            breakfast: 'Smoothie Bowl',
            lunch: 'Leftover Pasta',
            dinner: 'Vegetable Stir Fry',
            snacks: ['Nuts', 'Cheese']
          }
        },
        { 
          day: 'Wednesday', 
          date: 'Mar 20',
          meals: {
            breakfast: 'Omelette',
            lunch: 'Quinoa Bowl',
            dinner: 'Salmon with Veggies',
            snacks: ['Protein Bar']
          }
        },
        { 
          day: 'Thursday', 
          date: 'Mar 21',
          meals: {
            breakfast: 'Greek Yogurt',
            lunch: 'Chicken Wrap',
            dinner: 'Mushroom Risotto',
            snacks: ['Apple', 'Dark Chocolate']
          }
        },
        { 
          day: 'Friday', 
          date: 'Mar 22',
          meals: {
            breakfast: 'Pancakes',
            lunch: 'Salad',
            dinner: 'Homemade Pizza',
            snacks: ['Popcorn']
          }
        },
        { 
          day: 'Saturday', 
          date: 'Mar 23',
          meals: {
            breakfast: 'Brunch',
            lunch: 'Burgers',
            dinner: 'Date Night Recipe',
            snacks: ['Chips', 'Dip']
          }
        },
        { 
          day: 'Sunday', 
          date: 'Mar 24',
          meals: {
            breakfast: 'French Toast',
            lunch: 'Leftovers',
            dinner: 'Roast Chicken',
            snacks: ['Ice Cream']
          }
        }
      ],
      itemsUsed: ['Chicken', 'Mushrooms', 'Spinach', 'Eggs', 'Milk', 'Pasta', 'Avocado', 'Salmon', 'Quinoa'],
      notes: 'This was a great week! The mushroom risotto was a highlight. Would make again.',
      groceryList: [
        { item: 'Chicken Breast', quantity: '500g', purchased: true },
        { item: 'Fresh Mushrooms', quantity: '250g', purchased: true },
        { item: 'Spinach', quantity: '200g', purchased: true },
        { item: 'Avocados', quantity: '3', purchased: true },
        { item: 'Salmon Fillet', quantity: '2 pieces', purchased: true }
      ]
    },
    '2': {
      id: '2',
      weekNumber: 'Week 11',
      dateRange: 'Mar 11 - Mar 17, 2024',
      totalCalories: 1950,
      protein: 90,
      carbs: 220,
      fat: 70,
      cost: 92.30,
      inventoryMatch: 88,
      status: 'completed',
      meals: 21,
      daysCompleted: 7,
      mealPlan: [
        { 
          day: 'Monday', 
          date: 'Mar 11',
          meals: {
            breakfast: 'Oatmeal',
            lunch: 'Turkey Sandwich',
            dinner: 'Beef Stir Fry',
            snacks: ['Apple']
          }
        },
        // ... similar structure for other days
      ]
    }
  };

  useEffect(() => {
    if (id && weeklyPlansData[id]) {
      setWeeklyPlan(weeklyPlansData[id]);
    } else {
      setWeeklyPlan(weeklyPlansData['1']); // Fallback to first plan
    }
  }, [id]);

  const startEditMeal = (dayIndex, mealType, currentValue) => {
    setEditingMeal({ dayIndex, mealType });
    setEditValue(currentValue);
  };

  const saveEditMeal = () => {
    if (editingMeal && weeklyPlan) {
      const newMealPlan = [...weeklyPlan.mealPlan];
      const { dayIndex, mealType } = editingMeal;
      
      if (mealType === 'snacks') {
        newMealPlan[dayIndex].meals.snacks = editValue.split(',').map(s => s.trim());
      } else {
        newMealPlan[dayIndex].meals[mealType] = editValue;
      }
      
      setWeeklyPlan({
        ...weeklyPlan,
        mealPlan: newMealPlan
      });
      setEditingMeal(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingMeal(null);
    setEditValue('');
  };

  if (!weeklyPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-dark-300 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-2">{weeklyPlan.weekNumber}</h1>
            <p className="text-gray-400">{weeklyPlan.dateRange}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-400">{weeklyPlan.totalCalories}</div>
            <div className="text-sm text-gray-500">Avg Calories/Day</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{weeklyPlan.protein}g</div>
            <div className="text-sm text-gray-500">Protein/Day</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">${weeklyPlan.cost.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Cost</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{weeklyPlan.inventoryMatch}%</div>
            <div className="text-sm text-gray-500">Inventory Match</div>
          </div>
        </Card>
      </div>

      {/* Weekly Meal Plan */}
      <Card>
        <h3 className="text-xl font-bold mb-6">Weekly Meal Plan</h3>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
          {weeklyPlan.mealPlan.map((day, dayIndex) => (
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
                      onClick={() => startEditMeal(dayIndex, 'breakfast', day.meals.breakfast)}
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal && editingMeal.dayIndex === dayIndex && editingMeal.mealType === 'breakfast' ? (
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
                      onClick={() => startEditMeal(dayIndex, 'lunch', day.meals.lunch)}
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal && editingMeal.dayIndex === dayIndex && editingMeal.mealType === 'lunch' ? (
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
                      onClick={() => startEditMeal(dayIndex, 'dinner', day.meals.dinner)}
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal && editingMeal.dayIndex === dayIndex && editingMeal.mealType === 'dinner' ? (
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
                      onClick={() => startEditMeal(dayIndex, 'snacks', day.meals.snacks.join(', '))}
                      className="text-xs text-primary-400 hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  {editingMeal && editingMeal.dayIndex === dayIndex && editingMeal.mealType === 'snacks' ? (
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
                    <div className="text-sm">{day.meals.snacks.join(', ')}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Items Used */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <CheckCircle className="mr-2" />
            Items Used This Week
          </h3>
          <div className="flex flex-wrap gap-2">
            {weeklyPlan.itemsUsed.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="font-semibold mb-3">Notes</h4>
            <p className="text-gray-400">
              {weeklyPlan.notes}
            </p>
          </div>
        </Card>

        {/* Grocery List */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Grocery List</h3>
          <div className="space-y-3">
            {weeklyPlan.groceryList.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.purchased ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <div className="font-medium">{item.item}</div>
                    <div className="text-sm text-gray-500">{item.quantity}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${item.purchased ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {item.purchased ? 'Purchased' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-dark-300">
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1">
                Share with Family
              </Button>
              <Button variant="secondary" className="flex-1">
                Reuse This Plan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}