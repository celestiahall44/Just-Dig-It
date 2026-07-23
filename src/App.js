import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroLogoImage from './assets/NOBGLogo.png';
import heroBackgroundImage from './assets/Hero.png';
import sitePrepImage from './assets/SitePrep.png';
import septicSystemImage from './assets/SepticSystem.png';
import drivewayImage from './assets/Driveway.png';
import rockPathwayImage from './assets/RockPathway.png';
import rockWallImage from './assets/RockWall.png';
import landscapingPartnerImage from './assets/LandscapingPartner.png';
import ownerPhotoImage from './assets/BioPhoto.jpg';
import mountainsImage from './assets/Mountains.png';
import justDigItTextLogoImage from './assets/JustDigItTextLogo.png';
import benchImage from './assets/Bench.jpeg';
import landingPadImage from './assets/LandingPad.jpg';
import meterImage from './assets/Meter.jpeg';
import septicProjectImage from './assets/Septic.jpeg';
import wallProjectImage from './assets/Wall.jpeg';
import drivewayProjectImage from './assets/Driveway.jpg';
import foundationProjectImage from './assets/Foundation.jpg';
import septicProjectImageTwo from './assets/Septic2.jpeg';
import septicProjectImageThree from './assets/Septic3.jpeg';

function App() {
  const EMAILJS_SERVICE_ID = 'service_maxm47m';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_wtxo4hk';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'PunT1yUjK2-xsBH1z';
  const reviews = [
    {
      quote:
        `"I have hired Alan’s company on numerous occasions to assist with earthworks projects. He is one of the friendliest, kindest and most patient contractors I've had the pleasure of working with. Typically, he spends time understanding what I need as a customer and will talk through and walk through the project. From there, he has always been timely in responding with a professional quote and explanation of next steps. One of the most important qualities as a business owner is communication. Alan stays in close touch with his customers to provide updates, get input and set expectations. This is something I value greatly. In terms of the quality of his work, it is evident that Alan knows excavation, ground control, survey, and safe operations. I've had quality work output from his company every time I have hired them. I look forward to many more years in partnering as my projects arise."`,
      name: 'Rhonda Z.',
    },
    {
      quote:
        '"I highly recommend Just Dig It Excavating. Alan Eastman was responsive, professional, and efficient from start to finish. Communication was excellent, he showed up when he said he would, and the work was completed quickly and to a high standard. It’s refreshing to work with a contractor who is dependable and takes pride in doing the job right. I wouldn’t hesitate to use Just Dig It Excavating again or recommend Alan to anyone needing excavation work."',
      name: 'Ronald H.',
    },
    /*
    {
      quote: 'ON THE WAY',
      name: 'Joslyn S.',
    },
    {
      quote: 'ON THE WAY',
      name: 'Nate N.',
    },
    */
    {
      quote:
        '"Working with Alan was an amazing experience. From the very beginning, he took the time to understand exactly what I wanted. He was professional, honest, and always willing to answer my questions or offer suggestions that made the project even better. He truly went above and beyond, paying attention to the little details and making sure everything was done the right way, not just the easy way. It\'s hard to find someone who genuinely cares about their work and their customers the way Alan does. I would recommend him to anyone without hesitation and will absolutely be calling him again for future projects."',
      name: 'Celestia H.',
    },
  ];
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewCardHeight, setReviewCardHeight] = useState(null);
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState(0);
  const [previousProjectImageIndex, setPreviousProjectImageIndex] = useState(0);
  const [isProjectFading, setIsProjectFading] = useState(false);
  const [isSendingContact, setIsSendingContact] = useState(false);
  const [contactSubmitMessage, setContactSubmitMessage] = useState('');
  const reviewMeasureRefs = useRef([]);
  const PROJECT_ROTATE_MS = 5200;
  const PROJECT_FADE_MS = 5000;
  const projectImages = [
    benchImage,
    landingPadImage,
    meterImage,
    septicProjectImage,
    wallProjectImage,
    drivewayProjectImage,
    foundationProjectImage,
    septicProjectImageTwo,
    septicProjectImageThree,
  ];

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      offset: 80,
    });
  }, []);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveProjectImageIndex((currentIndex) =>
        {
          const nextIndex = currentIndex === projectImages.length - 1 ? 0 : currentIndex + 1;
          setPreviousProjectImageIndex(currentIndex);
          setIsProjectFading(true);
          return nextIndex;
        }
      );
    }, PROJECT_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [projectImages.length, PROJECT_ROTATE_MS]);

  useEffect(() => {
    if (!isProjectFading) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsProjectFading(false);
    }, PROJECT_FADE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isProjectFading, PROJECT_FADE_MS]);

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

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setContactSubmitMessage('Please fill in all required information.');
      return;
    }

    if (!EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setContactSubmitMessage('Email is not configured yet. Add EmailJS template ID and public key.');
      return;
    }

    setIsSendingContact(true);
    setContactSubmitMessage('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      form.reset();
      setContactSubmitMessage('Message Sent!');
    } catch (error) {
      const errorText = error?.text || error?.message || 'Unknown EmailJS error';
      console.error('EmailJS send failed:', error);
      setContactSubmitMessage(`Unable to send request: ${errorText}`);
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Back to top">
          <img src={justDigItTextLogoImage} alt="Just Dig It text logo" />
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="call-now" href="tel:+14062508477">Call Now: 1-406-250-8477</a>
      </header>

      <main>
        <section
          className="hero"
          id="top"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.36), rgba(10, 12, 14, 0.36)), url(${heroBackgroundImage})`,
          }}
        >
          <div className="hero-content">
            <h1>Dirt Work Services You Can Count On</h1>
            <img className="hero-logo" src={heroLogoImage} alt="Just Dig It logo" />
            <p className="eyebrow">Licensed. Insured. Local.</p>
            
            <p>
              From first cut to final grade, capable and confident in excavation, site preparation,
              and septic system installs with clean execution and tight timelines.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">Get a Free Estimate</a>
              <a className="btn btn-secondary" href="#services">Explore Services</a>
            </div>
          </div>
        </section>

        <section className="about" id="about" data-aos="fade-up">
          <div>
            <p className="eyebrow">Why Choose Us</p>
            <h2>
              Clear Communication.
              <br />
              Solid Results.
            </h2>
            <p>
              We partner with homeowners, builders, and developers who need dependable
              heavy civil work and no excuses. Every project gets practical planning,
              transparent scheduling. Ready to dig in and deliver results.
            </p>
          </div>
          <ul>
            <li>Fully insured and bondable upon request</li>
            <li>Quality equipment paired with skilled workmanship</li>
            <li>Permit and inspection coordination support</li>
            <li>Detailed bids and realistic timelines</li>
          </ul>
        </section>

        <section className="quality-statement" aria-label="Quality statement" data-aos="zoom-in">
          <p>Integrity Below Ground. Excellence Above.</p>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <p>What We Do</p>
            <h2>Core Services</h2>
          </div>
          <div className="service-grid">
            <article
              className="service-card-site-prep"
              data-aos="flip-up"
              data-aos-delay="0"
              data-aos-duration="1000"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${sitePrepImage})`,
              }}
            >
              <h3>Excavation & Site Prep</h3>
              <p>
                Prepare your property for construction with reliable site preparation and excavation services. We handle land clearing, grading, trenching, foundation excavation, and site leveling with precision and efficiency, ensuring your project begins on stable, properly prepared ground.
              </p>
            </article>
            <article
              className="service-card-septic"
              data-aos="flip-up"
              data-aos-delay="150"
              data-aos-duration="1000"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${septicSystemImage})`,
              }}
            >
              <h3>Septic System</h3>
              <p>
                In Lake County, from new septic system installation to excavation for repairs and replacements, we provide dependable services that meet project requirements while ensuring your property is prepared for long-lasting performance.
              </p>
            </article>
            <article
              className="service-card-driveway"
              data-aos="flip-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.66), rgba(10, 12, 14, 0.66)), url(${drivewayImage})`,
              }}
            >
              <h3>Driveways</h3>
              <p>
                Create a durable, well-built driveway with professional excavation, grading, and gravel installation. We focus on proper drainage and a solid foundation to deliver a driveway that stands up to everyday use.
              </p>
            </article>
            <article
              className="service-card-rock-wall"
              data-aos="flip-up"
              data-aos-delay="450"
              data-aos-duration="1000"
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
              data-aos="flip-up"
              data-aos-delay="600"
              data-aos-duration="1000"
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
              data-aos="flip-up"
              data-aos-delay="750"
              data-aos-duration="1000"
              style={{
                backgroundImage: `url(${landscapingPartnerImage})`,
              }}
            >
              <h3>Landscaping, Tree Removal & Lot Clean Up</h3>
              <p>
                We partner with landscaping firms and tree removal companies to provide reliable excavation, grading, lot cleanup, and site preparation services. Whether preparing land for new landscaping, clearing debris after tree removal, or supporting large outdoor projects, we help ensure every job is completed efficiently and ready for the next phase.
              </p>
            </article>
          </div>
        </section>

        <section className="projects" id="projects" data-aos="fade-up">
          <div className="section-head">
            <p>Recent Work</p>
            <h2>Built On Precision</h2>
          </div>
          <div className="project-list">
            <article className="project-photo-card">
              {isProjectFading && (
                <img
                  key={`prev-${previousProjectImageIndex}`}
                  src={projectImages[previousProjectImageIndex]}
                  alt={`Project work photo ${previousProjectImageIndex + 1}`}
                  className="project-photo project-photo-previous"
                />
              )}
              <img
                key={`current-${activeProjectImageIndex}`}
                src={projectImages[activeProjectImageIndex]}
                alt={`Project work photo ${activeProjectImageIndex + 1}`}
                className={`project-photo project-photo-current${isProjectFading ? ' is-fading' : ''}`}
              />
            </article>
          </div>
        </section>

        <section className="quality-statement" aria-label="Quality statement" data-aos="zoom-in">
          <p>No Shortcuts. No Compromises. Just Quality Work.</p>
        </section>

        <section className="reviews" id="reviews" data-aos="fade-up">
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
                  <span>★★★★★</span>
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
                <span>★★★★★</span>
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

        <section className="owner-bio" id="owner" data-aos="fade-up">
          <img
            className="owner-photo"
            src={ownerPhotoImage}
            alt="Owner Alan Eastman on-site"
          />
          <div className="owner-copy">
            <p className="eyebrow">Meet The Owner</p>
            <h2>Alan Eastman</h2>
            <p>
              Raised in the dirt and backed by decades of hands-on experience, Alan has spent most of his life around excavation equipment and construction sites. As the owner and operator of Just Dig It, with the unwavering support of his wife, Amanda, he combines a lifetime of practical knowledge with a commitment to integrity, precision, and quality workmanship. As a local, family-oriented business, every client becomes part of the Just Dig It family through honest communication, dependable service, and personal attention from the first site visit to the final grading. Their goal is simple: do the job right and build relationships that last long after the project is complete.
            </p>
          </div>
        </section>

        <section
          className="contact"
          id="contact"
          data-aos="fade-up"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 12, 14, 0.78), rgba(10, 12, 14, 0.78)), url(${mountainsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <p className="eyebrow">Start Your Project</p>
            <h2>Request a Free Site Visit</h2>
            <p>
              Tell us what you are building and where. Together we will review your scope,
              discuss constraints, and provide you with a straightforward estimate.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required />

            <label htmlFor="details">Project Details</label>
            <textarea
              id="details"
              name="details"
              rows="4"
              placeholder="Excavation, site prep, or septic work needed..."
              required
            />

            <button type="submit" className="btn btn-primary" disabled={isSendingContact}>
              {isSendingContact ? 'Sending...' : 'Send Request'}
            </button>
            {contactSubmitMessage && <p className="contact-submit-message">{contactSubmitMessage}</p>}
          </form>
        </section>
      </main>

      <footer>
        <img
          className="footer-logo-left"
          src={heroLogoImage}
          alt="Just Dig It logo"
        />
        <img
          className="footer-logo"
          src={justDigItTextLogoImage}
          alt="Just Dig It text logo"
        />
        <p>Just Dig It, LLC.</p>
        <p>Serving local residential and commercial clients.</p>
        <p>Copyright 2026</p>
      </footer>
    </div>
  );
}

export default App;
