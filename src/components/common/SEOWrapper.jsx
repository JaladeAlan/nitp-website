import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function SEOWrapper({ title, description, image, baseUrl = "", children }) {
  const location = useLocation();
  const url = `${baseUrl}${location.pathname}`; 
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title || ""} />
        <meta property="og:description" content={description || ""} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:url" content={url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={title || ""} />
        <meta name="twitter:description" content={description || ""} />
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>
      {children}
    </>
  );
}
