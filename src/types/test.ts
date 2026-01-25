export type ResultType = {
    id: number,
    min: number,
    max: number,
    title: string,
    desc: string
}

export type AnswerType = {
    id: 0,
    title: 'Никогда',
    value: 0
}

export type QuestionType = {
    id: number,
    question: string,
    answers: AnswerType[]
}

export type TestType = {
    id: number,
    title: string,
    desc: string,
    questions: QuestionType[],
    answers: AnswerType[]
}
