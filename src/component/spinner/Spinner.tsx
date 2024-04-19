import React, { useEffect, useState } from "react";
import "./Spinner.css";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
      navigate("/home");
    }, 2000);
  }, []);

  return (
    <div>
      {showSpinner && (
        <div className={`containerLoader`}>
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Spinner;