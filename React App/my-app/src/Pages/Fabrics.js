import React from 'react';
import CollectionListing from '../Components/Product/CollectionListing';

export default function Fabrics() {
  return (
    <CollectionListing
      collection="fabrics"
      title="Fabrics"
      subtitle="Unstitched textiles & materials for every season"
      crumb="Fabrics"
      pageTitle="Fabrics | Textiles & Materials"
      bannerStyle={{ background: '#efe8df' }}
    />
  );
}
