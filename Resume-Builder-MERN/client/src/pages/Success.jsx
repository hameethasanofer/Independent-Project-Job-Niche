import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you can call backend to confirm payment session_id
    // and update the user’s premium status in the database.

    // Also set it locally in browser
    localStorage.setItem("premiumAccess", "true");

    // After 2 seconds, go back to Templates page
    setTimeout(() => {
      navigate("/templates");
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2 style={{ color: "green" }}>Payment Successful! 🎉</h2>
      <p>You’ll be redirected to Templates shortly…</p>
    </div>
  );
};

export default Success;
