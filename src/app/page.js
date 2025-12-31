import Card from "./components/Card";
import Button from "./components/Button";
import {
  ChefHat,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ShoppingBag,
  BarChart,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Items in Inventory",
      value: "42",
      icon: <ShoppingBag size={24} />,
      change: "+5 this week",
      color: "text-primary-400",
    },
    {
      label: "Active Recipes",
      value: "18",
      icon: <ChefHat size={24} />,
      change: "3 cooking now",
      color: "text-green-400",
    },
    {
      label: "Weekly Savings",
      value: "$45.50",
      icon: <DollarSign size={24} />,
      change: "+12% from last week",
      color: "text-yellow-400",
    },
    {
      label: "Time Saved",
      value: "8.5h",
      icon: <Clock size={24} />,
      change: "This week",
      color: "text-blue-400",
    },
  ];

  const recentActivities = [
    { action: "Added tomatoes to inventory", time: "2 hours ago", icon: "➕" },
    {
      action: "Generated meal plan for tomorrow",
      time: "Yesterday",
      icon: "📋",
    },
    { action: "Used AI cooking assistant", time: "2 days ago", icon: "🤖" },
    {
      action: "Expiry alert: Milk expires soon",
      time: "3 days ago",
      icon: "⚠️",
    },
  ];

  const quickActions = [
    {
      title: "Plan Weekly Meals",
      icon: <Calendar />,
      href: "/auto-generate-weekly",
      color: "bg-primary-500/20",
    },
    {
      title: "View Weekly Meals",
      icon: <Calendar />,
      href: "/weakly-meals",
      color: "bg-primary-500/20",
    },
    {
      title: "Generate Shopping List",
      icon: <CheckCircle />,
      href: "/generate-shopping-list",
      color: "bg-green-500/20",
    },
    {
      title: "View Shopping List",
      icon: <CheckCircle />,
      href: "/view-shopping-list",
      color: "bg-green-500/20",
    },
    {
      title: "Cooking Mode",
      icon: <ChefHat />,
      href: "/cooking-mode",
      color: "bg-purple-500/20",
    },
    {
      title: "Monthly Expense Report",
      icon: <ChefHat />,
      href: "/monthly-expense",
      color: "bg-purple-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome back,{" "}
          <span className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Chef!
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Your kitchen is ready with 42 items. Let's create something delicious
          today!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 rounded-full bg-dark-300">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BarChart className="mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`${action.color} border border-primary-500/20 rounded-xl p-6 card-hover flex flex-col items-center justify-center text-center space-y-3`}
            >
              <div className="p-3 rounded-full bg-dark-500/50">
                {action.icon}
              </div>
              <h3 className="font-semibold">{action.title}</h3>
              <Button variant="ghost" className="px-4! py-2! text-sm">
                Go →
              </Button>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activities & Expiry Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="mr-2" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-300/50 transition-colors"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Expiry Alerts */}
        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-400" />
            Expiry Alerts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">🚨 Milk (2 days)</p>
                  <p className="text-sm text-gray-400">
                    Expires in 2 days - Use soon!
                  </p>
                </div>
                <Button variant="outline" className="px-4! py-1! text-sm">
                  Find Recipes
                </Button>
              </div>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">⚠️ Eggs (5 days)</p>
                  <p className="text-sm text-gray-400">Expires in 5 days</p>
                </div>
                <Button variant="outline" className="px-4! py-1! text-sm">
                  View
                </Button>
              </div>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">⏰ Bread (Today)</p>
                  <p className="text-sm text-gray-400">
                    Expires today - Use immediately!
                  </p>
                </div>
                <Button variant="primary" className="px-4! py-1! text-sm">
                  Quick Recipes
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recipe of the Day */}
      <Card>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4">🍳 Recipe of the Day</h2>
            <h3 className="text-xl font-semibold text-primary-400 mb-2">
              Creamy Mushroom Pasta
            </h3>
            <p className="text-gray-400 mb-4">
              Perfect for using your mushrooms and cream that expire soon. Ready
              in 25 minutes.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-primary-500/20 rounded-full text-sm">
                ⭐ 4.8/5
              </span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                ⏱️ 25 mins
              </span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm">
                🥗 4 servings
              </span>
            </div>
            <div className="flex gap-4">
              <Button variant="primary">Start Cooking</Button>
              <Button variant="secondary">Save for Later</Button>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:w-1/3">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-linear-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                <ChefHat size={64} className="text-primary-400/50" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
