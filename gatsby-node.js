exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const blogPostTemplate = require.resolve(`./src/templates/page-template.tsx`);

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        frontmatter {
                            slug
                            preview
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
            if (node.frontmatter.preview) return;
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
                context: {
                    // additional data can be passed via context
                    slug: node.frontmatter.slug,
                },
            });
        });
    });
};
