import React from "react";
import { Container } from "react-bootstrap";

function BestsellersSection() {
  return (
    <section className="top-picks-section">
      <Container fluid className="px-0">
        {/* Header Block */}
        <div className="top-picks-header text-center">
          <h2 className="top-picks-title">Bestsellers</h2>
          <p className="top-picks-subtitle">
            Discover this season’s favorites and refresh your style with looks you’ll wear on repeat.
          </p>
        </div>

        {/* Featured Image Banner */}
        <div className="top-picks-banner">
          <img
            src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw08fca1dc/0.0-0.0-0.0-0.0-august-26-best-seller-Secondary-Banner.jpg"
            alt="Bestsellers Featured Style"
            className="top-picks-img"
          />
        </div>
      </Container>
    </section>
  );
}

export default BestsellersSection;