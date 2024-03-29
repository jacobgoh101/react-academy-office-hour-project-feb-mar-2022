import { Route, Switch } from 'wouter';
import NotFoundPage from './pages/404';
import ClientPage from './pages/client';
import ClientsPage from './pages/clients';
import DashboardPage from './pages/dashboard';
import EditClientPage from './pages/edit-client';
import EditInvoicePage from './pages/edit-invoice';
import InvoicePage from './pages/invoice';
import InvoicesPage from './pages/invoices';
import { LoginPage } from './pages/login';
import NewClientPage from './pages/new-client';
import NewInvoicePage from './pages/new-invoice';
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
      <Route path="/clients">
        <ClientsPage />
      </Route>
      <Route path="/clients/new">
        <NewClientPage />
      </Route>
      <Route path="/clients/:id/edit">
        {({ id }) => <EditClientPage id={id} />}
      </Route>
      <Route path="/clients/:id">{({ id }) => <ClientPage id={id} />}</Route>
      <Route path="/invoices">
        <InvoicesPage />
      </Route>
      <Route path="/invoices/new">
        <NewInvoicePage />
      </Route>
      <Route path="/clients/:clientId/invoices/new">
        {({ clientId }) => <NewInvoicePage clientId={clientId} />}
      </Route>
      <Route path="/invoices/:id/edit">
        {({ id }) => <EditInvoicePage id={id} />}
      </Route>
      <Route path="/invoices/:id">{({ id }) => <InvoicePage id={id} />}</Route>
      <Route path="/invoices/:id/print">
        {({ id }) => <InvoicePage id={id} print />}
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
