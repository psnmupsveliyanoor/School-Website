import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description = "Welcome to our school — a centre of excellence in education, culture, and sports in Trivandrum, Kerala.", 
  name = "P.S.N.M U.P. School",
  type = "website" 
}) {
  const finalTitle = title ? `${title} | P.S.N.M U.P. School` : "P.S.N.M U.P. School — Excellence in Education";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph tags for social media */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
