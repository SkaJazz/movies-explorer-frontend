import { useState, useEffect } from "react";
import "./ErrorBlock.css"

export default function ErrorBlock({errorText}) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
    setTimeout(() => {
          setShowError(false);
    }, 1000);
  },[])

  return (
    <p
      className={`errorBlock ${
        errorText && showError ? `errorBlock_visible` : ""
      }`}
    >
      {errorText}
    </p>
  );
};
