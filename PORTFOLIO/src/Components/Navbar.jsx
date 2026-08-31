import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ]

    const closeMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <a href="#hero" className="navbar-logo" onClick={closeMenu}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">Menkem</span>
                    <span className="logo-dot">.</span>
                    <span className="logo-dev">dev</span>
                    <span className="logo-bracket"> /&gt;</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul className="nav-menu">
                        {navLinks.map((link, index) => (
                            <li key={index} className="nav-item">
                                <a href={link.href} className="nav-link">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Action Button */}
                <div className="navbar-actions">

                    <a href="#contact" className="btn btn-sm btn-primary">
                        Hire Me
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>

            {/* Mobile Drawer Navigation */}
            <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
                <ul className="mobile-nav-list">
                    {navLinks.map((link, index) => (
                        <li key={index} className="mobile-nav-item">
                            <a
                                href={link.href}
                                className="mobile-nav-link"
                                onClick={closeMenu}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                    <li className="mobile-nav-actions">
                        <a
                            href="/resume.pdf"
                            download="Sammy_Resume.pdf"
                            className="btn btn-outline full-width"
                            onClick={closeMenu}
                        >
                            Download Resume 📄
                        </a>
                        <a
                            href="#contact"
                            className="btn btn-primary full-width"
                            onClick={closeMenu}
                        >
                            Let's Talk 💬
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}
