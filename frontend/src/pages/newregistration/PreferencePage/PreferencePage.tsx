import React, { useState, useEffect } from "react";
import PreferencesForm from "./PreferenceForm.tsx"; // Import PreferencesForm
import "./PreferencePage.css";

const PreferencePage = () => {
  const [name, setName] = useState<string>(""); // State for name

  // Retrieve name from localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo.firstName) {
      setName(userInfo.firstName);
    }
  }, []);


  return (
    <div className="preference-page">
      <h2>Thank you for joining, {name}</h2>
      <p>We just have a few questions before you begin.</p>
      <PreferencesForm />
    </div>
  );
};

export default PreferencePage;
