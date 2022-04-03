import { Route, Switch } from 'wouter';
import { DashboardLayout } from './components/layouts/dashboard';
import { OnboardingPage } from './pages/onboarding';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/sign-up';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/onboarding">
        <OnboardingPage />
      </Route>
      <Route>
        <DashboardLayout />
      </Route>
    </Switch>
  );
}

export default App;
