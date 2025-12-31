"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import {
  ArrowLeft,
  Store,
  Calendar,
  DollarSign,
  Package,
  CreditCard,
  Download,
  Printer,
  Share2,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ShoppingBag,
  TrendingDown,
} from "lucide-react";

// Mock data - in real app, fetch from API based on ID
const mockShoppingLists = {
  1: {
    id: 1,
    storeName: "Whole Foods",
    date: "2024-02-15",
    totalAmount: 85.75,
    totalItems: 12,
    status: "completed",
    paymentMethod: "Visa **** 1234",
    receiptNumber: "WF-20240215-001",
    notes: "Organic products only. Used reusable bags.",
    items: [
      {
        id: 1,
        name: "Organic Milk",
        quantity: 2,
        unit: "liters",
        price: 3.5,
        category: "Dairy",
        purchased: true,
      },
      {
        id: 2,
        name: "Free-range Eggs",
        quantity: 12,
        unit: "pieces",
        price: 4.2,
        category: "Dairy",
        purchased: true,
      },
      {
        id: 3,
        name: "Avocados",
        quantity: 4,
        unit: "pieces",
        price: 2.5,
        category: "Fruits",
        purchased: true,
      },
      {
        id: 4,
        name: "Salmon Fillet",
        quantity: 500,
        unit: "grams",
        price: 12.99,
        category: "Seafood",
        purchased: true,
      },
      {
        id: 5,
        name: "Organic Spinach",
        quantity: 1,
        unit: "bag",
        price: 4.99,
        category: "Vegetables",
        purchased: true,
      },
      {
        id: 6,
        name: "Whole Wheat Bread",
        quantity: 2,
        unit: "loaves",
        price: 3.99,
        category: "Bakery",
        purchased: true,
      },
      {
        id: 7,
        name: "Greek Yogurt",
        quantity: 3,
        unit: "containers",
        price: 2.49,
        category: "Dairy",
        purchased: true,
      },
      {
        id: 8,
        name: "Almonds",
        quantity: 200,
        unit: "grams",
        price: 5.99,
        category: "Snacks",
        purchased: true,
      },
      {
        id: 9,
        name: "Bananas",
        quantity: 6,
        unit: "pieces",
        price: 1.99,
        category: "Fruits",
        purchased: true,
      },
      {
        id: 10,
        name: "Quinoa",
        quantity: 1,
        unit: "kg",
        price: 8.99,
        category: "Grains",
        purchased: true,
      },
      {
        id: 11,
        name: "Olive Oil",
        quantity: 1,
        unit: "bottle",
        price: 12.99,
        category: "Pantry",
        purchased: true,
      },
      {
        id: 12,
        name: "Dark Chocolate",
        quantity: 2,
        unit: "bars",
        price: 3.99,
        category: "Snacks",
        purchased: true,
      },
    ],
    savings: [
      { description: "Weekly Deals", amount: 8.5 },
      { description: "Member Discount", amount: 4.25 },
      { description: "Digital Coupons", amount: 3.0 },
    ],
  },
  2: {
    id: 2,
    storeName: "Trader Joe's",
    date: "2024-02-10",
    totalAmount: 42.3,
    totalItems: 8,
    status: "completed",
    paymentMethod: "Apple Pay",
    receiptNumber: "TJ-20240210-045",
    notes: "",
    items: [
      {
        id: 1,
        name: "Frozen Pizza",
        quantity: 2,
        unit: "pieces",
        price: 5.99,
        category: "Frozen",
        purchased: true,
      },
      {
        id: 2,
        name: "Orange Juice",
        quantity: 1,
        unit: "liter",
        price: 3.49,
        category: "Beverages",
        purchased: true,
      },
      {
        id: 3,
        name: "Almond Butter",
        quantity: 1,
        unit: "jar",
        price: 6.99,
        category: "Pantry",
        purchased: true,
      },
      {
        id: 4,
        name: "Frozen Mango",
        quantity: 1,
        unit: "bag",
        price: 3.99,
        category: "Frozen",
        purchased: true,
      },
      {
        id: 5,
        name: "Coconut Milk",
        quantity: 2,
        unit: "cans",
        price: 2.49,
        category: "Pantry",
        purchased: true,
      },
      {
        id: 6,
        name: "Dark Chocolate Almonds",
        quantity: 1,
        unit: "bag",
        price: 4.99,
        category: "Snacks",
        purchased: true,
      },
      {
        id: 7,
        name: "Everything Bagel Seasoning",
        quantity: 1,
        unit: "jar",
        price: 2.99,
        category: "Spices",
        purchased: true,
      },
      {
        id: 8,
        name: "Flowers",
        quantity: 1,
        unit: "bouquet",
        price: 3.99,
        category: "Other",
        purchased: true,
      },
    ],
    savings: [{ description: "Seasonal Sale", amount: 5.2 }],
  },
};

