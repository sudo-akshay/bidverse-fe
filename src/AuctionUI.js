import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { API_BASE_URL } from './constant';
import { FaCheckCircle } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  background: ${(props) => `url(${props.bgImage}) no-repeat center center fixed`};
  background-size: cover;
`;

// Shake animation
const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const LeftPanel = styled.div`
  width: 25%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  max-height: 90vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const PlayerCardList = styled.div`
  margin-top: 20px;
`;



// const PlayerName = styled.h4`
//   font-size: 1.2em;
//   margin: 0;
// `;

// const PlayerPosition = styled.p`
//   font-size: 1em;
//   margin: 0;
// `;





const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;


const StyledLeftPanel = styled.div`
width: 300px; /* Set the desired width */
  background: rgba(231, 226, 226, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 100%;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  h4 {
    font-size: 1.2rem;
    color: #555;
    margin: 1rem 0 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
      padding: 0.1em;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f9f9f9;
      transition: transform 0.3s, background 0.3s;

      &:hover {
        background: #eef;
        transform: scale(1.02);
      }

      strong {
        font-size: 0.8rem;
        color: #333;
        margin-right: 10px;
      }

      .icon {
        color: green;
        margin-right: 10px;
      }

      .details {
        flex: 1;

        p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }
      }
    }
  }

  .loading {
    text-align: center;
    color: #666;
    font-size: 1rem;
  }

 .team-name {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5em;  /* Larger font size for team name */
    font-weight: bold;
    color: #2980b9; /* Color for the team name */
    letter-spacing: 2px;  /* Slight spacing between letters */
    text-transform: uppercase;  /* Make the team name uppercase */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Subtle shadow to add depth */
    padding-bottom: 2px;
    border-bottom: 2px solid #2980b9;  /* Bottom border to separate from content */
    font-family: 'Arial', sans-serif; /* Change font to a more modern one */
  }

  .purse-info {
  margin-top: 10px;
  padding: 2px;
  background: #f0f0f0;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  color: #333;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.purse-info:hover {
  background: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.purse-item {
  margin: 10px 0;
  font-size: 1.1rem;
  font-weight: bold;
  color:rgb(35, 115, 68);  /* Green color */
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.05);  /* Slightly enlarge on hover */
    color:rgb(26, 88, 52);  /* Darker green for hover effect */
  }
  }
`;

const StyledPanels = styled.div`
  display: flex;
  gap: 20px; /* Adjust the gap as needed */
  width: 100%;
`;





const NextButton = styled.button`
  background-color: #8e44ad;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;

  &:hover {
    background-color: #9b59b6;
  }
`;

const Select = styled.select`
  background-color: #34495e;
  color: white;
  border: 1px solid #f39c12;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 1.1em;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f39c12;
    cursor: pointer;
  }
`;

const Option = styled.option`
  background-color: #2c3e50;
  color: white;
`;

const CurrentBiddingTeam = styled.p`
  font-size: 1.1em;  /* Slightly larger for better prominence */
  color: #27ae60;  /* Green color for the team name */
  font-weight: 600;  /* Medium boldness for a sleek look */
  margin: 12px 0;  /* Adjusted margin for better spacing */
  text-transform: capitalize;
  letter-spacing: 0.5px;  /* Slight spacing between letters for clarity */
  font-family: 'Poppins', sans-serif;  /* Modern and clean font */
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);  /* Soft shadow for depth */
  display: inline-block;  /* Makes the animation smoother on the text */
  transition: transform 0.3s ease, opacity 0.3s ease;  /* Smooth transitions */
  animation: pulseAnimation 2s ease-in-out infinite, glowEffect 1.5s ease-in-out infinite alternate; /* Added glow effect */

  /* Keyframes for continuous pulse animation */
  @keyframes pulseAnimation {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(-12px);  /* Slightly more pronounced movement */
      opacity: 0.8;  /* Slightly fade */
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Keyframes for a glowing effect */
  @keyframes glowEffect {
    0% {
      text-shadow: 0 0 10px rgba(39, 174, 96, 0.8), 0 0 20px rgba(39, 174, 96, 0.6);
    }
    100% {
      text-shadow: 0 0 20px rgba(39, 174, 96, 1), 0 0 30px rgba(39, 174, 96, 0.8);
    }
  }

  &:hover {
    transform: scale(1.05);  /* Slight zoom on hover */
    opacity: 1;  /* Full opacity on hover */
  }
`;




