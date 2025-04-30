// src/App.jsx
import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import TaskManager from "./components/TaskManager";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (isLoggedIn) {
    return <TaskManager />;
  }

  return showSignup ? (
    <SignUp onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login
      onLoginSuccess={() => setIsLoggedIn(true)}
      onSwitchToSignup={() => setShowSignup(true)}
    />
  );
};

export default App;