export default function ShoppingListDetail() {
  const params = useParams();
  const router = useRouter();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const listData = mockShoppingLists[params.id] || null;
      setList(listData);
      setLoading(false);
    }, 300);
  }, [params.id]);

  const handleBack = () => {
    router.push("/shopping-lists");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this shopping list?")) {
      // In real app, make API call to delete
      router.push("/shopping-lists");
    }
  };

  const handleExport = (format) => {
    alert(`Exporting as ${format}...`);
    // Implement export functionality
  };

  const calculateSavings = () => {
    if (!list?.savings) return 0;
    return list.savings.reduce((sum, saving) => sum + saving.amount, 0);
  };

  const calculateOriginalTotal = () => {
    if (!list) return 0;
    return list.totalAmount + calculateSavings();
  };

  const groupItemsByCategory = () => {
    if (!list?.items) return {};
    return list.items.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading shopping list...</p>
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <XCircle size={48} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Shopping List Not Found</h1>
        <p className="text-gray-400 mb-8">
          The shopping list you're looking for doesn't exist or has been
          removed.
        </p>
        <Button
          variant="primary"
          className="flex items-center gap-2 mx-auto"
          onClick={handleBack}
        >
          <ArrowLeft size={18} />
          Back to Shopping Lists
        </Button>
      </div>
    );
  }

  const groupedItems = groupItemsByCategory();
  const totalSavings = calculateSavings();
  const originalTotal = calculateOriginalTotal();
  const savingsPercentage =
    originalTotal > 0 ? ((totalSavings / originalTotal) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={handleBack}
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{list.storeName}</h1>
            <p className="text-gray-400">
              Shopping list details and items purchased
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => handleExport("PDF")}
          >
            <Download size={18} />
            Export
          </Button>
        
          <Button
            variant="danger"
            className="flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Store size={24} className="text-primary-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Store</p>
              <p className="text-xl font-bold">{list.storeName}</p>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Calendar size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date</p>
              <p className="text-xl font-bold">
                {new Date(list.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Package size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Items</p>
              <p className="text-xl font-bold">{list.totalItems}</p>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <DollarSign size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-xl font-bold">
                ${list.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Purchased Items</h2>
              <div className="text-sm text-gray-500">
                {list.items.filter((item) => item.purchased).length} of{" "}
                {list.items.length} purchased
              </div>
            </div>

            {/* Items by Category */}
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-dark-400">
                  {category} ({categoryItems.length})
                </h3>
                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-dark-300 hover:bg-dark-200 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.purchased
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.purchased ? (
                            <CheckCircle size={16} />
                          ) : (
                            <ShoppingBag size={16} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-right">
                          <div className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} per {item.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-8 pt-6 border-t border-primary-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">Total</h4>
                  <p className="text-sm text-gray-500">Including all items</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    ${list.totalAmount.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-500">
                    ${(list.totalAmount / list.totalItems).toFixed(2)} per item
                    average
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Transaction Details */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Transaction Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-semibold flex items-center gap-2">
                  <CreditCard size={16} />
                  {list.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Receipt Number:</span>
                <span className="font-semibold">{list.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    list.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : list.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {list.status.charAt(0).toUpperCase() + list.status.slice(1)}
                </span>
              </div>
              {list.notes && (
                <div className="pt-4 border-t border-dark-400">
                  <p className="text-gray-500 mb-2">Notes:</p>
                  <p className="text-sm bg-dark-400/50 rounded-lg p-3">
                    {list.notes}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Savings */}
          {list.savings && list.savings.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Savings</h3>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingDown size={20} />
                  <span className="text-2xl font-bold">
                    ${totalSavings.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {list.savings.map((saving, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg"
                  >
                    <span>{saving.description}</span>
                    <span className="font-semibold text-green-400">
                      -${saving.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-dark-400">
                <div className="flex justify-between">
                  <span>Original Total:</span>
                  <span className="line-through text-gray-500">
                    ${originalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Final Total:</span>
                  <span className="text-xl font-bold">
                    ${list.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="text-center mt-4 p-3 bg-green-500/10 rounded-lg">
                  <p className="text-green-400 font-semibold">
                    You saved {savingsPercentage}% on this trip!
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleExport("PDF")}
              >
                <Download size={18} />
                Download Receipt
              </Button>
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.print()}
              >
                <Printer size={18} />
                Print List
              </Button>
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => alert("Share functionality to be implemented")}
              >
                <Share2 size={18} />
                Share List
              </Button>
            </div>
          </Card>

          {/* Similar Lists */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Similar Trips</h3>
            <div className="space-y-4">
              {[1, 2].map((trip) => (
                <div
                  key={trip}
                  className="flex items-center justify-between p-3 bg-dark-400/50 rounded-lg hover:bg-dark-300 cursor-pointer"
                >
                  <div>
                    <div className="font-semibold">Whole Foods</div>
                    <div className="text-sm text-gray-500">Feb 8, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$68.90</div>
                    <div className="text-sm text-gray-500">9 items</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
