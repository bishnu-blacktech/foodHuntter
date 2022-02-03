const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
module.exports = withPWA({
  images: {
    domains: [
      'https://restrox-full-online.herokuapp.com',
      'http://192.168.10.101:5000',
      '192.168.10.101',
      'http://192.168.10.67:5000',
      '192.168.10.67',
      'restroxbackend.swadeshnepali.com',
      'test-backend-rczos.ondigitalocean.app',
      'restrox-fullonline-backend-ud5kt.ondigitalocean.app',
      'restroxfille.sgp1.digitaloceanspaces.com',
    ],
  },
  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
