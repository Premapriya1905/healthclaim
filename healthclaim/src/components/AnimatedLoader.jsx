import React, { useState, useEffect } from "react"
import { MessageCircle, Heart, Folder, Users, Mail, FileText, BarChart3, User, Activity } from "lucide-react"
import { motion } from "framer-motion"

const AnimatedLoader = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2000) // Reduced from 4000ms to 2000ms
    return () => clearInterval(interval)
  }, [])

  const leftIcons = [
    { Icon: MessageCircle, color: "text-green-500", y: -120, delay: 0 },
    { Icon: Heart, color: "text-red-500", y: -70, delay: 0.1 },
    { Icon: Folder, color: "text-yellow-500", y: -20, delay: 0.2 },
    { Icon: Users, color: "text-purple-500", y: 30, delay: 0.3 },
    { Icon: Activity, color: "text-pink-500", y: 80, delay: 0.4 },
    { Icon: Mail, color: "text-blue-500", y: 130, delay: 0.5 },
  ]

  // Path generator for curved arrows
  const generatePath = (startX, startY, endX, endY) => {
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    const controlX = midX - 20
    const controlY = midY

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden">
      {/* Background animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5, // Reduced from 3s
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 1, // Reduced from 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-7xl h-screen flex items-center justify-center">
        {/* Left side vertical icons with moving arrows - CENTER ALIGNED */}
<div className="absolute left-[8%] top-1/2 transform -translate-y-1/2">
  <div className="relative w-40 h-[500px]"> {/* Adjusted height */}
    {leftIcons.map(({ Icon, color, y, delay }, index) => (
      <motion.div
        key={index}
        className="absolute left-0"
        style={{
          top: `${200 + (index * 60) - (leftIcons.length * 30)}px`, // Perfectly centered calculation
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, duration: 0.3 }}
      >
        <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm ${color}`}>
          <Icon size={24} />
        </div>
      </motion.div>
    ))}

    {/* Lines from each icon to center circle */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
      {leftIcons.map((icon, index) => {
        const startX = 40
        const startY = 200 + (index * 60) - (leftIcons.length * 30) + 24 // Matches icon position
        const endX = 380 // Touches circle border
        const endY = 200 // Center Y position
        
        return (
          <motion.g key={`line-${index}`}>
            <path
              d={`M ${startX} ${startY} L ${endX} ${endY}`}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              fill="none"
            />
            
            {/* Moving ">" icon */}
            <motion.g
              initial={{ x: startX, y: startY, opacity: 0 }}
              animate={{
                x: [startX, endX],
                y: [startY, endY],
                opacity: [0, 1, 0.5, 0]
              }}
              transition={{
                duration: 0.6,
                delay: icon.delay * 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: leftIcons.length * 0.15
              }}
            >
              <text 
                x="0" 
                y="5" 
                fill="white" 
                fontSize="18" 
                fontWeight="bold"
                className="drop-shadow-md"
              >
                &gt;
              </text>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  </div>
</div>

        {/* Center circle - moved closer to left icons */}
<div className="absolute left-[36.5%] top-[42%] transform -translate-y-1/2"> 
  <motion.div
    className="relative flex-shrink-0"
    animate={{
      scale: currentStep >= 2 ? 1.02 : 1,
    }}
    transition={{ duration: 0.3 }}
  >
    <svg className="w-80 h-80" viewBox="0 0 320 320">
      <motion.circle
        cx="160"
        cy="160"
        r="140"
        fill="none"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="2"
        strokeDasharray="4,4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: currentStep >= 1 ? 1 : 0,
          opacity: currentStep >= 1 ? 1 : 0,
          stroke: currentStep >= 2 ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)",
        }}
        transition={{
          pathLength: { duration: 1, delay: 1, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 1 },
          stroke: { duration: 0.3 },
        }}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "160px 160px",
        }}
      />
    </svg>

            {/* Rotating arrow ON the circle border */}
            {currentStep >= 2 && (
              <motion.div
                className="absolute inset-0 w-80 h-80"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1, // Reduced from 2s
                  ease: "easeInOut",
                  delay: 0.3, // Reduced from 0.5s
                }}
              >
                <div className="relative w-full h-full">
                  <div
                    className="absolute"
                    style={{
                      top: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        d="M8 1 L12 5 L8 9 L8 5 L8 1 Z"
                        fill="rgba(255, 255, 255, 0.9)"
                        stroke="rgba(255, 255, 255, 0.9)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Main content circle */}
            <div className="absolute inset-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center">
              <div className="text-center space-y-3">
                {/* Animated person icon */}
                <motion.div
                  className="relative"
                  animate={{
                    y: currentStep >= 2 ? [-2, 2, -2] : 0,
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }} // Reduced from 2s
                >
                  <User size={40} className="text-blue-400 mx-auto" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }} // Reduced from 1s
                  />
                </motion.div>

                {/* Document stack */}
                <div className="relative mx-auto w-12 h-10">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/20 backdrop-blur-sm rounded shadow-lg"
                      style={{
                        width: "100%",
                        height: "70%",
                        top: `${i * 2}px`,
                        left: `${i * 1.5}px`,
                        transform: `rotate(${i * 2}deg)`,
                      }}
                      animate={{
                        y: currentStep >= 2 ? [0, -3, 0] : 0,
                      }}
                      transition={{
                        duration: 1, // Reduced from 2s
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1, // Reduced from 0.2
                      }}
                    >
                      <FileText size={10} className="text-blue-300 m-1" />
                    </motion.div>
                  ))}
                </div>

                {/* Report labels */}
                <div className="space-y-1">
                  <motion.div
                    className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-200"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }} // Reduced from 2s
                  >
                    Diagnostic Reports
                  </motion.div>
                  <motion.div
                    className="px-2 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs text-purple-200"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }} // Reduced
                  >
                    Health Reports
                  </motion.div>
                </div>

                {/* Loading text */}
                <div className="text-white/80 font-medium text-xs">Processing Data...</div>

                {/* Progress dots */}
                <div className="flex justify-center space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.8, // Reduced from 1.5s
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1, // Reduced from 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side phone mockup */}
        <div className="absolute right-15 bottom-[3%] transform -translate-y-1/2">
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: currentStep >= 3 ? 1.02 : 1,
            }}
            transition={{
              opacity: { delay: 0.8, duration: 0.5 }, // Reduced delays
              x: { delay: 0.8, duration: 0.5 }, // Reduced delays
              scale: { duration: 0.2 }, // Reduced from 0.3s
            }}
          >
            <div className="w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-700">
              <div className="w-full h-full bg-white rounded-2xl p-4 overflow-hidden">
                {/* Phone screen content */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-semibold text-gray-800">DataSync</div>
                    <div className="text-xs text-gray-500">09:41</div>
                  </div>

                  {/* Mock content */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + i * 0.05, duration: 0.2 }} // Reduced delays
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <BarChart3 size={12} className="text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Arrow from center to right */}
        {/* Updated arrow from center to right - matches left icons style */}
<svg
  className="absolute left-[60%] bottom-[55%] w-[250px] h-4 pointer-events-none"
  style={{ transform: "translate(2px, -8px)" }}
>
  {/* Static thin line */}
  <path
    d="M 0 8 L 400 8"
    stroke="rgba(255, 255, 255, 0.3)"
    strokeWidth="1"
    fill="none"
  />
  
  {/* Moving ">" icon */}
  <motion.g
    initial={{ x: 0, opacity: 0 }}
    animate={{
      x: [0, 400],
      opacity: [0, 1, 0.5, 0]
    }}
    transition={{
      duration: 0.8,
      delay: leftIcons.length * 0.15, // Starts after left icons animations
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1
    }}
  >
    <text 
      x="0" 
      y="10" 
      fill="white" 
      fontSize="18" 
      fontWeight="bold"
      className="drop-shadow-md"
    >
      &gt;
    </text>
  </motion.g>
</svg>
      </div>
    </div>
  )
}

export default AnimatedLoader