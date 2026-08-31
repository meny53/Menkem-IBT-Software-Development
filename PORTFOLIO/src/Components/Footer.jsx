export default function Footer() {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ]

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/', icon: '🐙' },
        { name: 'LinkedIn', url: 'https://linkedin.com/', icon: '💼' },
        { name: 'Twitter / X', url: 'https://x.com/', icon: '🐦' },
    ]

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-top">
                    {/* Brand / Logo */}
                    <div className="footer-brand">
                        <a href="#hero" className="footer-logo">
                            <span className="logo-accent">&lt;</span>
                            DevPortfolio
                            <span className="logo-accent"> /&gt;</span>
                        </a>
                        <p className="footer-tagline">
                            Building scalable, modern, and high-performance digital experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-nav">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-nav-list">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="footer-nav-link">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Back to Top */}
                    <div className="footer-social-wrapper">
                        <h4 className="footer-heading">Connect</h4>
                        <div className="footer-social-icons">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-btn"
                                    title={social.name}
                                >
                                    <span>{social.icon}</span>
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="back-to-top-btn"
                            title="Back to Top"
                        >
                            <span>Back to Top</span> ↑
                        </button>
                    </div>
                </div>

                <div className="footer-divider"></div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="copyright-text">
                        © {currentYear} <strong>DevPortfolio</strong>. All rights reserved.
                    </p>
                    <p className="built-with">
                        Designed & Built with <span>❤️</span> using <strong>React</strong> & <strong>Vite</strong>
                    </p>
                </div>
            </div>
        </footer>
    )
}
