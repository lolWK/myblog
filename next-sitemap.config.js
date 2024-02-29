/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/edit', '/server-sitemap-index.xml', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap-index.xml`,
    ],
  },
};
