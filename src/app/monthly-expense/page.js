'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  DollarSign, TrendingUp, TrendingDown, PieChart, Calendar, 
  Download, Filter, BarChart3, Target, ShoppingBag, Home, Utensils
} from 'lucide-react';

export default function MonthlyExpense() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredBar, setHoveredBar] = useState(null);

  const monthlyData = {
    currentMonth: {
      total: 325.50,
      groceries: 185.50,
      household: 85.00,
      diningOut: 55.00,
      savings: 45.20,
    },
    lastMonth: {
      total: 385.75,
      groceries: 210.25,
      household: 95.50,
      diningOut: 80.00,
      savings: 38.50,
    },
    categories: [
      { 
        name: 'Groceries', 
        icon: <ShoppingBag size={16} />,
        amount: 185.50, 
        percentage: 57, 
        color: 'bg-gradient-to-r from-primary-500 to-primary-600',
        trend: 'down',
        weeklyBreakdown: [45, 38, 52, 50.5]
      },
      { 
        name: 'Household', 
        icon: <Home size={16} />,
        amount: 85.00, 
        percentage: 26, 
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        trend: 'down',
        weeklyBreakdown: [25, 18, 22, 20]
      },
      { 
        name: 'Dining Out', 
        icon: <Utensils size={16} />,
        amount: 55.00, 
        percentage: 17, 
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        trend: 'down',
        weeklyBreakdown: [20, 12, 15, 8]
      },
    ],
    trendData: [
      { month: 'Jan', groceries: 195, household: 92, diningOut: 65, total: 352 },
      { month: 'Feb', groceries: 185.5, household: 85, diningOut: 55, total: 325.5 },
      { month: 'Mar', groceries: 210, household: 95, diningOut: 70, total: 375 },
      { month: 'Apr', groceries: 175, household: 78, diningOut: 45, total: 298 },
      { month: 'May', groceries: 190, household: 82, diningOut: 60, total: 332 },
      { month: 'Jun', groceries: 185, household: 80, diningOut: 52, total: 317 },
    ],
  };

  const weeklyData = [
    { week: 'Week 1', amount: 98.50 },
    { week: 'Week 2', amount: 85.75 },
    { week: 'Week 3', amount: 78.25 },
    { week: 'Week 4', amount: 63.00 },
  ];

  const recentTransactions = [
    { id: 1, date: 'Feb 10', store: 'Whole Foods', amount: 42.50, category: 'groceries' },
    { id: 2, date: 'Feb 8', store: 'Target', amount: 25.30, category: 'household' },
    { id: 3, date: 'Feb 5', store: 'Trader Joe\'s', amount: 28.75, category: 'groceries' },
    { id: 4, date: 'Feb 3', store: 'Restaurant', amount: 35.00, category: 'dining' },
    { id: 5, date: 'Feb 1', store: 'Costco', amount: 85.40, category: 'groceries' },
  ];

  const savingsOpportunities = [
    { title: 'Bulk Buying', amount: 25, description: 'Save on rice, pasta, and canned goods' },
    { title: 'Meal Planning', amount: 40, description: 'Reduce dining out by 2 times/week' },
    { title: 'Store Switching', amount: 15, description: 'Certain items cheaper at Trader Joe\'s' },
  ];

  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: current < previous,
    };
  };

  const totalChange = calculateChange(monthlyData.currentMonth.total, monthlyData.lastMonth.total);

  // Find max amount for scaling
  const maxAmount = Math.max(...monthlyData.trendData.map(d => d.total));
  const maxWeeklyAmount = Math.max(...weeklyData.map(d => d.amount));

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'groceries': return <ShoppingBag size={14} />;
      case 'household': return <Home size={14} />;
      case 'dining': return <Utensils size={14} />;
      default: return <DollarSign size={14} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Monthly Expenses</h1>
        <p className="text-gray-400">Track and optimize your food and household spending</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-2xl font-bold">${monthlyData.currentMonth.total}</p>
            </div>
            <div className={`p-3 rounded-full ${
              totalChange.isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {totalChange.isPositive ? 
                <TrendingDown className="text-green-400" size={24} /> : 
                <TrendingUp className="text-red-400" size={24} />
              }
            </div>
          </div>
          <p className={`text-sm mt-2 ${
            totalChange.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {totalChange.isPositive ? '↓' : '↑'} {totalChange.value}% from last month
          </p>
        </Card>

        <Card hover={false}>
          <p className="text-gray-400 text-sm">Groceries</p>
          <p className="text-2xl font-bold text-primary-400">${monthlyData.currentMonth.groceries}</p>
          <p className="text-sm text-gray-500 mt-2">
            {calculateChange(monthlyData.currentMonth.groceries, monthlyData.lastMonth.groceries).isPositive ? '↓' : '↑'} 
            {calculateChange(monthlyData.currentMonth.groceries, monthlyData.lastMonth.groceries).value}%
          </p>
        </Card>

        <Card hover={false}>
          <p className="text-gray-400 text-sm">Savings</p>
          <p className="text-2xl font-bold text-green-400">${monthlyData.currentMonth.savings}</p>
          <p className="text-sm text-gray-500 mt-2">
            ↑ {calculateChange(monthlyData.currentMonth.savings, monthlyData.lastMonth.savings).value}% more saved
          </p>
        </Card>

        <Card hover={false}>
          <p className="text-gray-400 text-sm">Avg Daily</p>
          <p className="text-2xl font-bold">${(monthlyData.currentMonth.total / 30).toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Based on current month</p>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['week', 'month', 'quarter', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-all capitalize flex items-center gap-2 ${
                  timeRange === range
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-300 hover:bg-dark-200'
                }`}
              >
                <Calendar size={16} />
                {range}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'all' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-300'
                }`}
              >
                All Categories
              </button>
              {monthlyData.categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedCategory === cat.name ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-300'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend Chart */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Monthly Trend Analysis</h3>
          
          <div className="space-y-6">
            {/* Stacked Bar Chart */}
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end space-x-2 px-4">
                {monthlyData.trendData.map((monthData, idx) => {
                  const barHeight = (monthData.total / maxAmount) * 80;
                  
                  return (
                    <div 
                      key={idx} 
                      className="flex-1 flex flex-col items-center"
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="w-full relative h-full flex items-end">
                        {/* Groceries Segment */}
                        <div 
                          className="w-full bg-linear-to-t from-primary-500/80 to-primary-600 rounded-t"
                          style={{ 
                            height: `${(monthData.groceries / monthData.total) * 100}%`,
                            marginBottom: '1px'
                          }}
                        ></div>
                        
                        {/* Household Segment */}
                        <div 
                          className="w-full bg-linear-to-t from-blue-500/80 to-blue-600 rounded-t"
                          style={{ 
                            height: `${(monthData.household / monthData.total) * 100}%`,
                            marginBottom: '1px'
                          }}
                        ></div>
                        
                        {/* Dining Out Segment */}
                        <div 
                          className="w-full bg-linear-to-t from-green-500/80 to-green-600 rounded-t"
                          style={{ 
                            height: `${(monthData.diningOut / monthData.total) * 100}%`
                          }}
                        ></div>
                      </div>
                      
                      {/* Month Label */}
                      <div className="mt-2 text-sm text-gray-500">{monthData.month}</div>
                      
                      {/* Hover Tooltip */}
                      {hoveredBar === idx && (
                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-dark-400 rounded-lg p-3 shadow-xl border border-primary-500/20 z-10 min-w-32">
                          <div className="text-center mb-2">
                            <div className="font-bold">${monthData.total}</div>
                            <div className="text-xs text-gray-400">Total for {monthData.month}</div>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                Groceries
                              </span>
                              <span className="font-semibold">${monthData.groceries}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                Household
                              </span>
                              <span className="font-semibold">${monthData.household}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                Dining
                              </span>
                              <span className="font-semibold">${monthData.diningOut}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Y-axis Labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between pb-8 text-xs text-gray-500">
                {[0, 100, 200, 300, 400].map(value => (
                  <div key={value} className="relative">
                    <span>${value}</span>
                    <div className="absolute left-12 top-1/2 w-full border-t border-gray-700/50"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6">
              {monthlyData.categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color.includes('primary') ? 'bg-primary-500' : cat.color.includes('blue') ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className="text-sm">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Weekly Breakdown */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Weekly Spending Pattern</h3>
          
          <div className="space-y-6">
            {/* Weekly Bars */}
            <div className="h-48 relative">
              <div className="absolute inset-0 flex items-end space-x-4 px-4">
                {weeklyData.map((week, idx) => {
                  const height = (week.amount / maxWeeklyAmount) * 100;
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div className="w-16 relative">
                        {/* Animated gradient bar */}
                        <div 
                          className="bg-linear-to-t from-purple-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-90"
                          style={{ height: `${height}%` }}
                        >
                          {/* Inner shine effect */}
                          <div className="h-full w-full bg-linear-to-b from-white/10 to-transparent rounded-t-lg"></div>
                        </div>
                        
                        {/* Value on hover */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-400 px-2 py-1 rounded text-sm whitespace-nowrap transition-opacity">
                          ${week.amount}
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">{week.week}</div>
                      <div className="text-xs text-gray-400">${week.amount}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 25, 50, 75, 100].map(percent => (
                  <div 
                    key={percent}
                    className="border-t border-gray-700/30"
                    style={{ height: `${percent}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Weekly Insights */}
            <div className="space-y-4">
              <div className="p-4 bg-linear-to-r from-purple-500/10 to-blue-500/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Weekly Trend Analysis</p>
                    <p className="text-sm text-gray-500">Consistent decrease over the month</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400">
                      <TrendingDown size={20} className="mr-2" />
                      <span className="font-bold">36% ↓</span>
                    </div>
                    <p className="text-sm text-gray-500">Week 1 → Week 4</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-dark-300 rounded-lg">
                  <p className="text-sm text-gray-500">Peak Spending</p>
                  <p className="font-bold">Week 1</p>
                  <p className="text-xs text-gray-400">${weeklyData[0].amount}</p>
                </div>
                <div className="p-3 bg-dark-300 rounded-lg">
                  <p className="text-sm text-gray-500">Lowest Spending</p>
                  <p className="font-bold">Week 4</p>
                  <p className="text-xs text-gray-400">${weeklyData[3].amount}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Analysis */}
      <Card>
        <h3 className="text-xl font-bold mb-6">Detailed Category Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {monthlyData.categories.map((category, idx) => (
            <div key={idx} className="bg-dark-300 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${category.color.includes('primary') ? 'bg-primary-500/20' : category.color.includes('blue') ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-bold">{category.name}</h4>
                    <div className="text-2xl font-bold mt-1">${category.amount}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${category.trend === 'down' ? 'text-green-400' : 'text-red-400'}`}>
                    {category.trend === 'down' ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                    <span className="ml-1 text-sm">12%</span>
                  </div>
                  <div className="text-xs text-gray-400">vs last month</div>
                </div>
              </div>
              
              {/* Weekly breakdown mini bars */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Weekly Breakdown</p>
                <div className="flex items-end gap-1 h-12">
                  {category.weeklyBreakdown.map((amount, weekIdx) => (
                    <div key={weekIdx} className="flex-1">
                      <div 
                        className={`${category.color.includes('primary') ? 'bg-primary-500/60' : category.color.includes('blue') ? 'bg-blue-500/60' : 'bg-green-500/60'} rounded-t`}
                        style={{ height: `${(amount / Math.max(...category.weeklyBreakdown)) * 40}px` }}
                      ></div>
                      <div className="text-xs text-gray-500 text-center mt-1">W{weekIdx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500">{category.percentage}% of total expenses</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
          <Button variant="outline">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Store</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-primary-500/10 hover:bg-dark-300/50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{transaction.date}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{transaction.store}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 ${
                      transaction.category === 'groceries' ? 'bg-primary-500/20 text-primary-400' :
                      transaction.category === 'household' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {getCategoryIcon(transaction.category)}
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">${transaction.amount}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Processed</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="px-3 py-1 bg-linear-to-r from-primary-500/20 to-purple-500/20 text-primary-400 rounded-full text-sm">
                🤖 AI Spending Analysis
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Smart Budget Optimization</h3>
            
            {/* Progress bars for recommendations */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Dining Out Reduction</span>
                  <span className="text-green-400">Potential: $40/month</span>
                </div>
                <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Cook 2 more meals at home each week</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Bulk Shopping</span>
                  <span className="text-blue-400">Potential: $25/month</span>
                </div>
                <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Buy non-perishables in larger quantities</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Store Optimization</span>
                  <span className="text-purple-400">Potential: $15/month</span>
                </div>
                <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Compare prices across different stores</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 lg:mt-0">
            <div className="w-64 h-64 relative rounded-2xl overflow-hidden bg-linear-to-br from-primary-500/10 to-purple-600/10 flex items-center justify-center">
              {/* Animated rings */}
              <div className="absolute w-48 h-48 border-2 border-primary-500/20 rounded-full animate-pulse"></div>
              <div className="absolute w-40 h-40 border-2 border-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="text-center z-10">
                <div className="text-5xl font-bold mb-2 bg-linear-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  $80
                </div>
                <div className="text-gray-400">Monthly Savings</div>
                <div className="text-green-400 mt-2">Potential</div>
                
                {/* Mini chart */}
                <div className="flex items-end justify-center gap-1 mt-4 h-12">
                  {[40, 60, 80, 60, 40, 80].map((val, idx) => (
                    <div 
                      key={idx}
                      className="w-3 bg-linear-to-t from-primary-500/50 to-primary-600 rounded-t"
                      style={{ height: `${val}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}