import './Home.scss'
import React from 'react'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">Modern Task Management</h1>
            <p className="hero__subtitle">
              A fast, secure, and cross-platform task manager built with modern web technologies.
            </p>
            <div className="hero__buttons">
              <button className="primary-button">Get Started</button>
              <button className="secondary-button">View Features</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features__title">Powerful Features</h2>
        <div className="features__grid">
          <div className="feature-card">
            <h3><span className="icon"></span> Cross-Platform</h3>
            <p>Works seamlessly on desktop and mobile devices with a consistent experience.</p>
          </div>
          <div className="feature-card">
            <h3><span className="icon"></span> Real-time Sync</h3>
            <p>All your tasks are automatically synchronized across all your devices.</p>
          </div>
          <div className="feature-card">
            <h3><span className="icon"></span> Secure & Private</h3>
            <p>Your data is encrypted and never shared with third parties.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
