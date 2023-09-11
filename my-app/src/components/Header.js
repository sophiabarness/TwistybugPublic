import React, { useState } from 'react';
import TwistybugLogo from './twistybug.svg';
import './header.css';
import Typewriter from './Typewriter';

const Header = () => {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false); // Add this state

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleJoinClick = async () => {
    try {
      const response = await fetch('insert-heroku-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        console.log('Email added successfully');
        setIsJoined(true); // Set the confirmation status
        // You can add further actions here, like showing a success message to the user
        setEmail('');
    } else {
        console.error('Failed to add email');
        // You can handle the error scenario here
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // You can handle the error scenario here
    }
  };

  return (
    <div className="header">
      <div className="otherSubContainer">
        <div className="subcontainer">
          <div className="header-content">
            <h1>Join the Club.</h1>
            <div className="header-description">
              <Typewriter delay={100} infinite />
            </div>
            <div className="header-content__input">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="button" onClick={handleJoinClick}>
                Join
              </button>
            </div>
            {isJoined && <p id="joinMessage">Successfully joined. Welcome to the Club!</p>} {/* Render the confirmation message */}
          </div>
        </div>
        <div className="header-image">
          <img src={TwistybugLogo} alt="Twistybug Logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;

// import React, { useState, useEffect } from 'react';
// import TwistybugLogo from './twistybug.svg';
// import './header.css';

// const Header = () => {
//   const textArray = [
//     'Challenge yourself with puzzles.',
//     'Keep your brain active.',
//     'Feel accomplished.'
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentText, setCurrentText] = useState(textArray[currentIndex]);
//   const [isTyping, setIsTyping] = useState(true);

//   useEffect(() => {
//     let timeout;

//     if (isTyping) {
//       timeout = setTimeout(() => {
//         setCurrentText(textArray[currentIndex].slice(0, currentText.length + 1));

//         if (currentText === textArray[currentIndex]) {
//           setIsTyping(false);
//           setTimeout(() => {
//             setIsTyping(true);
//             setCurrentIndex((currentIndex + 1) % textArray.length);
//           }, 1000);
//         }
//       }, 100);
//     } else {
//       timeout = setTimeout(() => {
//         setCurrentText(currentText.slice(0, currentText.length - 1));

//         if (currentText === '') {
//           setIsTyping(true);
//           setCurrentIndex((currentIndex + 1) % textArray.length);
//         }
//       }, 50);
//     }

//     return () => clearTimeout(timeout);
//   }, [currentText, currentIndex, isTyping]);

//   return (
//     <div className="header section__padding" id="home">
//       <div className="header-content">
//         <h1>Join the Club.</h1>
//         <div className="header-description">
//           <p>{currentText}</p>
//         </div>
//         <div className="header-content__input">
//           <input type="email" placeholder="Your Email Address" />
//           <button type="button">Join</button>
//         </div>
//       </div>
//       <div className="header-image">
//         <img src={TwistybugLogo} alt="Twistybug Logo" />
//       </div>
//     </div>
//   );
// };

// export default Header;