"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import {
  ChefHat,
  Timer,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Camera,
  MessageCircle,
} from "lucide-react";

export default function CookingMode() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to cooking mode! I'll guide you through each step. Ready to start?",
      sender: "bot",
    },
    {
      id: 2,
      text: "Let's begin! First, gather all your ingredients.",
      sender: "bot",
    },
  ]);

  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  const recipeSteps = [
    {
      id: 1,
      title: "Prepare Ingredients",
      description: "Chop 2 onions, 3 garlic cloves, and slice 200g mushrooms",
      time: 5, // minutes
      tips: [
        "Use a sharp knife for safety",
        "Keep pieces uniform for even cooking",
      ],
    },
    {
      id: 2,
      title: "Sauté Vegetables",
      description: "Heat oil in pan and sauté onions until translucent",
      time: 8,
      tips: ["Medium heat works best", "Stir frequently to prevent burning"],
    },
    {
      id: 3,
      title: "Add Main Ingredients",
      description: "Add mushrooms and garlic, cook for 5 minutes",
      time: 5,
      tips: ["Don't overcrowd the pan", "Season with salt and pepper"],
    },
    {
      id: 4,
      title: "Simmer Sauce",
      description: "Add cream and herbs, simmer for 10 minutes",
      time: 10,
      tips: ["Low heat prevents curdling", "Taste and adjust seasoning"],
    },
    {
      id: 5,
      title: "Final Touches",
      description: "Add pasta, mix well, and serve hot",
      time: 2,
      tips: [
        "Garnish with fresh parsley",
        "Serve immediately for best texture",
      ],
    },
  ];

  // Timer logic
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: chatInput,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setChatInput("");

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Great question! For that, I recommend...",
        "Based on your current step, here's what you should do...",
        "That's a common concern. Here's my advice...",
        "Perfect timing! Here are some tips for that...",
      ];
      const botResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const quickQuestions = [
    "How do I know when it's done?",
    "Can I substitute cream?",
    "Why is my sauce lumpy?",
    "How to store leftovers?",
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Cooking Mode</h1>
        <p className="text-gray-400">Follow along with step-by-step guidance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recipe Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Step Card */}
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                    Step {currentStep + 1} of {recipeSteps.length}
                  </div>
                  <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {recipeSteps[currentStep].time} min
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {recipeSteps[currentStep].title}
                </h2>
                <p className="text-gray-300">
                  {recipeSteps[currentStep].description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                >
                  <SkipBack size={20} />
                </Button>
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() =>
                    setCurrentStep(
                      Math.min(recipeSteps.length - 1, currentStep + 1)
                    )
                  }
                >
                  <SkipForward size={20} />
                </Button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="border-t border-primary-500/20 pt-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <ChefHat size={16} className="mr-2" />
                Pro Tips for This Step
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipeSteps[currentStep].tips.map((tip, idx) => (
                  <div key={idx} className="bg-dark-300 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                        <span className="text-xs">💡</span>
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 pt-6 border-t border-primary-500/20">
              <Button variant="primary" className="flex-1">
                Mark as Complete
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Camera />
                Capture
              </Button>
            </div>
          </Card>

          {/* Steps Progress */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Recipe Steps</h3>
            <div className="space-y-4">
              {recipeSteps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    idx === currentStep
                      ? "bg-primary-500/20 border-2 border-primary-500/30"
                      : "bg-dark-300/50 hover:bg-dark-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          idx < currentStep
                            ? "bg-green-500/20 text-green-400"
                            : idx === currentStep
                            ? "bg-primary-500 text-white"
                            : "bg-dark-200 text-gray-500"
                        }`}
                      >
                        {idx < currentStep ? "✓" : idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-500">
                          {step.time} minutes
                        </p>
                      </div>
                    </div>
                    {idx === currentStep && (
                      <div className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                        Current
                      </div>
                    )}
                  </div>
                  {idx === currentStep && (
                    <p className="mt-3 text-gray-300 pl-12">
                      {step.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Timer & Chat */}
        <div className="space-y-6">
          {/* Timer */}
          <Card>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                {/* Timer circle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * timeRemaining) / 300}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-sm text-gray-500">Time Remaining</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={isTimerRunning ? "secondary" : "primary"}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex items-center gap-2"
                >
                  {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                  {isTimerRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTimeRemaining(300)}
                  className="flex items-center gap-2"
                >
                  <Timer size={20} />
                  Reset
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-500/20">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Volume2 size={16} className="mr-2" />
                  Voice Commands
                </h4>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-dark-300 hover:bg-dark-200 rounded-lg transition-colors text-left">
                    "Next step"
                  </button>
                  <button className="w-full p-3 bg-dark-300 hover:bg-dark-200 rounded-lg transition-colors text-left">
                    "Start timer for 5 minutes"
                  </button>
                  <button className="w-full p-3 bg-dark-300 hover:bg-dark-200 rounded-lg transition-colors text-left">
                    "What's next?"
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Chat */}
          <Card>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MessageCircle className="mr-2" />
              Quick Assistance
            </h3>

            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.sender === "user"
                        ? "bg-primary-500/20 border border-primary-500/30 rounded-br-none"
                        : "bg-dark-300 border border-primary-500/20 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChatInput(q)}
                    className="text-xs bg-dark-300 hover:bg-primary-500/20 border border-primary-500/20 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask for help..."
                className="input-field flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                variant="primary"
                className="p-3 px-4!"
                disabled={!chatInput.trim()}
              >
                Send
              </Button>
            </div>
          </Card>

          {/* Emergency Help */}
          <Card>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h4 className="font-bold mb-2">Emergency Help</h4>
              <p className="text-sm text-gray-400 mb-4">
                Need immediate assistance?
              </p>
              <Button variant="secondary" className="w-full">
                Call for Help
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
