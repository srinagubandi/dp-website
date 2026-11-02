import { Redirect, Route, Switch } from "wouter";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import {
  About,
  Contact,
  FAQ,
  Home,
  HowItWorks,
  Legal,
  NotFound,
  Results,
  Services,
  Specialties,
  Team,
  RakeshMittapellyProfile,
  MikeTomasielloProfile,
  SriNagubandiProfile,
  SeifeldinSalahProfile,
  RishiPatilProfile,
} from "./Pages";
import { GrowthBriefModalProvider } from "./GrowthBriefModal";

export default function App() {
  return (
    <GrowthBriefModalProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/specialties" component={Specialties} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/results" component={Results} />
        <Route path="/about" component={About} />
        <Route
          path="/team/rakesh-mittapelly"
          component={RakeshMittapellyProfile}
        />
        <Route path="/team/mike-tomasiello" component={MikeTomasielloProfile} />
        <Route path="/team/sri-nagubandi" component={SriNagubandiProfile} />
        <Route path="/team/seifeldin-salah" component={SeifeldinSalahProfile} />
        <Route path="/team/rishi-patil" component={RishiPatilProfile} />
        <Route path="/team" component={Team} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy">{() => <Legal kind="privacy" />}</Route>
        <Route path="/terms">{() => <Legal kind="terms" />}</Route>
        <Route path="/accessibility">
          {() => <Legal kind="accessibility" />}
        </Route>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route path="/calculator">{() => <Redirect to="/contact" />}</Route>
        <Route path="/compare">{() => <Redirect to="/how-it-works" />}</Route>
        <Route component={NotFound} />
      </Switch>
    </GrowthBriefModalProvider>
  );
}
