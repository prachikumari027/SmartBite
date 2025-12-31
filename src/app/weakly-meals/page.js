'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import { Calendar, ChevronRight, Clock, Users, CheckCircle } from 'lucide-react';

export default function PreviousMeals() {
  const router = useRouter();
  const [weeklyPlans, setWeeklyPlans] = useState([
    {
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
      daysCompleted: 7
    },
    {
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
      daysCompleted: 7
    },
    {
      id: '3',
      weekNumber: 'Week 10',
      dateRange: 'Mar 4 - Mar 10, 2024',
      totalCalories: 1750,
      protein: 80,
      carbs: 200,
      fat: 60,
      cost: 78.90,
      inventoryMatch: 95,
      status: 'completed',
      meals: 21,
      daysCompleted: 7
    },
    {
      id: '4',
      weekNumber: 'Week 9',
      dateRange: 'Feb 26 - Mar 3, 2024',
      totalCalories: 1900,
      protein: 88,
      carbs: 215,
      fat: 68,
      cost: 89.75,
      inventoryMatch: 85,
      status: 'in-progress',
      meals: 21,
      daysCompleted: 3
    },
    {
      id: '5',
      weekNumber: 'Week 8',
      dateRange: 'Feb 19 - Feb 25, 2024',
      totalCalories: 1800,
      protein: 82,
      carbs: 205,
      fat: 62,
      cost: 82.40,
      inventoryMatch: 90,
      status: 'completed',
      meals: 21,
      daysCompleted: 7
    },
    {
      id: '6',
      weekNumber: 'Week 7',
      dateRange: 'Feb 12 - Feb 18, 2024',
      totalCalories: 1850,
      protein: 85,
      carbs: 210,
      fat: 65,
      cost: 85.50,
      inventoryMatch: 92,
      status: 'completed',
      meals: 21,
      daysCompleted: 7
    }
  ]);

  const handleViewDetails = (id) => {
    router.push(`/weakly-meals/${id}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'planned': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Previous Weekly Plans</h1>
          <p className="text-gray-400">View and manage your past weekly meal plans</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-dark-300 hover:bg-dark-200 rounded-lg transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
            New Plan
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-300">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Week</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Nutrition</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Cost</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {weeklyPlans.map((plan) => (
                <tr 
                  key={plan.id} 
                  className="border-b border-dark-300 hover:bg-dark-200 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(plan.id)}
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold">{plan.weekNumber}</div>
                      <div className="text-sm text-gray-500">{plan.dateRange}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-sm">{plan.totalCalories} cal</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        P:{plan.protein}g • C:{plan.carbs}g • F:{plan.fat}g
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold">${plan.cost.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{plan.inventoryMatch}% match</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(plan.status)}`}>
                      {getStatusText(plan.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-dark-300 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-full rounded-full"
                          style={{ width: `${(plan.daysCompleted / 7) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{plan.daysCompleted}/7 days</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(plan.id);
                      }}
                      className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary-500/20">
                <Calendar className="text-primary-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">{weeklyPlans.length}</div>
                <div className="text-sm text-gray-500">Total Plans</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {weeklyPlans.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Users className="text-blue-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${weeklyPlans.reduce((sum, plan) => sum + plan.cost, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Total Cost</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-purple-500/20">
                <Clock className="text-purple-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {weeklyPlans.reduce((sum, plan) => sum + plan.meals, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Meals</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}