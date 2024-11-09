import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type = "spin", color = "#4CAF50" }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.loaderContainer}>
                <ReactLoading type={type} color={color} height={100} width={100} />
                <p style={styles.loadingText}>Loading, please wait...</p>
            </div>
        </div>
    );
};

// Define styles to create a centered, overlayed loading screen
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    loaderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    loadingText: {
        color: "#fff",
        marginTop: 20,
        fontSize: "1.2rem",
        fontFamily: "Arial, sans-serif",
    },
};

export default Loading
