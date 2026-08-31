function Skills() {
    return (
        <section id="skills">

            <h2>My Skills</h2>

            <p>
                These are some of the technologies and tools I am learning.
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "50px",
                    justifyContent: "center",
                }}
            >

                <div>
                    <h3>Frontend Development</h3>

                    <ul>
                        <li>HTML5</li>
                        <li>CSS3</li>
                        <li>JavaScript</li>
                        <li>React.js</li>
                        <li>Tailwind CSS</li>
                        <li>Responsive Design</li>
                    </ul>
                </div>

                <div>
                    <h3>Development Tools</h3>

                    <ul>
                        <li>Git</li>
                        <li>GitHub</li>
                        <li>VS Code</li>
                        <li>Vite</li>
                        <li>npm</li>
                        <li>Chrome DevTools</li>
                    </ul>
                </div>

            </div>

        </section>
    );
}

export default Skills;