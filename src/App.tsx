import { Route, Switch } from 'wouter';
import { DashboardLayout } from './components/layouts/dashboard';
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
      <Route>
        <DashboardLayout />
      </Route>
    </Switch>
  );
}

export default App;
