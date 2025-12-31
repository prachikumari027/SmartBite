'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ShoppingCart, Calendar, Store, DollarSign, ChevronRight, Search, Filter, Plus, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data - in real app, this would come from an API
const initialShoppingLists = [
  {
    id: 1,
    storeName: 'Whole Foods',
    date: '2024-02-15',
    totalAmount: 85.75,
    totalItems: 12,
    status: 'completed',
    items: [
      { name: 'Organic Milk', quantity: 2, unit: 'liters', price: 3.50, category: 'Dairy' },
      { name: 'Free-range Eggs', quantity: 12, unit: 'pieces', price: 4.20, category: 'Dairy' },
      { name: 'Avocados', quantity: 4, unit: 'pieces', price: 2.50, category: 'Fruits' },
      { name: 'Salmon Fillet', quantity: 500, unit: 'grams', price: 12.99, category: 'Seafood' },
    ]
  },
  {
    id: 2,
    storeName: 'Trader Joe\'s',
    date: '2024-02-10',
    totalAmount: 42.30,
    totalItems: 8,
    status: 'completed',
    items: [
      { name: 'Frozen Pizza', quantity: 2, unit: 'pieces', price: 5.99, category: 'Frozen' },
      { name: 'Orange Juice', quantity: 1, unit: 'liter', price: 3.49, category: 'Beverages' },
      { name: 'Almond Butter', quantity: 1, unit: 'jar', price: 6.99, category: 'Pantry' },
    ]
  },
  {
    id: 3,
    storeName: 'Costco',
    date: '2024-02-05',
    totalAmount: 125.50,
    totalItems: 15,
    status: 'completed',
    items: [
      { name: 'Toilet Paper', quantity: 24, unit: 'rolls', price: 18.99, category: 'Household' },
      { name: 'Chicken Breast', quantity: 3, unit: 'kg', price: 25.50, category: 'Meat' },
      { name: 'Coffee Beans', quantity: 1, unit: 'kg', price: 12.99, category: 'Beverages' },
    ]
  },
  {
    id: 4,
    storeName: 'Local Market',
    date: '2024-02-03',
    totalAmount: 28.45,
    totalItems: 5,
    status: 'completed',
    items: [
      { name: 'Fresh Bread', quantity: 2, unit: 'loaves', price: 3.50, category: 'Bakery' },
      { name: 'Tomatoes', quantity: 6, unit: 'pieces', price: 2.50, category: 'Vegetables' },
    ]
  },
  {
    id: 5,
    storeName: 'Amazon Fresh',
    date: '2024-01-28',
    totalAmount: 67.80,
    totalItems: 10,
    status: 'completed',
    items: [
      { name: 'Paper Towels', quantity: 12, unit: 'rolls', price: 14.99, category: 'Household' },
      { name: 'Pasta', quantity: 3, unit: 'packages', price: 8.97, category: 'Pantry' },
    ]
  },
  {
    id: 6,
    storeName: 'Walmart',
    date: '2024-01-25',
    totalAmount: 92.15,
    totalItems: 18,
    status: 'completed',
    items: [
      { name: 'Laundry Detergent', quantity: 1, unit: 'bottle', price: 12.99, category: 'Household' },
      { name: 'Cereal', quantity: 2, unit: 'boxes', price: 9.98, category: 'Breakfast' },
    ]
  },
  {
    id: 7,
    storeName: 'Target',
    date: '2024-01-20',
    totalAmount: 35.20,
    totalItems: 6,
    status: 'completed',
    items: [
      { name: 'Shampoo', quantity: 1, unit: 'bottle', price: 8.99, category: 'Personal Care' },
      { name: 'Body Wash', quantity: 1, unit: 'bottle', price: 6.49, category: 'Personal Care' },
    ]
  },
  {
    id: 8,
    storeName: 'Kroger',
    date: '2024-01-15',
    totalAmount: 54.60,
    totalItems: 9,
    status: 'completed',
    items: [
      { name: 'Ground Beef', quantity: 2, unit: 'lbs', price: 11.98, category: 'Meat' },
      { name: 'Potatoes', quantity: 5, unit: 'lbs', price: 3.99, category: 'Vegetables' },
    ]
  },
];

