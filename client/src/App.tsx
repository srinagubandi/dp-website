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
import V4Home from "./v4/pages/V4Home";
import V4Services from "./v4/pages/V4Services";
import V4HowItWorks from "./v4/pages/V4HowItWorks";
import V4Compare from "./v4/pages/V4Compare";
import V4Results from "./v4/pages/V4Results";
import V4About from "./v4/pages/V4About";
import V4Calculator from "./v4/pages/V4Calculator";
import V4Contact from "./v4/pages/V4Contact";

function Router() {
  return (
    <Switch>
      <Route path="/v4" component={V4Home} />
      <Route path="/v4/services" component={V4Services} />
      <Route path="/v4/how-it-works" component={V4HowItWorks} />
      <Route path="/v4/compare" component={V4Compare} />
      <Route path="/v4/results" component={V4Results} />
      <Route path="/v4/about" component={V4About} />
      <Route path="/v4/calculator" component={V4Calculator} />
      <Route path="/v4/contact" component={V4Contact} />
      <Route path="/v2" component={V2Home} />
      <Route path="/v2/services" component={V2Services} />
      <Route path="/v2/how-it-works" component={V2HowItWorks} />
      <Route path="/v2/compare" component={V2Compare} />
      <Route path="/v2/about" component={V2About} />
      <Route path="/v2/calculator" component={V2Calculator} />
      <Route path="/v2/contact" component={V2Contact} />
      <Route path="/v2/results" component={V2Results} />
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/compare" component={Compare} />
      <Route path="/about" component={About} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/results" component={Results} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path="/presenter" component={PresenterApp} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
