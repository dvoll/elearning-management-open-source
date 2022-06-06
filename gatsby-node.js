exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const blogPostTemplate = require.resolve(`./src/templates/page-template.tsx`);

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        parent {
                            ... on File {
                                id
                                name
                                dir
                            }
                        }
                        frontmatter {
                            slug
                            type
                        }
                    }
                }
            }
        }
        `).then((result) => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }


        return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            if (node.frontmatter.type === 'slide') return;
            const [, category, topic] = node.parent.dir.match(/.*\/(.*)\/(.*)$/);
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
                context: {
                    // additional data can be passed via context
                    slug: node.frontmatter.slug,
                    dir: `${category}/${topic}`,
                    pathRegex: `/${category}\/${topic}/`,
                },
            });
        });
    });
};
