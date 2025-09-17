import './Home.scss'
import React from 'react'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Your task manager</h1>
          <p className="hero__subtitle">
            Fast and easy way to manage your tasks.
          </p>
          <div className="hero__buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features__title">Category</h2>
        <div className="features__grid">
          <div className="feature-card">
            <h3>Title</h3>
            <p>Description</p>
          </div>
          <div className="feature-card">
            <h3>Title</h3>
            <p>Description</p>
          </div>
          <div className="feature-card">
            <h3>Title</h3>
            <p>Description</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