export default function ShoppingLists() {
  const router = useRouter();
  const [lists, setLists] = useState(initialShoppingLists);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const stores = ['All', ...new Set(lists.map(list => list.storeName))];
  const statusOptions = ['All', 'completed', 'pending', 'cancelled'];

  const handleRowClick = (id) => {
    router.push(`/view-shopping-list/${id}`);
  };

  const handleCreateNew = () => {
    // Generate a new list ID (in real app, this would be from API)
    const newId = lists.length > 0 ? Math.max(...lists.map(l => l.id)) + 1 : 1;
    router.push(`/shopping-lists/${newId}/edit`);
  };

  const filteredLists = lists
    .filter(list => {
      const matchesSearch = 
        list.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDate = dateFilter === 'all' || true; // Add date filtering logic
      const matchesStore = storeFilter === 'all' || list.storeName === storeFilter;
      
      return matchesSearch && matchesDate && matchesStore;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        case 'items':
          aValue = a.totalItems;
          bValue = b.totalItems;
          break;
        case 'store':
          aValue = a.storeName;
          bValue = b.storeName;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Stats calculations
  const totalSpent = lists.reduce((sum, list) => sum + list.totalAmount, 0);
  const totalItemsPurchased = lists.reduce((sum, list) => sum + list.totalItems, 0);
  const averageSpend = lists.length > 0 ? totalSpent / lists.length : 0;
  const mostFrequentStore = lists.length > 0 
    ? lists.reduce((acc, list) => {
        acc[list.storeName] = (acc[list.storeName] || 0) + 1;
        return acc;
      }, {})
    : {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping History</h1>
          <p className="text-gray-400">View and manage all your shopping lists</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={handleCreateNew}
        >
          <Plus size={18} />
          New Shopping List
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Lists</p>
          <p className="text-2xl font-bold">{lists.length}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-primary-400">${totalSpent.toFixed(2)}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Items Purchased</p>
          <p className="text-2xl font-bold text-green-400">{totalItemsPurchased}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Avg. per Trip</p>
          <p className="text-2xl font-bold text-yellow-400">${averageSpend.toFixed(2)}</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search lists or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Store Filter */}
            <div className="flex items-center gap-2">
              <Store size={18} className="text-gray-500" />
              <select
                value={storeFilter}
                onChange={(e) => setStoreFilter(e.target.value)}
                className="input-field min-w-30"
              >
                <option value="all">All Stores</option>
                {stores.filter(s => s !== 'All').map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-30"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="items">Items</option>
                <option value="store">Store</option>
              </select>
            </div>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input-field min-w-25"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Shopping Lists Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left py-4 px-4 font-semibold">Store</th>
                <th className="text-left py-4 px-4 font-semibold">Date</th>
                <th className="text-left py-4 px-4 font-semibold">Items</th>
                <th className="text-left py-4 px-4 font-semibold">Total Amount</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
                <th className="text-left py-4 px-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLists.map((list) => (
                <tr 
                  key={list.id}
                  onClick={() => handleRowClick(list.id)}
                  className="border-b border-dark-400/50 hover:bg-dark-300/50 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <Store size={20} className="text-primary-400" />
                      </div>
                      <div>
                        <div className="font-semibold">{list.storeName}</div>
                        <div className="text-sm text-gray-500">{list.items.length} unique items</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span>{new Date(list.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(list.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="font-semibold">{list.totalItems} items</div>
                    <div className="text-sm text-gray-500">
                      {list.items.slice(0, 2).map(item => item.name).join(', ')}
                      {list.items.length > 2 && '...'}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="font-bold text-lg">${list.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ${(list.totalAmount / list.totalItems).toFixed(2)} per item
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      list.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : list.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {list.status.charAt(0).toUpperCase() + list.status.slice(1)}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4">
                    <ChevronRight 
                      size={20} 
                      className="text-gray-500 group-hover:text-primary-400 transition-colors" 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center">
                <ShoppingCart size={48} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No shopping lists found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Start by creating your first shopping list'}
              </p>
              <Button 
                variant="primary" 
                className="flex items-center gap-2 mx-auto"
                onClick={handleCreateNew}
              >
                <Plus size={18} />
                Create Shopping List
              </Button>
            </div>
          )}
        </div>

        {/* Pagination (optional) */}
        {filteredLists.length > 0 && (
          <div className="flex items-center justify-between pt-6 border-t border-dark-400">
            <div className="text-sm text-gray-500">
              Showing {filteredLists.length} of {lists.length} lists
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Store Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold mb-6">Top Stores</h3>
          <div className="space-y-4">
            {Object.entries(mostFrequentStore)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([store, count]) => {
                const percentage = (count / lists.length * 100).toFixed(0);
                return (
                  <div key={store} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <Store size={18} className="text-primary-400" />
                      </div>
                      <span className="font-medium">{store}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-dark-400 rounded-full h-2">
                        <div 
                          className="bg-primary-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 min-w-10">{count} trips</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-6">Monthly Spending</h3>
          <div className="space-y-4">
            {/* This would be a chart in a real app */}
            {['Jan', 'Feb', 'Mar', 'Apr'].map((month) => (
              <div key={month} className="flex items-center justify-between">
                <span className="font-medium">{month} 2024</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-dark-400 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full" 
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold">
                    ${(Math.random() * 300 + 50).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}