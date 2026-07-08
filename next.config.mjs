/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: "/affiliate",
        destination: "/referral",
        permanent: true,
      },
      {
        source: "/affiliate-portal",
        destination: "/referral-portal",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/send-booking.php",
        destination: "/booking",
        permanent: true,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/service.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/start.html",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/startup-consultancy.html",
        destination: "/services/startup-consultancy",
        permanent: true,
      },
      {
        source: "/business-plan.html",
        destination: "/services/business-plan",
        permanent: true,
      },
      {
        source: "/financial-forecasting.html",
        destination: "/services/financial-forecasting",
        permanent: true,
      },
      {
        source: "/branding.html",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/web-app-development.html",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/social-media-marketing.html",
        destination: "/services/social-media-marketing",
        permanent: true,
      },
      {
        source: "/service/website-design.html",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/service/art-direction.html",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/project.html",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/product-outsourcing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/work/blooming-educator.html",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/work/blooming-educator-2.html",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/insight-business-plan-vs-forecast",
        destination: "/insights/insight-business-plan-vs-forecast",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
