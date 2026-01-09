import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface PresenterLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (index: number) => void;
  slides: { title: string; id: string }[];
}

export default function PresenterLayout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onJump,
  slides
}: PresenterLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden touch-none select-none">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center gap-2">
           <img src="/images/logo.png" alt="DocPropel" className="h-8 w-auto" />
           <span className="ml-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-l border-border pl-2">
             Presenter Mode
           </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full h-full pt-16 relative">
        {children}
      </div>

      {/* Navigation Controls (Touch Friendly) */}
      <div className="absolute bottom-6 right-6 z-40 flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg bg-background/90 backdrop-blur"
          onClick={onPrev}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="default" 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg bg-primary text-white"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold">Presentation Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4 max-w-md mx-auto">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onJump(index);
                      setMenuOpen(false);
                    }}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      currentSlide === index 
                        ? "bg-primary/10 border-primary text-primary font-bold" 
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm text-muted-foreground mr-2">0{index + 1}</span>
                    {slide.title}
                  </button>
                ))}
                
                <div className="mt-8 pt-8 border-t border-border">
                  <Link href="/">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Home className="h-4 w-4" /> Exit to Website
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
