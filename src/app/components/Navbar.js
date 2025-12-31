"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  PlusSquare,
  Eye,
  ChefHat,
  CookingPot,
  User,
  Calendar,
  ShoppingCart,
  Clock,
  Bell,
  DollarSign,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  // Mock notifications
  const mockNotifications = [
    { id: 1, read: false },
    { id: 2, read: false },
    { id: 3, read: true },
    { id: 4, read: true },
    { id: 5, read: false },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/", icon: <Home size={20} /> },
    {
      name: "Update Inventory",
      href: "/update-inventory",
      icon: <PlusSquare size={20} />,
    },
    {
      name: "View Inventory",
      href: "/view-inventory",
      icon: <Eye size={20} />,
    },
    {
      name: "Generate Meal",
      href: "/generate-meal",
      icon: <ChefHat size={20} />,
    },
    {
      name: "Cooking Mode",
      href: "/cooking-mode",
      icon: <CookingPot size={20} />,
    },
    { name: "Profile", href: "/profile", icon: <User size={20} /> },
    {
      name: "Weekly Diet",
      href: "/auto-generate-weekly",
      icon: <Calendar size={20} />,
    },
    {
      name: "Shopping List",
      href: "/generate-shopping-list",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Recent Shopping",
      href: "/recent-shopping",
      icon: <Clock size={20} />,
    },
    { name: "Expiry Alerts", href: "/alert-expiry", icon: <Bell size={20} /> },
    {
      name: "Monthly Expense",
      href: "/monthly-expense",
      icon: <DollarSign size={20} />,
    },
  ];

  const handleBellClick = () => {
    router.push("/alert-expiry");
  };

  return (
    <nav className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              SmartBite
            </span>
          </Link>

          {/* Right Side (Bell + Nav) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Bell Icon */}
            <button
              onClick={handleBellClick}
              className="relative p-2 rounded-full hover:bg-pink-500/20 transition-colors group"
            >
              <Bell
                size={22}
                className={`${
                  unreadCount > 0 ? "text-pink-500" : "text-gray-400"
                } group-hover:text-pink-400`}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-1">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                      : "hover:bg-dark-300 hover:text-primary-300"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={handleBellClick}
              className="relative p-2 rounded-full hover:bg-pink-500/20"
            >
              <Bell
                size={22}
                className={unreadCount > 0 ? "text-pink-500" : "text-gray-400"}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-dark-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-effect border-t border-primary-500/20 animate-slide-up">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  pathname === item.href
                    ? "bg-primary-500/20 text-primary-400"
                    : "hover:bg-dark-300"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
