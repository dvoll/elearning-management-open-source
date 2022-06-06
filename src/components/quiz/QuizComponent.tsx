import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/createStore';
import { answerQuestion, quizFinishedForTopic } from '../../store/quiz/quizSlice';
import { QuizQuestion } from '../../templates/page-template';
import QuizBox from './QuizBox';

export interface QuizComponentProps {
    title: string;
    questions: QuizQuestion[];
    category: string;
    topic: string;
}

const QuizComponent = ({ title, questions, category, topic }: QuizComponentProps) => {
    const [showSolution, setShowSolution] = useState(false);
    const [skipped, setSkipped] = useState(false);
    const [status, setStatus] = useState<undefined | 'wrong' | 'correct'>(undefined);
    // const [isFinished, setIsFinished] = useState(false);
    // const [currQuestion, setCurrQuestion] = useState(questions.length >= 1 ? questions[0] : undefined);
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

    const dispatch = useDispatch();
    // const answeredQuestionsForTopic = useSelector((state: RootState) =>
    //     state.quiz.answeredQuestions.filter((q) => q.topic === topic)
    // );
    const topicFinished = useSelector((state: RootState) =>
        state.quiz.finishedtopics.includes(topic)
    );

    const onNextQuestion = useCallback(() => {
        if (questions[currQuestionIndex + 1]) {
            setCurrQuestionIndex(currQuestionIndex + 1);
            setStatus(undefined);
        } else {
            dispatch(quizFinishedForTopic({ topic }));
        }
        setShowSolution(false);
    }, [
        setCurrQuestionIndex,
        currQuestionIndex,
        quizFinishedForTopic,
        questions,
        dispatch,
        topic,
        setStatus,
        setShowSolution,
    ]);

    const onQuestionAnswered = useCallback(
        (selected: number[]) => {
            const isCorrect =
                questions[currQuestionIndex].options.findIndex((curr, currIndex) => {
                    const corr = questions[currQuestionIndex].correct;
                    return (
                        (corr.includes(currIndex) && !selected.includes(currIndex)) ||
                        (!corr.includes(currIndex) && selected.includes(currIndex))
                    );
                }, false) < 0;
            if (isCorrect) {
                setStatus('correct');
                setShowSolution(true);
                dispatch(
                    answerQuestion({
                        topic: topic,
                        index: currQuestionIndex,
                        selected: selected,
                    })
                );
            } else {
                setStatus('wrong');
            }
        },
        [setShowSolution, answerQuestion, currQuestionIndex, questions, setStatus, dispatch, topic]
    );

    const onQuestionSkip = useCallback(() => {
        setSkipped(true);
    }, [setSkipped]);

    const currQuestion = questions[currQuestionIndex];
    return (
        <>
            <Heading as="h2" fontSize="xl" mb="4">
                {title}
            </Heading>
            {topicFinished && (
                <Box
                    paddingInline={3}
                    paddingBlock={8}
                    borderWidth="1px"
                    borderColor={'teal'}
                    borderRadius={12}
                >
                    <Heading fontSize="md" as="h3">
                        Super!
                    </Heading>
                    <Text>Du hast alle Fragen beantwortet.</Text>
                </Box>
            )}
            {!topicFinished && (
                <QuizBox
                    question={currQuestion.question}
                    questionSubtitle={`${category} - ${topic}`}
                    currentQuestionIndex={currQuestionIndex}
                    correct={currQuestion.correct}
                    onAwnswerSubmit={onQuestionAnswered}
                    onQuestionSkip={onQuestionSkip}
                    showSolution={showSolution}
                    questionLength={questions.length}
                    options={currQuestion.options.map((option) => option.text)}
                    canSkipQuestion={skipped}
                    onNextStep={onNextQuestion}
                    status={status}
                    multiselect={currQuestion.correct.length > 1}
                />
            )}
        </>
    );
};

export default QuizComponent;
