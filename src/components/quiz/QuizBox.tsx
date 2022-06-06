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
import React, { useCallback, useEffect, useState } from 'react';
import QuizOption, { QuizOptionProps } from './QuizOption';

export interface QuizBoxQuestion {}

interface QuizBoxProps {
    question: string;
    questionSubtitle: string;
    questionLength: number;
    currentQuestionIndex: number;
    correct: number[];
    onAwnswerSubmit: (selected: number[]) => void;
    onNextStep: () => void;
    onQuestionSkip: () => void;
    onPreviousQuestionRequest?: () => void;
    showSolution?: boolean;
    showSkippedSolution?: boolean;
    options: string[];
    canSkipQuestion: boolean;
    status?: 'wrong' | 'correct';
    multiselect: boolean;
}

const QuizBox = ({
    question,
    questionSubtitle,
    questionLength,
    currentQuestionIndex,
    correct,
    onAwnswerSubmit,
    onNextStep,
    onQuestionSkip,
    onPreviousQuestionRequest,
    showSolution,
    showSkippedSolution,
    options,
    canSkipQuestion,
    status,
    multiselect,
}: QuizBoxProps) => {
    const [selected, setSelected] = useState([1, 4]);

    const foreground = useColorModeValue('gray.900', 'white');
    const background = 'transparent';
    const accent = 'teal';

    const onSubmitButtonClick = useCallback(() => {
        if ((showSolution && isCorrect) || showSkippedSolution) {
            onNextStep();
            return;
        }
        onAwnswerSubmit(selected);
    }, [onNextStep, onAwnswerSubmit, selected, showSolution, showSkippedSolution]);

    useEffect(() => {
        setSelected([]);
    }, [question, setSelected]);

    const isCorrect = status === 'correct';

    return (
        <Box>
            <Grid
                paddingInline={3}
                paddingBlock={2}
                borderWidth="1px"
                borderColor={'teal'}
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
                    <Flex justifyContent="space-between">
                        <Box>
                            <Text fontSize={'sm'}>{questionSubtitle}</Text>
                            <Heading as="h2" fontSize="md">
                                {question}
                            </Heading>
                        </Box>
                        {multiselect && (
                            <Text
                                fontSize="sm"
                                textTransform="uppercase"
                                fontWeight="semibold"
                                fontStyle="italic"
                            >
                                Mehrfachauswahl
                            </Text>
                        )}
                    </Flex>
                </GridItem>
                <GridItem area="main">
                    <Flex gap={2} wrap={'wrap'} justifyContent="center">
                        {options.map((item, index) => (
                            <QuizOption
                                key={item}
                                label={item}
                                selected={selected.indexOf(index) >= 0}
                                onClick={() => {
                                    if (!multiselect) {
                                        setSelected([index]);
                                        return;
                                    }
                                    if (showSolution) return;
                                    if (selected.includes(index)) {
                                        setSelected(selected.filter((item) => item !== index));
                                        return;
                                    }
                                    setSelected(selected.concat([index]));
                                }}
                                flex={{ base: '1 0 250px', md: '0 0 calc(50% - .5rem)' }}
                                status={
                                    !showSolution
                                        ? undefined
                                        : (correct.includes(index) && selected.includes(index)) ||
                                          (!correct.includes(index) && !selected.includes(index))
                                        ? 'correct'
                                        : 'wrong'
                                }
                            />
                        ))}
                    </Flex>
                </GridItem>
                <GridItem area="info" alignSelf={'center'}>
                    {status !== undefined && (
                        <Flex>
                            <InfoOutlineIcon mr="2" width="3" />
                            <Text fontSize="xs">
                                {status === 'wrong'
                                    ? 'Deine Antwort war leider falsch. Versuche es erneut.'
                                    : 'Alles richtig!'}
                            </Text>
                        </Flex>
                    )}
                </GridItem>
                <GridItem area="action">
                    <Button colorScheme={'teal'} w="full" onClick={onSubmitButtonClick}>
                        {(showSolution && isCorrect) || showSkippedSolution
                            ? 'Weiter'
                            : 'Antwort abgeben'}
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
                    {currentQuestionIndex > 0 && onPreviousQuestionRequest && (
                        <Button
                            leftIcon={<ChevronLeftIcon w="6" mr="-2" ml="-3" />}
                            colorScheme="white"
                            variant="ghost"
                            size="sm"
                            onClick={onPreviousQuestionRequest}
                        >
                            Letzte Frage
                        </Button>
                    )}
                </GridItem>
                <GridItem area="footright" justifySelf={'end'} alignSelf={'end'}>
                    {canSkipQuestion && (
                        <Button
                            leftIcon={<ArrowRightIcon w="2" />}
                            colorScheme="white"
                            variant="ghost"
                            size="sm"
                            onClick={onQuestionSkip}
                            mr={{
                                base: 0,
                                lg: -2,
                            }}
                        >
                            Frage auflösen
                        </Button>
                    )}
                </GridItem>
                {questionLength > 1 && (
                    <GridItem area="footer" justifySelf={'center'} pb="1">
                        <Flex gap="8px">
                            {[...Array(questionLength).keys()].map((item) => (
                                <Box
                                    key={item}
                                    w="8px"
                                    h="8px"
                                    borderRadius="50%"
                                    borderWidth="1px"
                                    borderColor={
                                        item >= currentQuestionIndex + 1 ? foreground : accent
                                    }
                                    backgroundColor={
                                        item >= currentQuestionIndex + 1 ? 'transparent' : accent
                                    }
                                />
                            ))}
                        </Flex>
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
};

export default QuizBox;
