import profileImg from "../assets/Profile.jpg";

function Hero() {
    return (
        <section
            id="hero"
            style={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "40px 20px",
            }}
        >
            <div>

                <button
                    style={{
                        backgroundColor: "#6b4226",
                        color: "#fff3df",
                        padding: "10px 22px",
                        border: "none",
                        borderRadius: "25px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                    }}
                >
                    Available for Opportunities
                </button>

                <h1>
                    Hi, I'm Menkem Zekarias
                </h1>

                <h2>Frontend Web Developer</h2>

                <p>
                    I design and build clean, responsive, and user-friendly
                    websites using modern web technologies.
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        margin: "25px 0",
                    }}
                >
                    <a href="#projects">
                        View My Work
                    </a>

                    <a href="#contact">
                        Contact Me
                    </a>
                </div>

                <h3>My Skills</h3>

                <p>
                    React | JavaScript | HTML5 | CSS3 | Git & GitHub
                </p>

                <img
                    src={profileImg}
                    alt="Menkem Zekarias"
                    width="300"
                    style={{
                        borderRadius: "50%",
                        marginTop: "20px",
                    }}
                />

            </div>
        </section>
    );
}

export default Hero;