'use client';

import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Camera, Keyboard, Mic, Receipt, Upload, X } from 'lucide-react';

export default function UpdateInventory() {
  const [activeTab, setActiveTab] = useState('smart-scan');
  const [manualItems, setManualItems] = useState([
    { id: 1, name: 'Milk', quantity: '2', unit: 'liters', category: 'Dairy' },
    { id: 2, name: 'Eggs', quantity: '12', unit: 'pieces', category: 'Dairy' },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'pieces',
    category: 'Other',
    expiry: '',
  });

  const tabs = [
    { id: 'smart-scan', label: 'Smart Scan', icon: <Camera />, color: 'from-purple-500 to-pink-500' },
    { id: 'manual', label: 'Manual Entry', icon: <Keyboard />, color: 'from-blue-500 to-cyan-500' },
    { id: 'voice', label: 'Voice Input', icon: <Mic />, color: 'from-green-500 to-emerald-500' },
    { id: 'receipt', label: 'Receipt Scan', icon: <Receipt />, color: 'from-orange-500 to-red-500' },
  ];

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Spices', 'Other'];
  const units = ['pieces', 'grams', 'kilograms', 'liters', 'ml', 'packets'];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) return;
    
    setManualItems([
      ...manualItems,
      { 
        id: manualItems.length + 1, 
        ...newItem,
        expiry: newItem.expiry || 'Not set'
      }
    ]);
    
    setNewItem({
      name: '',
      quantity: '',
      unit: 'pieces',
      category: 'Other',
      expiry: '',
    });
  };

  const handleRemoveItem = (id) => {
    setManualItems(manualItems.filter(item => item.id !== id));
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewItem(prev => ({ ...prev, name: transcript }));
      };
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Update Inventory</h1>
        <p className="text-gray-400">Choose your preferred method to add items to your inventory</p>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              activeTab === tab.id
                ? `border-primary-500 bg-linear-to-br ${tab.color}/20`
                : 'border-dark-300 hover:border-primary-500/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-full bg-linear-to-br ${tab.color}`}>
                {tab.icon}
              </div>
              <span className="font-semibold">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card>
        {/* Smart Scan */}
        {activeTab === 'smart-scan' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20 border-4 border-dashed border-primary-500/30 flex items-center justify-center">
                <Camera size={48} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Camera Scan</h3>
              <p className="text-gray-400 mb-6">Take a photo of your fridge or individual items</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="flex items-center justify-center gap-2">
                  <Camera />
                  Take Photo
                </Button>
                <Button variant="secondary" className="flex items-center justify-center gap-2">
                  <Upload />
                  Upload Image
                </Button>
              </div>
            </div>

            <div className="border-t border-primary-500/20 pt-6">
              <h4 className="font-semibold mb-4">Recent Scans</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Tomatoes', 'Onions', 'Milk', 'Cheese'].map((item, idx) => (
                  <div key={idx} className="bg-dark-300 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <span>📷</span>
                    </div>
                    <p className="font-medium">{item}</p>
                    <p className="text-xs text-gray-500">95% confidence</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry */}
        {activeTab === 'manual' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="input-field w-full"
                  placeholder="e.g., Tomatoes"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="input-field w-full"
                    placeholder="e.g., 5"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="input-field w-full"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="input-field w-full"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={newItem.expiry}
                  onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
                  className="input-field w-full"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-1 flex items-end">
                <Button 
                  onClick={handleAddItem} 
                  variant="primary" 
                  className="w-full"
                  disabled={!newItem.name || !newItem.quantity}
                >
                  Add to Inventory
                </Button>
              </div>
            </div>

            {/* Recent Added Items */}
            <div className="border-t border-primary-500/20 pt-6">
              <h4 className="font-semibold mb-4">Recently Added Items</h4>
              <div className="space-y-3">
                {manualItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-dark-300/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} • {item.category} • Expiry: {item.expiry}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-full transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Voice Input */}
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-green-500/20 to-emerald-500/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-linear-to-r from-green-500/30 to-emerald-500/30 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Mic size={64} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Voice Input</h3>
              <p className="text-gray-400 mb-6">Speak naturally to add items to your inventory</p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleVoiceInput}
                  variant="primary" 
                  className="w-full max-w-xs mx-auto flex items-center justify-center gap-2"
                >
                  <Mic />
                  Start Speaking
                </Button>
                
                <p className="text-sm text-gray-500">Try saying: "Add 2 liters of milk" or "I have 5 tomatoes"</p>
              </div>
            </div>

            <div className="border-t border-primary-500/20 pt-6">
              <h4 className="font-semibold mb-4">Voice Commands Guide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Add [quantity] [item]",
                  "Remove [item]",
                  "Update [item] to [quantity]",
                  "Check inventory for [item]",
                  "Set expiry for [item] to [date]"
                ].map((cmd, idx) => (
                  <div key={idx} className="bg-dark-300 rounded-lg p-4">
                    <p className="font-mono text-primary-400">{cmd}</p>
                    <p className="text-sm text-gray-500 mt-1">Example: "{cmd.replace('[quantity]', '2').replace('[item]', 'milk')}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Receipt Scan */}
        {activeTab === 'receipt' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-64 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 to-red-500/20 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/30 to-red-500/30 rounded-2xl transform -rotate-3"></div>
                <div className="absolute inset-0 bg-dark-500 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Receipt size={24} />
                      </div>
                      <p className="font-bold">GROCERY STORE</p>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <span>Milk</span>
                        <span>$3.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eggs</span>
                        <span>$4.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tomatoes</span>
                        <span>$2.50</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>TOTAL</span>
                      <span>$10.00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Scan Receipt</h3>
              <p className="text-gray-400 mb-6">Upload a photo of your grocery receipt</p>
              
              <div className="space-y-4">
                <Button variant="primary" className="w-full max-w-xs mx-auto flex items-center justify-center gap-2">
                  <Camera />
                  Scan Receipt
                </Button>
                
                <div className="text-sm text-gray-500">
                  <p>Supported: PDF, JPG, PNG</p>
                  <p>Automatically extracts items, quantities, and prices</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Tips */}
      <Card>
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-primary-500/20">
            💡
          </div>
          <div>
            <h4 className="font-semibold mb-2">Pro Tips for Better Inventory Management</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Use Smart Scan for quick updates after grocery shopping</li>
              <li>• Set expiry dates for perishable items</li>
              <li>• Update quantities when you use items</li>
              <li>• Scan receipts to automatically track expenses</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}