const MiddlePanel = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* Or specific height depending on your layout */
  background-image: url('your-image-url.jpg'); /* Add your background image */
  background-size: cover; /* Cover the entire panel */
  background-position: center center; /* Center the background image */
  background-repeat: no-repeat;
  z-index: 1; /* Ensure the background is behind the content */
  padding: 20px; /* Adjust padding as needed */
`;



const PlayerCard = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
  gap: 15px;  /* Reduced gap between sections */
  font-family: 'Poppins', sans-serif;

  animation: ${(props) => (props.isShaking ? shake : 'none')} 0.5s;

  &:hover {
    // transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;

const PlayerImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LeftSideDetails = styled.div`
  flex: 1;
  text-align: left;
  max-width: 250px;
  padding: 10px;
  background: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ecf0f1;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateX(-10px);
  }

  p {
    margin: 10px 0;
    font-size: 1.1em;
    display: flex; /* Use flexbox to align label and value in one row */
    justify-content: space-between; /* Space between label and value */
  }

  p strong {
    margin-right: 10px; /* Space between label and value */
    font-weight: bold;
    color: #f39c12;
  }
`;

const RightSideDetails = styled.div`
  flex: 1;
  text-align: left;
  max-width: 250px;
  padding: 10px;
  background: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ecf0f1;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateX(-10px);
  }

  p {
    margin: 10px 0;
    font-size: 1.1em;
    display: flex; /* Use flexbox to align label and value in one row */
    justify-content: space-between; /* Space between label and value */
  }

  p strong {
    margin-right: 10px; /* Space between label and value */
    font-weight: bold;
    color: #f39c12;
  }
`;


const PlayerImage = styled.img`
  width: 220px;  /* Increased size */
  height: 220px;  /* Increased size */
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f39c12;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);  /* Subtle shadow for depth */
  transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;  /* Smooth transitions */
  margin: 10px 0;
  background: linear-gradient(45deg, rgba(243, 156, 18, 0.8), rgba(255, 105, 180, 0.5));  /* Gradient for a lively touch */

  &:hover {
    transform: scale(1.1);  /* Increased size on hover */
    filter: brightness(1.2) contrast(1.1);  /* Slight contrast boost */
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);  /* Stronger shadow on hover for emphasis */
  }
`;

const PositionAndRating = styled.div`
  text-align: center;
  margin-top: 10px; /* Reduced space */
