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
import V2Results from "./v2/pages/V2Results";
import V5Home from "./v5/V5Home";
import {
  V5About,
  V5CalculatorPage,
  V5Compare,
  V5Contact,
  V5HowItWorks,
  V5Results,
  V5Services,
} from "./v5/V5Pages";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/v5" component={V5Home} />
      <Route path="/v5/services" component={V5Services} />
      <Route path="/v5/how-it-works" component={V5HowItWorks} />
      <Route path="/v5/compare" component={V5Compare} />
      <Route path="/v5/results" component={V5Results} />
      <Route path="/v5/about" component={V5About} />
      <Route path="/v5/calculator" component={V5CalculatorPage} />
      <Route path="/v5/contact" component={V5Contact} />
      <Route path="/v2" component={V2Home} />
      <Route path="/v2/services" component={V2Services} />
      <Route path="/v2/how-it-works" component={V2HowItWorks} />
      <Route path="/v2/compare" component={V2Compare} />
      <Route path="/v2/about" component={V2About} />
      <Route path="/v2/calculator" component={V2Calculator} />
      <Route path="/v2/contact" component={V2Contact} />
      <Route path="/v2/results" component={V2Results} />
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
