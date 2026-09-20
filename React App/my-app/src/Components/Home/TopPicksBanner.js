import React from "react";
import { Container } from "react-bootstrap";

function TopPicksBanner() {
  return (
    <section className="top-picks-section">
      <Container fluid className="px-0">
        {/* Header Block */}
        <div className="top-picks-header text-center">
          <h2 className="top-picks-title">Top Picks for You</h2>
          <p className="top-picks-subtitle">
            We've handpicked the styles we know you'll love. Explore what's trending now.
          </p>
        </div>

        {/* Featured Image Banner */}
        <div className="top-picks-banner">
          <img
            src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwb536c761/images/0.0.0-08-03-2026-Secondary-Banner.jpg"
            alt="Top Picks Featured Style"
            className="top-picks-img"
          />
        </div>
      </Container>
    </section>
  );
}

export default TopPicksBanner;