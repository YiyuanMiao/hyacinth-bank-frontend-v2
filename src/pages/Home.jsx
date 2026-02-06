import { apiService } from "../services/api";

const Home = () => {
  const isAuthenticated = apiService.isAuthenticated();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Hyacinth Bank</h1>
          <p>Your secure and modern banking solution</p>
          {!isAuthenticated && (
            <div className="hero-buttons">
              <a href="/register" className="btn btn-primary">
                Get Started
              </a>
              <a href="/login" className="btn btn-secondary">
                Login
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Hyacinth Bank?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#995A73"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Secure</h3>
              <p>Bank-level security to keep your money and information safe.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#995A73"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3>Fast</h3>
              <p>Instant transfers and quick access to your funds.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#995A73"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Reliable</h3>
              <p>Trusted by thousands of customers worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
