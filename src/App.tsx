import { Route, Switch } from 'wouter';
import NotFoundPage from './pages/404';
import DashboardPage from './pages/dashboard';
import { LoginPage } from './pages/login';
import { OnboardingPage } from './pages/onboarding';
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
      <Route path="/">
        <DashboardPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
