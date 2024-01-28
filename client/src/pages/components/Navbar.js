import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./Navbar.css";
import WeatherForm from "./WeatherForm";

const Navbar = ({ onCitySubmit }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  

  useEffect(() => {
     setTimeout(() => {
      setShowWelcome(false);
      
    }, 1000)
  }, [])

  return (
    <nav>
     
      <h2
        className={`app-name ${
          showWelcome === false ? "fade-in" : "fade-out"
        }`}
      >
        {showWelcome ? "Welcome"  : "PREDICT"}
      </h2>
      <WeatherForm onCitySubmit={onCitySubmit} />
    </nav>
  );
};

export default Navbar;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import WeatherForm from "./WeatherForm";

// const Navbar = ({ onCitySubmit }) => {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [showAppName, setShowAppName] = useState(false);

//   useEffect(() => {
//     // Set a timeout to fade out "Welcome" after 0.75 seconds
//     const welcomeTimeout = setTimeout(() => {
//       setShowWelcome(false);
//       // Set another timeout to fade in "PREDICT" 0.5 seconds after "Welcome" fades out
//       const appNameTimeout = setTimeout(() => {
//         setShowAppName(true);
//       }, 500);

//       return () => clearTimeout(appNameTimeout);
//     }, 750); // This is for the initial display time of "Welcome".

//     // Clear the timeout when the component unmounts to prevent memory leaks
//     return () => clearTimeout(welcomeTimeout);
//   }, []); // Empty dependency array ensures this effect runs only once after initial render.

//   return (
//     <nav>
//       <h2
//         className={`app-name ${
//           showWelcome ? "fade-in" : showAppName ? "fade-out" : "hidden"
//         }`}
//       >
//         {showWelcome ? "Welcome" : showAppName ? "PREDICT" : "PREDICT"}
//       </h2>
//       <WeatherForm onCitySubmit={onCitySubmit} />
//     </nav>
//   );
// };

// export default Navbar;