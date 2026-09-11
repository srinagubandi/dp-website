import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Compare from "./pages/Compare";
import About from "@/pages/About";
import Calculator from "@/pages/Calculator";
import Results from "@/pages/Results";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import PresenterApp from "./pages/presenter/PresenterApp";
import V2Home from "./v2/pages/V2Home";
import V2Services from "./v2/pages/V2Services";
import V2HowItWorks from "./v2/pages/V2HowItWorks";
import V2Compare from "./v2/pages/V2Compare";
import V2About from "./v2/pages/V2About";
import V2Calculator from "./v2/pages/V2Calculator";
import V2Contact from "./v2/pages/V2Contact";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/v2" component={V2Home} />
      <Route path="/v2/services" component={V2Services} />
      <Route path="/v2/how-it-works" component={V2HowItWorks} />
      <Route path="/v2/compare" component={V2Compare} />
      <Route path="/v2/about" component={V2About} />
      <Route path="/v2/calculator" component={V2Calculator} />
      <Route path="/v2/contact" component={V2Contact} />
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/compare"} component={Compare} />
      <Route path="/about" component={About} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/results" component={Results} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path={"/presenter"} component={PresenterApp} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
