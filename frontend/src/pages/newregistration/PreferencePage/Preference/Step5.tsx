import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Path to the Google Calendar logo stored in the public folder
const gcalLogo = "/photos/logos/googlecallogo.jpeg";

interface Step5Props {
  handleLoginWithGC: () => void;
  handleSkip: () => void;
  handlePreviousStep: () => void; // Add the handlePreviousStep prop
}

const Step5: React.FC<Step5Props> = ({ handleLoginWithGC, handlePreviousStep }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle skip
  const handleSkipAndNavigate = () => {
    navigate("/calendar"); // Navigate to /calendar route
  };

  return (
    <div className="step5-container">
      <div className="centered-content">
        <button className="login-button" onClick={handleLoginWithGC}>
          <img src={gcalLogo} alt="Google Calendar Logo" className="gcal-logo" />
          Integrate your calendar! Import all of your existing events from your calendar!
        </button>
      </div>
      <button onClick={handlePreviousStep} className="previous-button">
        Back
      </button>
      <button onClick={handleSkipAndNavigate} className="skip-button"> {/* Use handleSkipAndNavigate here */}
        Skip
      </button>
    </div>
  );
};

export default Step5;
