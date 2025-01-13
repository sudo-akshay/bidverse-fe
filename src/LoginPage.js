import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { API_BASE_URL } from './constant';

// Background animations
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideUp = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url(${props => props.bgImage}) no-repeat center center fixed;
  background-size: cover;
  flex-direction: column;
  color: #fff;
  text-align: center;
  animation: ${fadeIn} 2s ease-out;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 500px;
  animation: ${slideUp} 1s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h2`
  font-size: 3.5em;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff6b6b, #f9ca24);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
`;

const Subtitle = styled.p`
  font-size: 1.4em;
  margin-bottom: 25px;
  color: #cfcfcf;
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #e74c3c, #f39c12);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 99, 71, 0.8);
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 1.1em;
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 0.9em;
  color: #aaa;

  a {
    color: #f39c12;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: #e67e22;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${props => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 80%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;

const LoginPage = ({ onLogin, bgImage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter a valid username and password');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/teams/login?teamName=${username}&password=${password}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setModalOpen(true); // Open the modal to display the image
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <LoginContainer bgImage={bgImage}>
      <LoginCard>
        <Title>Enter the Arena</Title>
        <Subtitle>"Chasing glory, one goal at a time. 🏆⚽ Let the game begin!"</Subtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your team name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <Footer>
          Forgot your password? <a href="#" onClick={handleLinkClick}>Don't Click here</a>
        </Footer>
      </LoginCard>

      {/* Modal for image */}
      <Modal open={modalOpen}>
        <ModalContent>
          <img src="https://i.guim.co.uk/img/media/52a16b5cfc5f8d05898ec9bffd741c25abe9ea1f/0_97_3600_2160/master/3600.jpg?width=1200&quality=85&auto=format&fit=max&s=b67e4852432cd3ba07fbf7d694e2d53f" alt="Image to display" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        </ModalContent>
      </Modal>
    </LoginContainer>
  );
};

export default LoginPage;
