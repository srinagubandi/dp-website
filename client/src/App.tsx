import { Redirect, Route, Switch } from "wouter";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import { About, Contact, Home, HowItWorks, Legal, NotFound, Results, Services, Specialties, Team } from "./Pages";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services" component={Services} />
    <Route path="/specialties" component={Specialties} />
    <Route path="/how-it-works" component={HowItWorks} />
    <Route path="/results" component={Results} />
    <Route path="/about" component={About} />
    <Route path="/team" component={Team} />
    <Route path="/contact" component={Contact} />
    <Route path="/privacy">{() => <Legal kind="privacy" />}</Route>
    <Route path="/terms">{() => <Legal kind="terms" />}</Route>
    <Route path="/admin/login" component={AdminLogin} />
    <Route path="/admin" component={Admin} />
    <Route path="/calculator">{() => <Redirect to="/contact" />}</Route>
    <Route path="/compare">{() => <Redirect to="/how-it-works" />}</Route>
    <Route component={NotFound} />
  </Switch>;
}
