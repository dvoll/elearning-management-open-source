import React from 'react';
import { graphql } from 'gatsby';
import { AspectRatio, Box, Heading, Text } from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';
import { Helmet } from 'react-helmet';
import { useProcessor } from '../components/useRehypeProcessor';

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}: {
    data: PageQueryData;
}): JSX.Element {
    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;
    const linksPerCategory = data.allMarkdownRemark.edges.reduce<{
        [key: string]: { title: string; slug: string }[];
    }>((prev, curr) => {
        const cat = curr.node.frontmatter.category;
        if (!prev[cat]) {
            prev[cat] = [];
        }
        prev[cat].push({
            title: curr.node.frontmatter.title,
            slug: curr.node.frontmatter.slug,
        });
        return prev;
    }, {});

    const processedBody = useProcessor(html);

    return (
        <>
            <Helmet title={`${frontmatter.title} - E-Learning`} defer={false} />
            <PageLayout linksPerCategory={linksPerCategory}>
                <Text mb={-5} fontSize={'sm'}>
                    {frontmatter.category}
                </Text>
                <Heading fontSize="xl">{frontmatter.title}</Heading>
                <Box>{processedBody}</Box>
                <AspectRatio maxW="800px" ratio={16 / 9}>
                    <Box backgroundColor={'gray.500'}>
                        <Text>Präsentation/Video</Text>
                    </Box>
                </AspectRatio>
            </PageLayout>
        </>
    );
}

interface PageQueryFrontmatter {
    slug: string;
    title: string;
    category: string;
}

interface PageQueryData {
    markdownRemark: {
        html: string;
        frontmatter: PageQueryFrontmatter;
    };
    allMarkdownRemark: {
        edges: {
            node: {
                fields: {
                    slug: string;
                };
                frontmatter: PageQueryFrontmatter;
            };
        }[];
    };
}

export const pageQuery = graphql`
    query ($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                slug
                title
                category
            }
        }
        allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___sorting], order: ASC }) {
            edges {
                node {
                    frontmatter {
                        title
                        category
                        slug
                    }
                }
            }
        }
    }
`;
