import React from 'react';
import { graphql } from 'gatsby';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';
import { Helmet } from 'react-helmet';
import { useProcessor } from '../components/useRehypeProcessor';
import QuizComponent from '../components/quiz/QuizComponent';
import { getImage } from 'gatsby-plugin-image';
import SlideSwiper from '../components/SlideSwiper';
import PresentationEmbedLegacy from '../components/PresentationEmbedLegacy';

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}: {
    data: PageQueryData;
}): JSX.Element {
    const { pageData } = data; // data.markdownRemark holds our post data
    const { frontmatter, html } = pageData;
    const linksPerCategory = data.navigation.edges.reduce<{
        [key: string]: { title: string; slug: string }[];
    }>((prev, curr) => {
        if (curr.node.frontmatter.preview) return prev;
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

    let processedBody = null;

    if (html) {
        processedBody = useProcessor(html);
    }

    const images = data.slideImages.edges.map((edge) => ({
        ...getImage(edge.node as any),
        base: edge.node.base,
    }));

    const { questions, title, category } = frontmatter;

    return (
        <>
            <Helmet title={`${frontmatter.title} - E-Learning`} defer={false} />
            <PageLayout linksPerCategory={linksPerCategory}>
                <Text mb={-5} fontSize={'sm'}>
                    {frontmatter.category}
                </Text>
                <Heading as="h1" fontSize="2xl">
                    {frontmatter.title}
                </Heading>
                <Box>
                    {images.length > 0 ? (
                        <SlideSwiper
                            images={images}
                            texts={data.slideHtml.edges.map((slide) => slide.node.html)}
                        />
                    ) : (
                        <PresentationEmbedLegacy presentationUrl={frontmatter.presentation} />
                    )}
                </Box>
                {questions && (
                    <QuizComponent
                        title="Quiz"
                        questions={questions}
                        category={category}
                        topic={title}
                    />
                )}
                <Box>{processedBody}</Box>
                <Accordion allowToggle>
                    {frontmatter.sources && (
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Quellen
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {frontmatter.sources?.map((source) => (
                                    <Text key={source.title}>{source.title}</Text>
                                ))}
                            </AccordionPanel>
                        </AccordionItem>
                    )}
                </Accordion>
            </PageLayout>
        </>
    );
}

interface FrontmatterSource {
    title: string;
    url?: string;
}

export interface QuizQuestion {
    question: string;
    options: { text: string }[];
    correct: number[];
}
interface PageQueryFrontmatter {
    slug: string;
    title: string;
    category: string;
    sources: FrontmatterSource[] | null;
    presentation?: string | null;
    preview?: boolean | null;
    questions: QuizQuestion[];
}

interface PageQueryData {
    pageData: {
        html: string;
        frontmatter: PageQueryFrontmatter;
    };
    navigation: {
        edges: {
            node: {
                fields: {
                    slug: string;
                };
                frontmatter: PageQueryFrontmatter;
            };
        }[];
    };
    slideHtml: {
        edges: {
            node: {
                html: string;
            };
        }[];
    };
    slideImages: {
        edges: {
            node: {
                base: string;
                childImageSharp: any;
            };
        }[];
    };
}

export const pageQuery = graphql`
    query ($slug: String!, $dir: String!, $pathRegex: String!) {
        pageData: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                slug
                title
                category
                sources {
                    title
                    url
                }
                presentation
                questions {
                    question
                    options {
                        text
                    }
                    correct
                }
            }
        }
        navigation: allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___sorting], order: ASC }
            filter: { frontmatter: { type: { ne: "slide" } } }
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
        slideHtml: allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___sorting], order: ASC }
            filter: {
                frontmatter: { type: { eq: "slide" } }
                fileAbsolutePath: { regex: $pathRegex }
            }
        ) {
            edges {
                node {
                    html
                }
            }
        }
        slideImages: allFile(
            filter: {
                extension: { regex: "/(jpg)|(png)|(jpeg)/" }
                relativeDirectory: { eq: $dir }
            }
            sort: { fields: base }
        ) {
            edges {
                node {
                    base
                    childImageSharp {
                        gatsbyImageData(width: 896)
                    }
                }
            }
        }
    }
`;
