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
                        }
                    }
                }
            }
        }
        `).then((result) => {
        // allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }, sort: { fields: base }) {
        //     edges {
        //         node {
        //             base
        //             childImageSharp {
        //                 gatsbyImageData(width: 200)
        //             }
        //         }
        //     }
        // }
        if (result.errors) {
            return Promise.reject(result.errors);
        }


        return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            // const images = result.data.allFile.edges; //.filter(({node}) => node.base)
            // dir:'/home/dvoll/repositories/elearning-management-open-source/src/content-pages/01 grundlagen'
            // dir:'/home/dvoll/repositories/elearning-management-open-source/src/content-pages/01 grundlagen/oss-strategie'
            const [, category, topic] = node.parent.dir.match(/.*\/(.*)\/(.*)$/);
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
                context: {
                    // additional data can be passed via context
                    slug: node.frontmatter.slug,
                    topic, 
                },
            });
        });
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const parent = getNode(node.parent);
        let collection = parent.sourceInstanceName;
        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });
    }
};
