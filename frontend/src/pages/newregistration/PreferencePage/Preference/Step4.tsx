import React from "react";

// Path to the Canvas logo stored in the public folder
const canvasLogo = "/photos/logos/canvaslogo.jpeg"; 

interface Step4Props {
  handleLoginWithCanvas: () => void;
  handleSkip: () => void;
  handlePreviousStep: () => void;  // Add the handlePreviousStep prop
}

const Step4: React.FC<Step4Props> = ({ handleLoginWithCanvas, handleSkip, handlePreviousStep }) => {
  return (
    <div className="step4-container">
      <div className="centered-content">
        <button
          className="login-button"
          onClick={handleLoginWithCanvas}
        >
          <img src={canvasLogo} alt="Canvas Logo" className="canvas-logo" />
          Log in with Canvas
        </button>
      </div>
      <button onClick={handlePreviousStep} className="previous-button">
        Back
      </button>
      <button onClick={handleSkip} className="skip-button">
        Skip
      </button>
    </div>
  );
};

export default Step4;
