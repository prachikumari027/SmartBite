'use client';

import { useState } from 'react';
import Card from '../components/Card';
import { Search, Filter, Grid, List, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

export default function ViewInventory() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const inventoryItems = [
    { id: 1, name: 'Milk', quantity: '2', unit: 'liters', category: 'Dairy', expiry: '2024-02-15', status: 'low' },
    { id: 2, name: 'Eggs', quantity: '12', unit: 'pieces', category: 'Dairy', expiry: '2024-02-20', status: 'good' },
    { id: 3, name: 'Tomatoes', quantity: '8', unit: 'pieces', category: 'Vegetables', expiry: '2024-02-12', status: 'warning' },
    { id: 4, name: 'Onions', quantity: '1', unit: 'kg', category: 'Vegetables', expiry: '2024-03-01', status: 'good' },
    { id: 5, name: 'Chicken Breast', quantity: '500', unit: 'grams', category: 'Meat', expiry: '2024-02-10', status: 'warning' },
    { id: 6, name: 'Rice', quantity: '5', unit: 'kg', category: 'Grains', expiry: '2024-12-01', status: 'good' },
    { id: 7, name: 'Bread', quantity: '1', unit: 'loaf', category: 'Bakery', expiry: '2024-02-09', status: 'critical' },
    { id: 8, name: 'Cheese', quantity: '200', unit: 'grams', category: 'Dairy', expiry: '2024-02-25', status: 'good' },
  ];

  const categories = ['All', 'Dairy', 'Vegetables', 'Fruits', 'Meat', 'Grains', 'Spices', 'Bakery', 'Other'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'good': return 'Good Stock';
      case 'warning': return 'Expiring Soon';
      case 'low': return 'Low Stock';
      case 'critical': return 'Expired/Urgent';
      default: return 'Unknown';
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'expiry') return new Date(a.expiry) - new Date(b.expiry);
    if (sortBy === 'quantity') return parseFloat(b.quantity) - parseFloat(a.quantity);
    return 0;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">View Inventory</h1>
        <p className="text-gray-400">Manage and track all items in your kitchen</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Items</p>
          <p className="text-2xl font-bold text-primary-400">{inventoryItems.length}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Expiring Soon</p>
          <p className="text-2xl font-bold text-yellow-400">3</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Low Stock</p>
          <p className="text-2xl font-bold text-orange-400">2</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Categories</p>
          <p className="text-2xl font-bold text-green-400">6</p>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-300'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-300'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="name">Sort by Name</option>
            <option value="expiry">Sort by Expiry</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
        </div>
      </Card>

      {/* Inventory Items */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <div className="space-y-4">
                {/* Item Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <p className="text-3xl font-bold text-center">
                    {item.quantity}
                    <span className="text-sm font-normal text-gray-400 ml-1">{item.unit}</span>
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiry:</span>
                    <span className={`font-medium ${
                      item.status === 'critical' ? 'text-red-400' : 
                      item.status === 'warning' ? 'text-yellow-400' : 
                      'text-green-400'
                    }`}>
                      {new Date(item.expiry).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Days Left:</span>
                    <span className="font-medium">
                      {Math.ceil((new Date(item.expiry) - new Date()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-primary-500/20">
                  <button className="flex-1 p-2 bg-primary-500/10 hover:bg-primary-500/20 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="flex-1 p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-500/20">
                  <th className="text-left py-3 px-4">Item</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Quantity</th>
                  <th className="text-left py-3 px-4">Expiry</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-primary-500/10 hover:bg-dark-300/50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{item.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-dark-300 rounded-full text-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-medium ${
                        item.status === 'critical' ? 'text-red-400' : 
                        item.status === 'warning' ? 'text-yellow-400' : 
                        'text-green-400'
                      }`}>
                        {new Date(item.expiry).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-primary-500/10 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center">
              <Search size={48} className="text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or add new items to inventory</p>
            <a href="/update-inventory" className="btn-primary inline-flex items-center gap-2">
              Add Items
            </a>
          </div>
        </Card>
      )}
    </div>
  );
}