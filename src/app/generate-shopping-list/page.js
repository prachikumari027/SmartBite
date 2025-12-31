"use client";

import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  ShoppingCart,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Download,
  Share2,
  Printer,
  Search,
  Trash2,
} from "lucide-react";

export default function GenerateShoppingList() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Milk",
      quantity: 2,
      unit: "liters",
      category: "Dairy",
      needed: true,
      inCart: false,
      estimatedPrice: 3.5,
    },
    {
      id: 2,
      name: "Eggs",
      quantity: 12,
      unit: "pieces",
      category: "Dairy",
      needed: true,
      inCart: false,
      estimatedPrice: 4.0,
    },
    {
      id: 3,
      name: "Tomatoes",
      quantity: 8,
      unit: "pieces",
      category: "Vegetables",
      needed: true,
      inCart: false,
      estimatedPrice: 2.5,
    },
    {
      id: 4,
      name: "Onions",
      quantity: 1,
      unit: "kg",
      category: "Vegetables",
      needed: false,
      inCart: false,
      estimatedPrice: 1.5,
    },
    {
      id: 5,
      name: "Chicken Breast",
      quantity: 500,
      unit: "grams",
      category: "Meat",
      needed: true,
      inCart: true,
      estimatedPrice: 8.0,
    },
    {
      id: 6,
      name: "Rice",
      quantity: 2,
      unit: "kg",
      category: "Grains",
      needed: false,
      inCart: false,
      estimatedPrice: 5.0,
    },
    {
      id: 7,
      name: "Bread",
      quantity: 1,
      unit: "loaf",
      category: "Bakery",
      needed: true,
      inCart: false,
      estimatedPrice: 2.5,
    },
    {
      id: 8,
      name: "Cheese",
      quantity: 200,
      unit: "grams",
      category: "Dairy",
      needed: true,
      inCart: false,
      estimatedPrice: 3.0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pieces",
    category: "Other",
    estimatedPrice: 0,
  });

  const categories = [
    "All",
    "Dairy",
    "Vegetables",
    "Fruits",
    "Meat",
    "Grains",
    "Bakery",
    "Other",
  ];

  const toggleInCart = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
  };

  const toggleNeeded = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, needed: !item.needed } : item
      )
    );
  };

  const updateQuantity = (id, delta) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      alert("Please enter an item name");
      return;
    }

    const newItemWithDefaults = {
      id: Date.now(), // Simple ID generation
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      category: newItem.category,
      estimatedPrice: parseFloat(newItem.estimatedPrice) || 0,
      needed: true,
      inCart: false,
    };

    setItems([...items, newItemWithDefaults]);

    // Reset form
    setNewItem({
      name: "",
      quantity: 1,
      unit: "pieces",
      category: "Other",
      estimatedPrice: 0,
    });
    setShowAddForm(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const neededItems = items.filter((item) => item.needed);
  const inCartItems = items.filter((item) => item.inCart);
  const totalEstimatedCost = items
    .filter((item) => item.needed)
    .reduce((sum, item) => sum + item.estimatedPrice * item.quantity, 0);

  // Available units for the dropdown
  const availableUnits = [
    "pieces",
    "kg",
    "grams",
    "liters",
    "ml",
    "pounds",
    "ounces",
    "pack",
    "box",
    "bottle",
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping List</h1>
          <p className="text-gray-400">
            Smart shopping list based on your inventory needs
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={18} />
          Add Item
        </Button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Add New Item</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-dark-400 rounded-lg"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="e.g., Apples, Milk, etc."
                className="input-field w-full"
                autoFocus
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseInt(e.target.value) || 1,
                  })
                }
                min="1"
                className="input-field w-full"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
                className="input-field w-full"
              >
                {availableUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="input-field w-full"
              >
                {categories
                  .filter((cat) => cat !== "All")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            {/* Estimated Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={newItem.estimatedPrice}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    estimatedPrice: parseFloat(e.target.value) || 0,
                  })
                }
                min="0"
                className="input-field w-full"
              />
            </div>

            {/* Add Button */}
            <div className="md:col-span-2 lg:col-span-4">
              <div className="flex gap-4 justify-end mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddItem}
                  className="flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add to List
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Total Items</p>
          <p className="text-2xl font-bold">{items.length}</p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Needed Items</p>
          <p className="text-2xl font-bold text-yellow-400">
            {neededItems.length}
          </p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">In Cart</p>
          <p className="text-2xl font-bold text-green-400">
            {inCartItems.length}
          </p>
        </Card>
        <Card hover={false}>
          <p className="text-gray-400 text-sm">Estimated Cost</p>
          <p className="text-2xl font-bold text-primary-400">
            ${totalEstimatedCost.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="secondary" className="flex items-center gap-2">
              <Download size={18} />
              Export
            </Button>
            <Button variant="primary" className="flex items-center gap-2">
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </div>
      </Card>

      {/* Shopping List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Shopping Items</h3>
              <div className="text-sm text-gray-500">
                {filteredItems.filter((i) => i.needed).length} of{" "}
                {filteredItems.length} items needed
              </div>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    item.inCart
                      ? "bg-green-500/10 border border-green-500/20"
                      : item.needed
                      ? "bg-dark-300 hover:bg-dark-200"
                      : "bg-dark-400/50 opacity-75"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleInCart(item.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.inCart
                          ? "bg-green-500 text-white"
                          : "border-2 border-primary-500/50"
                      }`}
                    >
                      {item.inCart && <CheckCircle size={14} />}
                    </button>

                    <div>
                      <div className="flex items-center space-x-3">
                        <h4
                          className={`font-medium ${
                            item.inCart ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.name}
                        </h4>
                        <span className="px-2 py-1 bg-dark-400 rounded-full text-xs">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        ${item.estimatedPrice.toFixed(2)} per {item.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-dark-400 rounded-lg"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-12 text-center font-semibold">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-dark-400 rounded-lg"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="text-sm text-gray-500">{item.unit}</span>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-15">
                      <div className="font-semibold">
                        ${(item.estimatedPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {/* Needed Toggle */}
                      <button
                        onClick={() => toggleNeeded(item.id)}
                        className={`p-2 rounded-lg ${
                          item.needed
                            ? "text-yellow-400 hover:bg-yellow-500/10"
                            : "text-gray-500 hover:bg-gray-500/10"
                        }`}
                      >
                        {item.needed ? (
                          <CheckCircle size={18} />
                        ) : (
                          <XCircle size={18} />
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                        title="Delete item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <ShoppingCart size={48} className="text-primary-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No items found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or add items to your list
                </p>
                <Button
                  variant="primary"
                  className="flex items-center gap-2 mx-auto"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={18} />
                  Add Your First Item
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Items Needed:</span>
                <span className="font-semibold">
                  {neededItems.length} items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items in Cart:</span>
                <span className="font-semibold text-green-400">
                  {inCartItems.length} items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Cost:</span>
                <span className="font-semibold text-primary-400">
                  ${totalEstimatedCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Savings vs Eating Out:</span>
                <span className="font-semibold text-green-400">$45.50</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary-500/20">
              <h4 className="font-semibold mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Order Online
                </Button>
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Print List
                </Button>
              </div>
            </div>
          </Card>

          {/* Store Optimization */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Store Optimization</h3>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 rounded-xl">
                <h4 className="font-semibold mb-2">🛒 Recommended Store</h4>
                <p className="text-sm text-gray-400">
                  Whole Foods has all items for $
                  {(totalEstimatedCost * 0.9).toFixed(2)}
                </p>
              </div>

              <div className="p-4 bg-green-500/10 rounded-xl">
                <h4 className="font-semibold mb-2">💰 Best Deal</h4>
                <p className="text-sm text-gray-400">
                  Eggs are 20% cheaper at Trader Joe's
                </p>
              </div>

              <div className="p-4 bg-yellow-500/10 rounded-xl">
                <h4 className="font-semibold mb-2">🚗 Delivery</h4>
                <p className="text-sm text-gray-400">
                  Instacart delivery in 2 hours: $5.99
                </p>
              </div>
            </div>
          </Card>

          {/* AI Suggestion */}
          <Card>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <h4 className="font-bold mb-2">AI Shopping Tip</h4>
              <p className="text-sm text-gray-400 mb-4">
                Buy in bulk: Rice and pasta have 30% discount on 5kg packs
              </p>
              <Button variant="outline" className="w-full">
                View Bulk Deals
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Purchases */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Purchases</h3>
          <a
            href="/recent-shopping"
            className="text-primary-400 hover:text-primary-300 text-sm"
          >
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { store: "Whole Foods", date: "Feb 10", amount: 42.5, items: 8 },
            { store: "Trader Joe's", date: "Feb 5", amount: 28.75, items: 5 },
            { store: "Local Market", date: "Jan 28", amount: 35.2, items: 6 },
          ].map((purchase, idx) => (
            <div key={idx} className="bg-dark-300 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{purchase.store}</h4>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  ${purchase.amount}
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{purchase.date}</span>
                <span>{purchase.items} items</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
