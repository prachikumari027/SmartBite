"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  CheckCheck,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function AlertExpiry() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // all, unread, read

  // Mock notifications data
  const initialNotifications = [
    {
      id: 1,
      title: "Milk Expiring Soon",
      message: "Milk will expire in 2 days",
      time: "2 hours ago",
      read: false,
      type: "expiry",
      priority: "high",
    },
    {
      id: 2,
      title: "Eggs Low Stock",
      message: "Only 2 eggs left in inventory",
      time: "5 hours ago",
      read: false,
      type: "low-stock",
      priority: "medium",
    },
    {
      id: 3,
      title: "Bread Expiring Today",
      message: "Bread expires today",
      time: "Yesterday",
      read: true,
      type: "expiry",
      priority: "high",
    },
    {
      id: 4,
      title: "Weekly Shopping Reminder",
      message: "Time to plan your weekly shopping",
      time: "2 days ago",
      read: true,
      type: "reminder",
      priority: "low",
    },
    {
      id: 5,
      title: "Chicken Expiring Tomorrow",
      message: "Chicken breasts expire tomorrow",
      time: "Just now",
      read: false,
      type: "expiry",
      priority: "high",
    },
    {
      id: 6,
      title: "Carrots Low Stock",
      message: "Only 3 carrots left",
      time: "1 day ago",
      read: false,
      type: "low-stock",
      priority: "medium",
    },
    {
      id: 7,
      title: "Monthly Expense Report",
      message: "View your monthly expense report",
      time: "3 days ago",
      read: true,
      type: "report",
      priority: "low",
    },
    {
      id: 8,
      title: "Yogurt Expiring Soon",
      message: "Greek yogurt expires in 3 days",
      time: "4 hours ago",
      read: false,
      type: "expiry",
      priority: "medium",
    },
  ];

  useEffect(() => {
    // In real app, fetch from API
    setNotifications(initialNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "expiry":
        return <AlertTriangle className="text-red-500" size={20} />;
      case "low-stock":
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case "reminder":
        return <Bell className="text-blue-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-blue-500";
      default:
        return "border-l-4 border-gray-500";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-pink-500/20">
            <Bell className="text-pink-400" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-400">Manage your alerts and reminders</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2"
          >
            <CheckCheck size={18} />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">
              {unreadCount}
            </div>
            <div className="text-gray-500">Unread Notifications</div>
          </div>
        </Card>

        <Card>
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">
              {
                notifications.filter((n) => n.type === "expiry" && !n.read)
                  .length
              }
            </div>
            <div className="text-gray-500">Expiry Alerts</div>
          </div>
        </Card>

        <Card>
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              {
                notifications.filter((n) => n.type === "low-stock" && !n.read)
                  .length
              }
            </div>
            <div className="text-gray-500">Low Stock Alerts</div>
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            filter === "all"
              ? "bg-primary-500 text-white"
              : "bg-dark-300 hover:bg-dark-200"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            filter === "unread"
              ? "bg-pink-500 text-white"
              : "bg-dark-300 hover:bg-dark-200"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            filter === "read"
              ? "bg-green-500 text-white"
              : "bg-dark-300 hover:bg-dark-200"
          }`}
        >
          Read ({notifications.length - unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <Card>
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${getPriorityColor(
                  notification.priority
                )} ${notification.read ? "bg-dark-300" : "bg-pink-500/10"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {notification.time}
                        </span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium
                 bg-pink-500/15 text-pink-400 border border-pink-500/30
                 rounded-lg hover:bg-pink-500/25 hover:border-pink-400
                 transition active:scale-95"
                            >
                              <CheckCircle size={14} />
                              Mark as Read
                            </button>
                          )}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium
               bg-red-500/15 text-red-400 border border-red-500/30
               rounded-lg hover:bg-red-500/25 hover:border-red-400
               transition active:scale-95"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-xl font-bold mb-6">Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-dark-300 rounded-lg">
            <h4 className="font-semibold mb-2">Expiry Alerts</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get notified when items are about to expire
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Alert 3 days before expiry</span>
            </div>
          </div>

          <div className="p-4 bg-dark-300 rounded-lg">
            <h4 className="font-semibold mb-2">Low Stock Alerts</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get notified when items are running low
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Alert when less than 3 items left</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
