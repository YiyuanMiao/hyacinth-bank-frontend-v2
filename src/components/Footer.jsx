const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Hyacinth Bank</h3>
                        <p>Your trusted financial partner since 2020.</p>
                        <p>Secure, fast, and reliable banking solutions.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <p>support@hyacinthbank.com</p>
                        <p>+1 (555) 123-4567</p>
                        <p>123 Banking Street, NY 10001</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Hyacinth Bank. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;