import React from "react";
import { useMobile } from "../../TiptapEditor/hooks/use-mobile";
import logo from "../assets/pp final.png";

export const MobileNotice: React.FC = () => {
    const isMobile = useMobile();

    if (!isMobile) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "#FEFBF5",
                color: "#1C4F4A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                zIndex: 9999,
                textAlign: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    height: "100dvh",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}
            >
                <img
                    src={logo}
                    alt="Paperplanes"
                    style={{ width: 96, height: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}
                />
                <h1
                    style={{
                        fontSize: "1.4rem",
                        marginBottom: 0,
                        fontFamily: "Pacifico, cursive",
                        color: "#1C4F4A",
                    }}
                >
                    Thanks for visiting Paperplanes
                </h1>
                <p style={{ maxWidth: 360, lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>
                    For the best writing and reading experience, please use a
                    <span style={{ color: "#FE661C", fontWeight: 600 }}> laptop or desktop</span>.
                    We’re crafting a lovely mobile experience-stay tuned!
                </p>
            </div>
        </div>
    );
};

export default MobileNotice;


