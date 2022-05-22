import React from 'react';
import { Link as GatsbyLink } from 'gatsby'

import {
    Text,
    Code,
    Heading,
    AspectRatio,
    Image,
    Spacer,
    Box,
    Button,
    Link,
    LinkOverlay,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import PageLayout from '../components/PageLayout';
import { graphql } from 'gatsby';
import { LinksPerCategory } from '../components/SidebarContent';
import { Helmet } from 'react-helmet';

const Index = ({ data }: { data: QueryInterface }) => {
    const linksPerCategory = data.allMarkdownRemark.edges.reduce<LinksPerCategory>((prev, curr) => {
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

    return (
        <PageLayout linksPerCategory={linksPerCategory}>
            <Helmet
                title={`Management von kollaborativen Open Source Software Entwicklungs Projekten - E-Learning`}
                defer={false}
            />
            <Heading fontSize="xl">Start</Heading>
            <Box>
                <Text mb={8}>
                    Wähle das erste Thema aus der linken Spalte oder klicke auf den Button um zu
                    starten.
                </Text>
                <Link as={GatsbyLink} to="/grundlagen/open-source">
                    <Button m={0} as="a" colorScheme={'teal'}>
                        Starte mit dem ersten Thema
                    </Button>
                </Link>
                <Spacer mb={148} />
            </Box>
        </PageLayout>
    );
};

export default Index

interface QueryInterface {
    allMarkdownRemark: {
        edges: {
            node: {
                frontmatter: {
                    title: string
                    slug: string
                    category: string
                }
            }
        }[]
    }
}
export const pageQuery = graphql`
  query {
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

