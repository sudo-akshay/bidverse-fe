import React, { useState } from 'react';
import styled from 'styled-components';
import AuctionUI from './AuctionUI';
import LoginPage from './LoginPage';
import SCLLogo from './black.png'; // Path to your background image

const AppContainer = styled.div`
  min-height: 100vh;
  background: url(${SCLLogo}) no-repeat center center fixed;
  background-size: cover;
  font-family: 'Arial', sans-serif;
  color: white;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Handle login data and pass the whole user object
  const handleLogin = (userData) => {
    // Update the user state with all user data, including teamId
    setUser({
      username: userData.name,
      totalPurse: userData.totalPurse,
      availablePurse: userData.availablePurse,
      playersBought: userData.playersBought,
      teamId: userData.id, // Capture teamId from login response
    });
    setIsLoggedIn(true);
  };

  return (
    <AppContainer>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} bgImage={SCLLogo} />
      ) : (
        <AuctionUI user={user} teamId={user.teamId} /> // Pass user object and teamId to AuctionUI
      )}
    </AppContainer>
  );
};

export default App;
