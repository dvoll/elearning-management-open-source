import { ArrowRightIcon, ChevronLeftIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import QuizOption, { QuizOptionProps } from './QuizOption';

export interface QuizBoxQuestion {}

interface QuizBoxProps {
    title: string;
    question: string;
    questionSubtitle: string;
    questionLength: number;
    currentQuestionIndex: number;
    correct: number[];
    onAwnswerSubmit: (index: number) => void;
    onQuestionSkip: () => void;
    onLastQuestionRequest?: () => void;
    showSolution?: boolean;
    showSkippedSolution?: boolean;
    options: string[];
}

const QuizBox = ({
    title,
    question,
    questionSubtitle,
    questionLength,
    currentQuestionIndex,
    correct,
    onAwnswerSubmit,
    onQuestionSkip,
    onLastQuestionRequest,
    showSolution,
    showSkippedSolution,
    options,
}: QuizBoxProps) => {
    const [selected, setSelected] = useState([1, 4]);

    const foreground = useColorModeValue('gray.900', 'white');
    const background = 'transparent';
    const accent = 'teal';

    return (
        <Box>
            <Heading as="h2" fontSize="lg" mb="4">
                {title}
            </Heading>
            <Grid
                paddingInline={3}
                paddingBlock={2}
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                borderRadius={12}
                rowGap={[2, 6]}
                columnGap={[2, 4]}
                gridTemplate={{
                    base: `
                        "header header" auto
                        "main main" auto 
                        "info info" auto 
                        "action action" 1fr 
                        "footleft footright" auto
                        "footer footer" auto / 1fr 1fr
                    `,
                    lg: `
                        "header header header header header" auto
                        "main main main main main" 1fr
                        "footleft . action info footright" auto 
                        "footer footer footer footer footer" auto / minmax(auto, 1fr) 2fr auto 2fr minmax(auto, 1fr)
                    `,
                }}
            >
                <GridItem area="header">
                    <Text fontSize={'sm'}>{questionSubtitle}</Text>
                    <Heading as="h2" fontSize="md">
                        {question}
                    </Heading>
                </GridItem>
                <GridItem area="main">
                    <Flex gap={2} wrap={'wrap'} justifyContent="center">
                        {options.map((item, index) => (
                            <QuizOption
                                key={item}
                                label={item}
                                selected={selected.indexOf(index) >= 0}
                                onClick={() => {
                                    if (selected.includes(index)) {
                                        setSelected(selected.filter((item) => item !== index));
                                        return;
                                    }
                                    setSelected(selected.concat([index]));
                                }}
                                flex={{ base: '1 0 250px', md: '0 0 calc(50% - .5rem)' }}
                            />
                        ))}
                    </Flex>
                </GridItem>
                <GridItem area="info" alignSelf={'end'}>
                    <Flex>
                        <InfoOutlineIcon mr="2" width="3" />
                        <Text fontSize="xs">
                            Deine Antwort war leider falsch. Versuche es erneut.
                        </Text>
                    </Flex>
                </GridItem>
                <GridItem area="action">
                    <Button colorScheme={'teal'} w="full">
                        {showSolution || showSkippedSolution ? 'Weiter' : 'Antwort abgeben'}
                    </Button>
                </GridItem>
                <GridItem
                    area="footleft"
                    alignSelf={'end'}
                    ml={{
                        base: 0,
                        lg: -2,
                    }}
                    pr="8"
                >
                    {currentQuestionIndex > 0 && (
                        <Button
                            leftIcon={<ChevronLeftIcon w="6" mr="-2" ml="-3" />}
                            colorScheme="white"
                            variant="ghost"
                            size="sm"
                        >
                            Letzte Frage
                        </Button>
                    )}
                </GridItem>
                <GridItem area="footright" justifySelf={'end'} alignSelf={'end'}>
                    <Button
                        leftIcon={<ArrowRightIcon w="2" />}
                        colorScheme="white"
                        variant="ghost"
                        size="sm"
                        mr={{
                            base: 0,
                            lg: -2,
                        }}
                    >
                        Frage auflösen
                    </Button>
                </GridItem>
                <GridItem area="footer" justifySelf={'center'} pb="1">
                    <Flex gap="8px">
                        {[...Array(questionLength).keys()].map((item) => (
                            <Box
                                key={item}
                                w="8px"
                                h="8px"
                                borderRadius="50%"
                                borderWidth="1px"
                                borderColor={item + 1 >= currentQuestionIndex ? foreground : accent}
                                backgroundColor={
                                    item + 1 >= currentQuestionIndex ? 'transparent' : accent
                                }
                            />
                        ))}
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default QuizBox;
