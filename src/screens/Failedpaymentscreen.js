import React from "react";
import { useNavigate } from "react-router-dom";

export default function Failedpaymentscreen() {
    const navigate = useNavigate();

    const handleRetryPayment = () => {
        navigate("/cart");
    };

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>
        <div style={styles.card}>
            <h1 style={styles.title}>Payment Failed</h1>
            <p style={styles.message}>
            Unfortunately, we couldn’t process your payment. Please check your payment details or try again later.
            </p>
            <div style={styles.actions}>
            <button style={styles.retryButton} onClick={handleRetryPayment}>
                Retry Payment
            </button>
            <button style={styles.homeButton} onClick={handleGoHome}>
                Go to Home
            </button>
            </div>
        </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8d7da",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
    },
    title: {
        color: "#721c24",
        fontSize: "1.8rem",
        marginBottom: "1rem",
    },
    message: {
        color: "#555",
        fontSize: "1rem",
        marginBottom: "1.5rem",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    retryButton: {
        backgroundColor: "#d9534f",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
    homeButton: {
        backgroundColor: "#6c757d",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
