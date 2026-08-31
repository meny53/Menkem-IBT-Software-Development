function Contact() {
    return (
        <section id="contact">
            <h2>Contact Me</h2>

            <p>Feel free to contact me for projects and opportunities.</p>

            <div>
                <h3>Email</h3>
                <p>your.email@example.com</p>

                <h3>Location</h3>
                <p>Ethiopia</p>
            </div>

            <h3>Send Me a Message</h3>

            <form>
                <input
                    type="text"
                    placeholder="Your Name"
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Your Email"
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Subject"
                />

                <br /><br />

                <textarea
                    placeholder="Your Message"
                    rows="5"
                ></textarea>

                <br /><br />

                <button type="submit">
                    Send Message
                </button>
            </form>

            <h3>Connect With Me</h3>

            <p>
                <a href="https://github.com">GitHub</a>
            </p>

            <p>
                <a href="https://linkedin.com">LinkedIn</a>
            </p>
        </section>
    );
}

export default Contact;