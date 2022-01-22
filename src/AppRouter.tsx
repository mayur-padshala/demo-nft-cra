import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Splash from 'pages/Splash';
import GetStarted from 'pages/GetStarted';
import Verification from 'pages/Verification';
import CreateNearAccount from 'pages/CreateNearAccount';
import SetAPassword from 'pages/SetAPassword';
import Dashboard from 'pages/UserHome/Dashboard';
import UserHome from 'pages/UserHome';
import ExperienceDetails from 'pages/UserHome/ExperienceDetails';
import CategoryDetails from 'pages/UserHome/CategoryDetails';
import Settings from 'pages/UserHome/Settings';
import Notifications from 'pages/UserHome/Notifications';
import CategoryList from 'pages/UserHome/CategoryList';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/create-account" element={<CreateNearAccount />} />
        <Route path="/set-password" element={<SetAPassword />} />

        <Route path="/user" element={<UserHome />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="experience/:slug" element={<ExperienceDetails />} />
          <Route path="category/all" element={<CategoryList />} />
          <Route path="category/:slug" element={<CategoryDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
