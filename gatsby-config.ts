import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
    pathPrefix: `/elearning/data/FH-Bielefeld/lm_data/lm_1335436`,
    siteMetadata: {
        title: `Management von kollaborativen Open Source Software Entwicklungs Projekten`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        `gatsby-transformer-remark`,
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content-pages',
                path: './src/content-pages/',
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: '@chakra-ui/gatsby-plugin',
            options: {
                /**
                 * @property {boolean} [resetCSS=true]
                 * if false, this plugin will not use `<CSSReset />
                 */
                resetCSS: true,
                /**
                 * @property {boolean} [isUsingColorMode=true]
                 * if false, this plugin will not use <ColorModeProvider />
                 */
                isUsingColorMode: true,
            },
        },
    ],
};

export default config;
