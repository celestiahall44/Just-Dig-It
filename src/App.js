import { useEffect, useRef, useState } from 'react';
import sitePrepImage from './assets/SitePrep.png';
import rockPathwayImage from './assets/RockPathway.png';
import rockWallImage from './assets/RockWall.jpg';
import landscapingPartnerImage from './assets/LanscapingPartner.jpg';

function App() {
  const reviews = [
    {
      quote:
        "I have hired Alan’s company on numerous occasions to assist with earthworks projects. He is one of the friendliest, kindest and most patient contractors I've had the pleasure of working with. Typically, he spends time understanding what I need as a customer and will talk through and walk through the project. From there, he has always been timely in responding with a professional quote and explanation of next steps. One of the most important qualities as a business owner is communication. Alan stays in close touch with his customers to provide updates, get input and set expectations. This is something I value greatly. In terms of the quality of his work, it is evident that Alan knows excavation, ground control, survey, and safe operations. I've had quality work output from his company every time I have hired them. I look forward to many more years in partnering as my projects arise.",
      name: 'Rhonda Z.',
    },
    {
      quote:
        'I highly recommend Just Dig It Excavating. Alan Eastman was responsive, professional, and efficient from start to finish. Communication was excellent, he showed up when he said he would, and the work was completed quickly and to a high standard. It’s refreshing to work with a contractor who is dependable and takes pride in doing the job right. I wouldn’t hesitate to use Just Dig It Excavating again or recommend Alan to anyone needing excavation work.',
      name: 'Ronald H.',
    },
    {
      quote: 'ON THE WAY',
      name: 'Joslyn S.',
    },
    {
      quote: 'ON THE WAY',
      name: 'Nate N.',
    },
    {
      quote: 'ON THE WAY',
      name: 'Celestia H.',
    },
  ];
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewCardHeight, setReviewCardHeight] = useState(null);
  const reviewMeasureRefs = useRef([]);

  useEffect(() => {
    const updateReviewCardHeight = () => {
      const heights = reviewMeasureRefs.current
        .filter(Boolean)
        .map((element) => element.offsetHeight);

      if (heights.length > 0) {
        setReviewCardHeight(Math.max(...heights));
      }
    };

    updateReviewCardHeight();
    window.addEventListener('resize', updateReviewCardHeight);

    return () => window.removeEventListener('resize', updateReviewCardHeight);
  }, []);

  const showPreviousReview = () => {
    setActiveReviewIndex((currentIndex) =>
      currentIndex === 0 ? reviews.length - 1 : currentIndex - 1
    );
  };

  const showNextReview = () => {
    setActiveReviewIndex((currentIndex) =>
      currentIndex === reviews.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand">JUST DIG IT</div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="call-now" href="tel:+15551234567">Call Now</a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <p className="eyebrow">Licensed. Bonded. Local.</p>
            <h1>Dirt Work Services You Can Count On</h1>
            <p>
              From first cut to final grade, we handle excavation, site preparation,
              and septic system installs with clean execution and tight timelines.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">Get a Free Estimate</a>
              <a className="btn btn-secondary" href="#services">Explore Services</a>
            </div>
            <ul className="hero-stats">
              <li><strong>18+</strong><span>Years Experience</span></li>
              <li><strong>600+</strong><span>Projects Completed</span></li>
              <li><strong>24hr</strong><span>Emergency Response</span></li>
            </ul>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <p>What We Do</p>
            <h2>Core Services</h2>
          </div>
          <div className="service-grid">
            <article
              className="service-card-site-prep"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${sitePrepImage})`,
              }}
            >
              <h3>Excavation & Site Prep</h3>
              <p>
                Prepare your property for construction with reliable site preparation and excavation services. We handle land clearing, grading, trenching, foundation excavation, and site leveling with precision and efficiency, ensuring your project begins on stable, properly prepared ground.
              </p>
            </article>
            <article>
              <h3>Septic System</h3>
              <p>
                In Lake County, from new septic system installation to excavation for repairs and replacements, we provide dependable services that meet project requirements while ensuring your property is prepared for long-lasting performance.
              </p>
            </article>
            <article>
              <h3>Driveways</h3>
              <p>
                Create a durable, well-built driveway with professional excavation, grading, and gravel installation. We focus on proper drainage and a solid foundation to deliver a driveway that stands up to everyday use.
              </p>
            </article>
            <article
              className="service-card-rock-wall"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${rockWallImage})`,
              }}
            >
              <h3>Rock & Retaining Walls</h3>
              <p>
                Enhance your property's function and appearance with custom rock and retaining walls. We build sturdy, attractive walls that help control erosion, improve drainage, and add lasting value to your landscape.
              </p>
            </article>
            <article
              className="service-card-rock-pathway"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${rockPathwayImage})`,
              }}
            >
              <h3>Rock Pathways</h3>
              <p>
                Add beauty and accessibility to your outdoor spaces with professionally installed rock pathways. We create durable, low-maintenance walkways that blend naturally with your property's landscape.
              </p>
            </article>
            <article
              className="service-card-landscaping"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${landscapingPartnerImage})`,
              }}
            >
              <h3>Landscaping, Tree Removal & Lot Clean Up</h3>
              <p>
                We partner with landscaping firms and tree removal companies to provide reliable excavation, grading, lot cleanup, and site preparation services. Whether preparing land for new landscaping, clearing debris after tree removal, or supporting large outdoor projects, we help ensure every job is completed efficiently and ready for the next phase.
              </p>
            </article>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-head">
            <p>Recent Work</p>
            <h2>Built On Precision</h2>
          </div>
          <div className="project-list">
            <div>
              <h3>Hillside Home Cut-In</h3>
              <p>
                Complete cut, retaining prep, and drainage trenching for a steep access build.
              </p>
            </div>
            <div>
              <h3>Commercial Pad & Utilities</h3>
              <p>
                Multi-phase grading and underground utility routing completed ahead of schedule.
              </p>
            </div>
            <div>
              <h3>Rural Septic Replacement</h3>
              <p>
                Full tank swap and drain field redesign with minimal disruption to property use.
              </p>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="section-head">
            <p>Client Feedback</p>
            <h2>Reviews From The Field</h2>
          </div>
          <div className="review-measurement" aria-hidden="true">
            {reviews.map((review, index) => (
              <article
                key={review.name}
                className="review-card"
                ref={(element) => {
                  reviewMeasureRefs.current[index] = element;
                }}
              >
                <p className="review-quote">{review.quote}</p>
                <div className="review-meta">
                  <strong>{review.name}</strong>
                  <span>
                    Review {index + 1} of {reviews.length}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div className="review-carousel" aria-label="Customer reviews carousel">
            <button
              type="button"
              className="review-arrow"
              onClick={showPreviousReview}
              aria-label="Previous review"
            >
              &lt;
            </button>
            <article
              className="review-card"
              aria-live="polite"
              style={reviewCardHeight ? { minHeight: `${reviewCardHeight}px` } : undefined}
            >
              <p className="review-quote">{reviews[activeReviewIndex].quote}</p>
              <div className="review-meta">
                <strong>{reviews[activeReviewIndex].name}</strong>
                <span>
                  Review {activeReviewIndex + 1} of {reviews.length}
                </span>
              </div>
            </article>
            <button
              type="button"
              className="review-arrow"
              onClick={showNextReview}
              aria-label="Next review"
            >
              &gt;
            </button>
          </div>
        </section>

        <section className="about" id="about">
          <div>
            <p className="eyebrow">Why Clients Choose Us</p>
            <h2>Clear Communication. Clean Worksites. Solid Results.</h2>
            <p>
              We partner with homeowners, builders, and developers who need dependable
              heavy civil work and no excuses. Every project gets practical planning,
              transparent scheduling, and crews that show up ready to move dirt.
            </p>
          </div>
          <ul>
            <li>Fully insured crews and operators</li>
            <li>Modern equipment with GPS grading capabilities</li>
            <li>Permit and inspection coordination support</li>
            <li>Detailed bids and realistic timelines</li>
          </ul>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="eyebrow">Start Your Project</p>
            <h2>Request a Free Site Visit</h2>
            <p>
              Tell us what you are building and where. We will review your scope,
              discuss constraints, and provide a straightforward estimate.
            </p>
          </div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" />

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />

            <label htmlFor="details">Project Details</label>
            <textarea
              id="details"
              name="details"
              rows="4"
              placeholder="Excavation, site prep, or septic work needed..."
            />

            <button type="submit" className="btn btn-primary">Send Request</button>
          </form>
        </section>
      </main>

      <footer>
        <p>Just Dig It Excavation and Septic</p>
        <p>Serving local residential and commercial clients.</p>
      </footer>
    </div>
  );
}

export default App;
