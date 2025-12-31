"use client";

import Link from "next/link";
import {
  ChefHat,
  Heart,
  Github,
  Twitter,
  Instagram,
  Mail,
  Coffee,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" },
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Recipes", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Community", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
   
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Mail size={20} />, href: "#", label: "Email" },
  ];

  return (
    <footer className="w-full mt-auto overflow-hidden">
      {/* Top Border */}
      <div className="h-px bg-linear-to-r from-transparent via-primary-500 to-transparent" />

      {/* Main Footer */}
      <div className="bg-dark-400 border-t border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                  <ChefHat size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    RecipeAI
                  </h2>
                  <p className="text-sm text-gray-400">
                    Your smart kitchen companion
                  </p>
                </div>
              </div>

              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing home cooking with AI-powered meal planning,
                smart inventory management, and personalized recipe suggestions.
                Making every meal delicious and efficient.
              </p>

              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Stay Updated</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-dark-300 border border-primary-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                  />
                  <button className="w-full sm:w-auto bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-lg mb-4 text-white">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
              <span>© {currentYear} RecipeAI</span>
              <span className="text-primary-500">•</span>
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>by food lovers</span>
              <span className="text-primary-500">•</span>
              <Coffee size={16} className="text-yellow-500" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}

              <button className="px-4 py-2 bg-dark-300 hover:bg-dark-200 border border-primary-500/20 rounded-lg text-sm">
                📱 iOS App
              </button>
              <button className="px-4 py-2 bg-dark-300 hover:bg-dark-200 border border-primary-500/20 rounded-lg text-sm">
                🤖 Android
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["10K+", "Recipes", "text-primary-400"],
              ["50K+", "Users", "text-green-400"],
              ["95%", "Satisfaction", "text-blue-400"],
              ["45%", "Waste Reduced", "text-yellow-400"],
            ].map(([value, label, color]) => (
              <div
                key={label}
                className="text-center p-4 bg-dark-300/50 rounded-lg"
              >
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-dark-500 border-t border-primary-500/20 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
              <div className="text-center md:text-left">
                All recipes are AI-generated and verified by chefs • Beta v1.2.0
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="#" className="hover:text-primary-400">
                  Terms
                </Link>
                <Link href="#" className="hover:text-primary-400">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-primary-400">
                  Cookies
                </Link>
                <Link href="#" className="hover:text-primary-400">
                  GDPR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
