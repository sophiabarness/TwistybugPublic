import React, { useState, useEffect, useCallback } from 'react'
import readFileToArray from "./readFileToArray.js"
import './gridStyles.css'

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return null; // Add this line to return a value from the arrow function
  });
  return images;
}

const images = importAll(require.context('./cardsOutputOutput', false, /\.svg$/));


 function Card({ path, clickedSquares, setClickedSquares, triplesFound }) {
  const [isClicked, setIsClicked] = useState(false);

  // Update isClicked whenever clickedSquares changes
  useEffect(() => {
    setIsClicked(clickedSquares.includes(path));
  }, [clickedSquares, path]);

  function handleClick() {
    if (triplesFound.length === 6) {
      return;
    }
    let temp = clickedSquares.slice();
    if (temp.includes(path)) {
      const indexToRemove =  temp.indexOf(path);
      temp.splice(indexToRemove); 
      setIsClicked(false);
    }
    else {
      temp.push(path);
      setIsClicked(true);
    }
    
    // console.log(temp);
    setClickedSquares(temp);
  }; 

  return ( 
  <button 
    className={`btn item ${isClicked ? 'clicked' : ''} shadow-none`  }
    onClick={handleClick}
    >
    <div id="img-wrapper">
      <div><img src={images[path]} alt={`Card for ${path}`}/></div>
    </div>
  </button>);
 }

export default function Grid() {
  const [svgArray, setSvgArray] = useState([]);
  const [triples, setTriples] = useState([]);
  const [clickedSquares, setClickedSquares] = useState([]);
  const [triplesFound, setTriplesFound] = useState([]);
  const [counterMessage, setCounterMessage] = useState(' 0/6');
  const [message, setMessage] = useState('Find three cards that form a valid triple. You got this!' + counterMessage);
  

  // svgArray pertains to all the combinations
  useEffect(() => {
    const fetchSVGFile = async () => {
      const filePath = "/writeCombinations.txt"; 
      const lines = await readFileToArray(filePath);
      setSvgArray(lines);
    };
  
    fetchSVGFile();
  }, []);
  const cardPaths = svgArray;

  useEffect(() => {
    const fetchTriples = async () => {
      const filePath = "/writeTriples.txt";
      try {
        const response = await fetch(filePath);
        const content = await response.text();
        const triplesData = JSON.parse(content);
        setTriples(triplesData);
      } catch (error) {
        console.error("Error fetching or parsing triples data:", error);
      }
    };

    fetchTriples();
  }, []);

  const cardTriples = triples;

  useEffect(() => {
    if (triplesFound.length === 1) {
      setCounterMessage(' 1/6');
    } else if (triplesFound.length === 2) {
      setCounterMessage(' 2/6');
    } else if (triplesFound.length === 3) {
      setCounterMessage(' 3/6');
    } else if (triplesFound.length === 4) {
      setCounterMessage(' 4/6');
    } else if (triplesFound.length === 5) {
      setCounterMessage(' 5/6');
    } else if (triplesFound.length === 6) {
      setCounterMessage(' 6/6');
    }
  }, [triplesFound]);
  
  const getMessageWithCounter = useCallback(() => {
    if (triplesFound.length === 1) {
      return 'You found one triple! Keep going!' + counterMessage;
    } else if (triplesFound.length === 2) {
      return "That's two now! Four more left." + counterMessage;
    } else if (triplesFound.length === 3) {
      return '3 down. 3 to go!' + counterMessage;
    } else if (triplesFound.length === 4) {
      return 'Keep it up! Two more left.' + counterMessage;
    } else if (triplesFound.length === 5) {
      return 'Only one more left! So close.' + counterMessage;
    } else if (triplesFound.length === 6) {
      return 'You found all the triples!' + counterMessage;
    }
    return 'Find three cards to form a valid triple. You got this!' + counterMessage;
  }, [triplesFound, counterMessage]);

  useEffect(() => {
    setMessage(getMessageWithCounter());
  }, [counterMessage, getMessageWithCounter]);

  useEffect(() => {

    const delay = 300
    setTimeout(() => {
    // Check if the three clicked squares form a triple
    if (clickedSquares.length === 3) {
      let isATriple = false;

      // Function to convert a single sub-array of numbers to an array of strings
      const transformSubArrayToStrings = (subArray) => {
        return subArray.map((numbers) => numbers.join('') + '.svg');
      };

      // Function to convert the entire cardTriples array to the desired format
      const cardTriplesV2 = cardTriples.map(transformSubArrayToStrings);

      // loop through all possible cardTriples
      for (let i = 0; i < cardTriples.length; i++) {
        let inCurrCardTriples = true; 
        // loop through clickedSquares to assert whether they are in the cardTriples[i]
        for (let j = 0; j < clickedSquares.length; j++) {
          if (!cardTriplesV2[i].includes(clickedSquares[j])) {
            inCurrCardTriples = false;
            break;
          }
        }
        if (inCurrCardTriples) {
          isATriple = true;
          break;
        }
      }
      // want to check whether the triple was already found in triplesFound
      let AFoundTriple = false
      // check every triple in triplesFound to see if it exists
      for (let i = 0; i < triplesFound.length; i++) {
        // go through every card in the triple to see if it is in triplesFound[i]
        let tripleInTriplesFound = true
        for (let j = 0; j < clickedSquares.length; j++) {
          if (!triplesFound[i].includes(clickedSquares[j])) {
            tripleInTriplesFound = false;
            break;
          }
        }
        if (tripleInTriplesFound) {
          AFoundTriple = true
          break;
        }
      }
      if (!isATriple) {
        setMessage("That one isn't a triple! Keep looking!" + counterMessage);
      }
      if (AFoundTriple) {
        setMessage('Oops! You already found this triple. Keep looking!' + counterMessage);
      }
      if (isATriple && !AFoundTriple) {
        let temp = triplesFound.slice();
        temp.push(clickedSquares);      
        setTriplesFound(temp);
      }

      setClickedSquares([]);
    }
  }, delay);
  }, [clickedSquares, triplesFound, cardTriples, counterMessage]);
  

  // useEffect(() => {
  //   console.log(triplesFound);
  // }, [triplesFound]);

  // useEffect(() => {
  //   console.log(clickedSquares);
  // }, [clickedSquares]);
  const [instructions] = useState('Instructions (Click Me!)');
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <>
      <h2>{message}</h2>
      <div className="container">
          {cardPaths.map((cardPath) => (
            <Card 
              key={cardPath}
              path={cardPath}
              clickedSquares={clickedSquares}
              setClickedSquares={setClickedSquares}
              cardTriples={cardTriples}
              triplesFound={triplesFound}
              // setTriplesFound={setTriplesFound}
              />
          ))}
      </div>
      <div className="instruction-container">
        <h3 onClick={toggleInstructions} className="clickable-heading">{instructions}</h3>
        {showInstructions && (    
        <div className="directions">   
          <p>Each card has four properties with three types:</p>
          <ul>
            <li>Shape - types: square, circle, triangle</li>
            <li>Number - types: one, two, three</li>
            <li>Shading - types: clear, grid, filled</li>
            <li>Border Decoration - types: none, outline, rays</li>
          </ul>
          <p className="add-margin">Choose three cards to form a triple so that for each property, each of the three cards has the same type or each has a different type.</p>
          <p>Example (for shape property):</p>
          <ul>
            <li>square, square, circle - bad</li>
            <li>square, circle, triangle - good</li>
            <li>circle, circle, circle - good</li>
          </ul>      
        </div>
        )}
      </div>
    </>
  )
}


