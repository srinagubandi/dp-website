import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PresenterLayout from "@/components/presenter/PresenterLayout";
import ROICalculator from "@/components/presenter/ROICalculator";
import ComparisonTool from "@/components/presenter/ComparisonTool";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

const slides = [
  { id: "intro", title: "Introduction" },
  { id: "problem", title: "The Problem" },
  { id: "solution", title: "The Solution" },
  { id: "comparison", title: "Comparison Tool" },
  { id: "roi", title: "ROI Calculator" },
  { id: "closing", title: "Next Steps" }
];

export default function PresenterApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(curr => curr - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <PresenterLayout
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onNext={nextSlide}
      onPrev={prevSlide}
      onJump={jumpToSlide}
      slides={slides}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full p-8 md:p-16 flex flex-col justify-center"
        >
          {/* Slide 1: Introduction */}
          {currentSlide === 0 && (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-block"
              >
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold uppercase tracking-wider text-sm">
                  Performance-Based Marketing
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
                Stop Paying for <span className="text-muted-foreground line-through decoration-secondary decoration-4">Promises</span>.
                <br />
                Start Paying for <span className="text-secondary">Patients</span>.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
                The only growth partner for healthcare practices that aligns incentives with your revenue.
              </p>
              <Button size="lg" onClick={nextSlide} className="bg-primary text-white text-lg px-8 h-14 rounded-full shadow-xl hover:scale-105 transition-transform">
                See How It Works <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Slide 2: The Problem */}
          {currentSlide === 1 && (
            <div className="max-w-5xl mx-auto w-full">
              <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why the Old Model is Broken</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "High Fixed Retainers", desc: "You pay thousands monthly regardless of results.", icon: "💸" },
                  { title: "Zero Accountability", desc: "Agencies focus on vanity metrics, not booked appointments.", icon: "📉" },
                  { title: "Long-Term Lock-ins", desc: "12-24 month contracts trap you in bad relationships.", icon: "🔒" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-border text-center">
                    <div className="text-6xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slide 3: The Solution */}
          {currentSlide === 2 && (
            <div className="max-w-5xl mx-auto w-full">
              <h2 className="text-4xl font-bold text-primary mb-12 text-center">The DocPropel Model</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Shared Risk", 
                    desc: "We invest upfront. We only win when you win.", 
                    icon: <ShieldCheck className="h-12 w-12 text-white" />,
                    bg: "bg-blue-500"
                  },
                  { 
                    title: "Total Transparency", 
                    desc: "Real-time dashboards showing actual patient bookings.", 
                    icon: <BarChart3 className="h-12 w-12 text-white" />,
                    bg: "bg-blue-600"
                  },
                  { 
                    title: "Aligned Incentives", 
                    desc: "Our revenue is tied directly to your patient growth.", 
                    icon: <Zap className="h-12 w-12 text-white" />,
                    bg: "bg-secondary"
                  }
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} p-8 rounded-2xl shadow-xl text-white text-center transform hover:-translate-y-2 transition-transform duration-300`}>
                    <div className="mb-6 flex justify-center">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-blue-50 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slide 4: Comparison Tool */}
          {currentSlide === 3 && (
            <div className="w-full h-full flex flex-col">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">Compare the Difference</h2>
              <div className="flex-1">
                <ComparisonTool />
              </div>
            </div>
          )}

          {/* Slide 5: ROI Calculator */}
          {currentSlide === 4 && (
            <div className="w-full h-full flex flex-col">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">Estimate Your Growth Potential</h2>
              <div className="flex-1">
                <ROICalculator />
              </div>
            </div>
          )}

          {/* Slide 6: Closing */}
          {currentSlide === 5 && (
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold text-primary mb-8">Ready to Grow?</h2>
              <p className="text-2xl text-muted-foreground mb-12">
                Let's start with a Practice Growth Brief to identify your biggest opportunities.
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border inline-block text-left">
                <h3 className="text-xl font-bold mb-4 text-foreground">Next Steps:</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-lg">
                    <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">1</div>
                    Audit current digital footprint
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">2</div>
                    Identify patient leakage points
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">3</div>
                    Launch performance pilot
                  </li>
                </ul>
                <Button className="w-full bg-primary text-white font-bold h-14 text-lg rounded-lg">
                  Schedule Kickoff Call
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PresenterLayout>
  );
}