`;

const PlayerName = styled.h2`
  font-size: 1.6em;  /* Slightly larger size for more prominence */
  font-weight: 700;  /* Bolder font weight for emphasis */
  color: #ecf0f1;
  margin-bottom: 12px;  /* Increased margin for better spacing */
  text-transform: uppercase;  /* Make text uppercase for added emphasis */
  background: linear-gradient(45deg, #2980b9, #8e44ad);  /* Gradient color effect */
  -webkit-background-clip: text;  /* Apply gradient to text */
  background-clip: text;
  display: inline-block; /* Keep the gradient effect for the text only */
  font-family: 'Roboto', sans-serif;  /* Use a modern font */
  letter-spacing: 1px;  /* Add spacing between letters for a clean look */
  animation: fadeInUp 1s ease-out, glowEffect 1.5s ease-in-out infinite alternate; /* Added glowing effect */
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glowEffect {
    0% {
      text-shadow: 0 0 10px rgba(41, 128, 185, 0.7), 0 0 20px rgba(41, 128, 185, 0.6);
    }
    100% {
      text-shadow: 0 0 20px rgba(142, 68, 173, 0.8), 0 0 40px rgba(142, 68, 173, 0.7);
    }
  }
`;


const PlayerPosition = styled.p`
  font-size: 1.1em;  /* Slightly smaller */
  color: #f39c12;
  margin-bottom: 5px; /* Reduced space */
  font-family: 'Roboto', sans-serif;
`;

const PlayerRating = styled.p`
  font-size: 2.2em;  /* Slightly smaller */
  font-weight: bold;
  color: #f39c12;
  margin: 5px 0;  /* Reduced space */
  animation: fadeInUp 1s ease-out 0.5s;
`;

const PriceAndBid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;  /* Reduced gap */
  margin-top: 15px;  /* Reduced space */
`;

const PlayerPrice = styled.p`
  font-size: 1.1em;  /* Slightly larger for better visibility */
  font-weight: 700;  /* Stronger emphasis on price */
  color: #e74c3c;  /* Red color for emphasis */
  margin: 5px 0;
  padding: 8px 16px;  /* Added padding for spacing */
  border-radius: 12px;  /* More rounded corners for a smooth appearance */
  background-color: #fff;  /* White background for contrast */
  border: 2px solid #e74c3c;  /* Red border matching the color */
  display: inline-block;  /* To ensure background only applies to text */
  text-align: center;  /* Center the text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Soft shadow for depth */
  font-family: 'Poppins', sans-serif;  /* Modern, clean font */
  letter-spacing: 0.5px;  /* Slight letter spacing for clarity */
  transition: all 0.3s ease;  /* Smooth transitions for hover effects */

  &:hover {
    transform: translateY(-5px);  /* Subtle lift effect on hover */
    background-color: #f5b7b1;  /* Light red background on hover */
    color: #fff;  /* Change text color to white */
    border-color: #c0392b;  /* Darker border on hover */
  }
`;


const ActionButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%;  /* Full width button */
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #2ecc71;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const PassButton = styled.button`
  background-color: #f94449;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%;  /* Full width button */
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #f94449;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;





const AuctionUI = ({ user, teamId }) => {
    const [players, setPlayers] = useState([]);
    const [purse, setPurse] = useState(user.availablePurse || 10000000);
    const [purchasedPlayers, setPurchasedPlayers] = useState(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [livePlayer, setLivePlayer] = useState(null); // State for live player data
    const [isShaking, setIsShaking] = useState(false); // State to trigger shake animation
    const [prevHighestBid, setPrevHighestBid] = useState(null); // Track previous highestBid
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button state for delay
    const [errorMessage, setErrorMessage] = useState(''); // Error message for insufficient funds
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/players/bought/v2?teamId=${teamId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (!response.ok) {
            console.error(`Error fetching players: ${response.statusText}`);
            return;
          }
  
          const data = await response.json();
          setPurchasedPlayers(data);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      };
  
      // Initial fetch when the component mounts
      fetchPlayers();
  
      // Set interval to call fetchPlayers every 10 seconds
      const intervalId = setInterval(fetchPlayers, 10000);
  
      // Cleanup the interval on component unmount or when teamId changes
      return () => clearInterval(intervalId);
    }, []); // Re-run when teamId changes
  
    useEffect(() => {
      const fetchLivePlayer = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/players/live`, {
            method: 'POST'
          });
  
          if (!response.ok) {
            console.error(`Error fetching live player: ${response.statusText}`);
            return;
          }
  
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Expected JSON response, but got something else');
          }
  
          const data = await response.json();
  
          // Check if the highestBid has changed
          if (livePlayer && data.highestBid !== livePlayer.highestBid) {
            livePlayer.highestBid = data.highestBid;
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 2000000); // Reset shake animation after 2 seconds
          }

          // Check if the logged-in team is eligible to bid
      const isTeamEligible = data.eligibleTeams?.includes(teamId);
      const updatedTeamEligibility = isTeamEligible && (livePlayer && livePlayer.currentBiddingTeam ? teamId !== livePlayer.currentBiddingTeam.id : true);
      setIsButtonDisabled(!updatedTeamEligibility); // Disable buttons if team is not eligible

  
          setPrevHighestBid(data.highestBid); // Update previous highestBid
          setLivePlayer(data); // Update livePlayer state
        } catch (error) {
          console.error('Error fetching live player:', error);
        }
      };
  
      fetchLivePlayer();
  
      const interval = setInterval(fetchLivePlayer, 3000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }, []); // Re-run effect if livePlayer changes


    //pass button
    const handlePass = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/teams/pass?id=${teamId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            console.error('Error passing on the player:', response.statusText);
            return;
          }
      
          // On successful response, disable the Place Bid button
          setIsButtonDisabled(true);
          console.log('Successfully passed on the player');
        } catch (error) {
          console.error('Error passing on the player:', error);
        }
      };
      


  
    // Handle bid placement
    const handleBid = async () => {
      if (!livePlayer) return; // Ensure livePlayer exists
  
      // Disable button immediately for 2 seconds
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 2000);
  
      // Check if available purse is less than base price
      if (purse < livePlayer.basePrice) {
        setErrorMessage('Insufficient funds to place this bid.');
        return; // Do not proceed with the bid if funds are insufficient
      }
  
      // Increment the bid by 20
      const newBid = livePlayer.highestBid + 20;
  
      // Make the API request to place the bid
      try {
        const response = await fetch(
          `${API_BASE_URL}/players/placeBid?playerId=${livePlayer.id}&teamId=${teamId}&bidIncrement=20`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message === 'The team does not have enough funds to place this bid.') {
            setErrorMessage('Error: The team does not have enough funds to place this bid.');
          } else {
            setErrorMessage('An unexpected error occurred while placing the bid.');
          }
          return;
        }
  
        // Update live player state with the new bid
        const updatedPlayer = await response.json();
        setLivePlayer(updatedPlayer);
        setErrorMessage(''); // Clear any previous error messages
      } catch (error) {
        console.error('Error placing bid:', error);
        setErrorMessage('Error: Something went wrong while placing the bid.');
      }
    };

  return (
    <Container bgImage="path/to/your/background-image.jpg">
     <StyledPanels>
     <StyledLeftPanel>
  {purchasedPlayers ? (
    <>
     <div className="team-name">
        <h2>{purchasedPlayers.name}</h2> {/* Assuming teamName is part of the purchasedPlayers object */}
      </div>
      <div className="purse-info">
      <div className="purse-item">Purse - ${purchasedPlayers.availablePurse}</div>
      </div>
      {['forwards', 'midfielders', 'defenders', 'goalkeepers'].map((position) => (
        <div key={position}>
          <h4>{position.charAt(0).toUpperCase() + position.slice(1)}</h4>
          <ul>
            {purchasedPlayers[position]?.map((player) => (
              <li key={player.id}>
                <FaCheckCircle className="icon" />
                <div className="details">
                  <strong>{player.name} - {player.position}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  ) : (
    <div className="loading">Loading players...</div>
  )}
</StyledLeftPanel>
<MiddlePanel>
  {livePlayer ? (
    <PlayerCard isShaking={isShaking}>
      <PlayerImageContainer>
        <LeftSideDetails>
          <p><strong>Club</strong> {livePlayer.club}</p>
          <p><strong>Age</strong> {livePlayer.age}</p>
          <p><strong>Position</strong> {livePlayer.positionCategory}</p>
          <p><strong>Preferred Foot</strong> {livePlayer.preferredFoot}</p>
        </LeftSideDetails>

        <PlayerImage src={livePlayer.imageUrl || 'default-image.jpg'} alt={livePlayer.name} />

        <RightSideDetails>
          <p><strong>Passing</strong> {livePlayer.passing}</p>
          <p><strong>Shooting</strong> {livePlayer.shooting}</p>
          <p><strong>Dribbling</strong> {livePlayer.dribbling}</p>
          <p><strong>Physical</strong> {livePlayer.physical}</p>
        </RightSideDetails>
      </PlayerImageContainer>

      <PositionAndRating>
        <PlayerName>{livePlayer.name}</PlayerName>
        <PlayerPosition>{livePlayer.rating} ({livePlayer.position}) </PlayerPosition>
      </PositionAndRating>

      <PriceAndBid>
        <PlayerPrice>Base Price: ${livePlayer.basePrice.toLocaleString()}</PlayerPrice>
        <PlayerPrice>Current Bid: ${livePlayer.highestBid ? livePlayer.highestBid.toLocaleString() : 'No bids yet'}</PlayerPrice>
        {/* Add animation and styling to the Current Bidding Team */}
        {livePlayer.currentBiddingTeam && (
        <CurrentBiddingTeam>
            Current Bidding Team: {livePlayer.currentBiddingTeam.name}
        </CurrentBiddingTeam>
        )}

<ActionButton
  onClick={handleBid}
  disabled={
    isButtonDisabled || 
    (purchasedPlayers?.availablePurse ?? 0) < (livePlayer?.basePrice ?? 0) ||
    livePlayer?.currentBiddingTeam?.id === teamId
  }
  title={
    !purchasedPlayers
      ? "Loading player data..."
      : purchasedPlayers.availablePurse < livePlayer?.basePrice
      ? "Insufficient funds to place this bid."
      : livePlayer?.currentBiddingTeam?.id === teamId
      ? "You already have the highest bid."
      : "Click to place a bid"
  }
>
  Place Bid
</ActionButton>
            {/* Pass Button */}
            <PassButton
            onClick={handlePass}
            disabled={livePlayer?.currentBiddingTeam?.id === teamId} // Disable if the logged-in team is the highest bidder
            title={livePlayer?.currentBiddingTeam?.id === teamId
              ? "You cannot pass the player until the bid is no longer with you."
              : "Click to pass on the player"
            }
            >
            Pass
            </PassButton>
        </PriceAndBid>
    </PlayerCard>
  ) : (
    <p>Loading live auction player...</p>
  )}
</MiddlePanel>








  </StyledPanels>
</Container>




      

      

     
  );
};

export default AuctionUI;
