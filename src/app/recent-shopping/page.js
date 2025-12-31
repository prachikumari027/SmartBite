'use client';

import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Calendar, Store, Receipt, TrendingDown, TrendingUp, Filter, Download } from 'lucide-react';

export default function RecentShopping() {
  const [timeRange, setTimeRange] = useState('month');
  const [sortBy, setSortBy] = useState('date');

  const shoppingHistory = [
    {
      id: 1,
      store: 'Whole Foods',
      date: '2024-02-10',
      amount: 42.50,
      items: 8,
      categoryBreakdown: { groceries: 32.50, household: 10.00 },
      receiptUrl: '#',
      savings: 15.20,
      trend: 'down',
    },
    {
      id: 2,
      store: 'Trader Joe\'s',
      date: '2024-02-05',
      amount: 28.75,
      items: 5,
      categoryBreakdown: { groceries: 28.75, household: 0 },
      receiptUrl: '#',
      savings: 8.50,
      trend: 'down',
    },
    {
      id: 3,
      store: 'Local Market',
      date: '2024-01-28',
      amount: 35.20,
      items: 6,
      categoryBreakdown: { groceries: 25.20, household: 10.00 },
      receiptUrl: '#',
      savings: 5.30,
      trend: 'up',
    },
    {
      id: 4,
      store: 'Costco',
      date: '2024-01-20',
      amount: 85.40,
      items: 12,
      categoryBreakdown: { groceries: 65.40, household: 20.00 },
      receiptUrl: '#',
      savings: 25.60,
      trend: 'down',
    },
    {
      id: 5,
      store: 'Walmart',
      date: '2024-01-15',
      amount: 38.90,
      items: 7,
      categoryBreakdown: { groceries: 28.90, household: 10.00 },
      receiptUrl: '#',
      savings: 12.40,
      trend: 'down',
    },
    {
      id: 6,
      store: 'Target',
      date: '2024-01-10',
      amount: 52.30,
      items: 9,
      categoryBreakdown: { groceries: 32.30, household: 20.00 },
      receiptUrl: '#',
      savings: 18.20,
      trend: 'up',
    },
  ];

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'Last 3 Months' },
    { id: 'year', label: 'This Year' },
  ];

  const filteredHistory = shoppingHistory.filter(item => {
    const itemDate = new Date(item.date);
    const now = new Date();
    
    switch(timeRange) {
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return itemDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return itemDate >= monthAgo;
      case 'quarter':
        const quarterAgo = new Date(now.setMonth(now.getMonth() - 3));
        return itemDate >= quarterAgo;
      case 'year':
        const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        return itemDate >= yearAgo;
      default:
        return true;
    }
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'savings') return b.savings - a.savings;
    return 0;
  });

  const totalSpent = filteredHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalSavings = filteredHistory.reduce((sum, item) => sum + item.savings, 0);
  const totalItems = filteredHistory.reduce((sum, item) => sum + item.items, 0);
  const avgPerTrip = filteredHistory.length > 0 ? totalSpent / filteredHistory.length : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Recent Shopping</h1>
        <p className="text-gray-400">Track your shopping history and expenses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-primary-400">${totalSpent.toFixed(2)}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Savings</p>
          <p className="text-2xl font-bold text-green-400">${totalSavings.toFixed(2)}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Shopping Trips</p>
          <p className="text-2xl font-bold">{filteredHistory.length}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Avg per Trip</p>
          <p className="text-2xl font-bold">${avgPerTrip.toFixed(2)}</p>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Time Range */}
          <div className="flex flex-wrap gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === range.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-300 hover:bg-dark-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="savings">Savings</option>
            </select>

            <Button variant="secondary" className="flex items-center gap-2">
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Shopping History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHistory.map((purchase) => (
          <Card key={purchase.id} hover>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Store size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{purchase.store}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(purchase.date).toLocaleDateString()}
                        </span>
                        <span>{purchase.items} items</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold">${purchase.amount.toFixed(2)}</div>
                  <div className="text-sm text-green-400 flex items-center justify-end">
                    {purchase.trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    Saved ${purchase.savings.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div>
                <h4 className="font-semibold mb-2 text-sm">Category Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(purchase.categoryBreakdown).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 capitalize">{category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-dark-300 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full"
                            style={{ width: `${(amount / purchase.amount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-16 text-right">
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-primary-500/20">
                <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                  <Receipt size={16} />
                  View Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  Repeat Purchase
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center">
              <Store size={48} className="text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No shopping history found</h3>
            <p className="text-gray-400 mb-6">Try selecting a different time range</p>
            <Button variant="primary" onClick={() => setTimeRange('year')}>
              View All History
            </Button>
          </div>
        </Card>
      )}

      {/* Analysis & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Monthly Spending Trend</h3>
          <div className="space-y-4">
            {[
              { month: 'Jan', spent: 185.50, savings: 45.20 },
              { month: 'Feb', spent: 142.75, savings: 38.50 },
              { month: 'Mar', spent: 0, savings: 0 },
            ].map((data, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{data.month}</span>
                  <div className="text-right">
                    <div className="font-semibold">${data.spent.toFixed(2)}</div>
                    <div className="text-sm text-green-400">Saved ${data.savings.toFixed(2)}</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-dark-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full"
                    style={{ width: `${(data.spent / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-primary-500/20">
            <p className="text-sm text-gray-400">
              💡 <span className="text-primary-400">Insight:</span> You're spending 23% less this month compared to January!
            </p>
          </div>
        </Card>

        {/* Store Analysis */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Store Analysis</h3>
          <div className="space-y-4">
            {[
              { store: 'Whole Foods', avgSpent: 42.50, frequency: 'Weekly' },
              { store: 'Trader Joe\'s', avgSpent: 28.75, frequency: 'Bi-weekly' },
              { store: 'Costco', avgSpent: 85.40, frequency: 'Monthly' },
            ].map((store, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg">
                <div>
                  <div className="font-medium">{store.store}</div>
                  <div className="text-sm text-gray-500">{store.frequency}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${store.avgSpent.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">Average per trip</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-primary-500/20">
            <p className="text-sm text-gray-400">
              🏪 <span className="text-primary-400">Tip:</span> Buying non-perishables in bulk at Costco could save 15% monthly
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}