import React from "react"
import { graphql } from "gatsby"
import { AspectRatio, Box, Heading, Text } from "@chakra-ui/react"
import PageLayout from "../components/PageLayout"
import { Helmet } from "react-helmet";

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}): JSX.Element {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark
    const linksPerCategory = data.allMarkdownRemark.edges.reduce((prev, curr) => {
        const cat = curr.node.frontmatter.category;
        if (!prev[cat]) {
            prev[cat] = [];
        }
        prev[cat].push({
            title: curr.node.frontmatter.title,
            slug: curr.node.frontmatter.slug,
        })
        return prev;
    }, {});
    return (
      <>
        <Helmet title={`${frontmatter.title} - E-Learning`} defer={false} />
        <PageLayout linksPerCategory={linksPerCategory}>
            <Text mb={-5} fontSize={'sm'}>{frontmatter.category}</Text>
            <Heading fontSize="xl">{frontmatter.title}</Heading>
            <Box dangerouslySetInnerHTML={{ __html: html }} />
            <AspectRatio maxW='800px' ratio={16 / 9}>
                <Box backgroundColor={'gray.500'}>
                    <Text>Präsentation/Video</Text>
                </Box>
            </AspectRatio>
        </PageLayout>
      </>
    )
}

interface PageQueryData {
    allMarkdownRemark: {
        edges: {
            node: {
                //   excerpt: string
                fields: {
                    slug: string
                }
                frontmatter: {
                    // date: string
                    title: string
                }
            }
        }[]
    }
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        category
      }
    }
    allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___sorting], order: ASC }
      ) {
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
`
