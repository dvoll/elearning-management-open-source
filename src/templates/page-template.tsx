import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AspectRatio,
    Box,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';
import { Helmet } from 'react-helmet';
import { useProcessor } from '../components/useRehypeProcessor';
import QuizComponent from '../components/quiz/QuizComponent';

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

    console.log('frontmatter', frontmatter);
    console.log('imageData', data.allFile);

    const { questions, title, category } = frontmatter;

    return (
        <>
            <Helmet title={`${frontmatter.title} - E-Learning`} defer={false} />
            <PageLayout linksPerCategory={linksPerCategory}>
                <Text mb={-5} fontSize={'sm'}>
                    {frontmatter.category}
                </Text>
                <Heading fontSize="xl">{frontmatter.title}</Heading>
                <Box>
                    <AspectRatio
                        maxW="56rem"
                        ratio={16 / 9}
                        paddingBottom="24px"
                        filter={useColorModeValue('', 'invert(.8)')}
                    >
                        <Box>
                            {frontmatter.presentation ? (
                                <iframe
                                    style={{ width: '100%', height: '100%' }}
                                    src={frontmatter.presentation}
                                    width="921px"
                                    height="600px"
                                    frameBorder="0"
                                >
                                    Dies ist ein eingebettetes{' '}
                                    <a target="_blank" href="https://office.com">
                                        Microsoft Office
                                    </a>
                                    -Dokument, unterstützt von{' '}
                                    <a target="_blank" href="https://office.com/webapps">
                                        Office
                                    </a>
                                    .
                                </iframe>
                            ) : (
                                <Text>Keine Präsentation vorhanden</Text>
                            )}
                        </Box>
                    </AspectRatio>
                </Box>

                <Accordion allowToggle>
                    {processedBody && (
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Transkript
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box>{processedBody}</Box>
                            </AccordionPanel>
                        </AccordionItem>
                    )}

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
                {questions && (
                    <QuizComponent
                        title="Quiz"
                        questions={questions}
                        category={category}
                        topic={title}
                    />
                )}
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
    allFile: {
        edges: any;
        // node {
        //     base
        //     childImageSharp {
        //         fluid {
        //             ...GatsbyImageSharpFluid
        //         }
        // }
    };
}

export const pageQuery = graphql`
    query ($slug: String!, $topic: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
        allFile(
            filter: {
                extension: { regex: "/(jpg)|(png)|(jpeg)/" }
                relativeDirectory: { eq: "oss-strategie" }
            }
            sort: { fields: base }
        ) {
            edges {
                node {
                    base
                    childImageSharp {
                        gatsbyImageData(width: 200)
                    }
                }
            }
        }
    }
`;
