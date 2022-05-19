import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    answeredQuestions: { topic: string; selected: number[]; index: number }[];
    finishedtopics: string[];
}

const initialState: QuizState = {
    answeredQuestions: [],
    finishedtopics: [],
};

const quizsSlice = createSlice({
    name: 'quizs',
    initialState,
    reducers: {
        answerQuestion(
            state,
            action: PayloadAction<{
                topic: string;
                selected: number[];
                index: number;
            }>
        ) {
            const { topic, index, selected } = action.payload;
            const question = state.answeredQuestions.find(
                (q) => q.topic === topic && q.index === index
            );
            if (question) {
                question.selected = selected;
                return;
            }
            state.answeredQuestions.push({
                topic,
                selected,
                index,
            });
        },
        removeAnswerQuestionForTopic(state, action: PayloadAction<{ topic: string }>) {
            state.answeredQuestions = state.answeredQuestions.filter(
                (q) => q.topic !== action.payload.topic
            );
        },
        quizFinishedForTopic(state, action: PayloadAction<{ topic: string }>) {
            state.finishedtopics.push(action.payload.topic);
        },
    },
});

export const { answerQuestion, quizFinishedForTopic } = quizsSlice.actions;
export default quizsSlice.reducer;
