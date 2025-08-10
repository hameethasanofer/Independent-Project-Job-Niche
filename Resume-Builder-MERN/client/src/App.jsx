import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { store, persistor } from './redux/store';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import ResumeLayout from './components/ResumeLayout';

import LandingPage from './pages/LandingPage';
import SignIn from './pages/Auth/SignIn';
import UserProfile from './pages/UserProfile';
import Templates from './pages/Templates';
import Resume from './pages/Resume';
import Success from "./pages/Success";
import Contact from './components/Contact';
import ErrorPage from './pages/ErrorPage';

import Profile from './components/Profile';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ExtraDetails from './components/ExtraDetails';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff8c00',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            {/* Page container with full height */}
            <div className="flex flex-col min-h-screen">
              {/* Navbar at top */}
              <Navbar />

              {/* Main content area grows to fill space */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route element={<Layout />}>
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/templates" element={<Templates />} />
                     <Route path="/plans" element={<Plans />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/success" element={<Success />} />


                    <Route element={<ResumeLayout />}>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/extraDetails" element={<ExtraDetails />} />
                    </Route>

                    <Route path="/resume/:template" element={<Resume />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </Routes>
              </main>

              {/* Footer at bottom */}
              <Footer />
            </div>

            {/* Toast notifications */}
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
