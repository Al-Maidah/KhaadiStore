import React from 'react';
import CollectionListing from '../Components/Product/CollectionListing';

export default function Fragrances() {
  return (
    <CollectionListing
      collection="fragrances"
      title="Fragrances"
      subtitle="Signature scents for everyday and occasion"
      crumb="Fragrances"
      pageTitle="Fragrances | Signature Scents"
      bannerStyle={{ background: '#f3ece8' }}
    />
  );
}
