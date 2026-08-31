function Project() {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Website",
            description: "A simple online shopping website built with React.",
        },
        {
            id: 2,
            title: "Task Manager",
            description: "A simple task management application.",
        },
        {
            id: 3,
            title: "Weather App",
            description: "A simple weather application.",
        },
        {
            id: 4,
            title: "Apple Website Clone",
            description:
                "A responsive Apple-inspired website built with HTML, CSS and React.",
        },
        {
            id: 5,
            title: "Business Website",
            description:
                "A professional business website with a clean and modern design.",
        },
        {
            id: 6,
            title: "Expense Tracker",
            description:
                "A simple application for tracking income and daily expenses.",
        },
    ];

    return (
        <section id="projects">
            <h2>My Projects</h2>

            <p>Here are some of the projects I have built.</p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            padding: "20px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>{project.title}</h3>

                        <p>{project.description}</p>

                        <a href="#contact">View Project</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Project;