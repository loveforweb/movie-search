const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withOptimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css');

require('dotenv').config();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
module.exports = withBundleAnalyzer(
    withOptimizedImages(
        withCSS(
            withSass({
                cssModules: true,
                env: {
                    API_KEY: process.env.API_KEY
                }
            })
        )
    )
);
