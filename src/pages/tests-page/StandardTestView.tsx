import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Progress,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useCallback,useMemo, useState } from 'react';

import { TestAnswer, TestData, TestQuestion, TestResult } from './test.types';

interface StandardTestViewProps {
    test: TestData;
    onComplete: () => void;
}

interface RadioCardProps {
    answer: TestAnswer;
    isSelected: boolean;
    onSelect: (answerId: number) => void;
}

const RadioCard: React.FC<RadioCardProps> = React.memo(({
    answer,
    isSelected,
    onSelect
}) => {
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onSelect(answer.id); 
    }, [onSelect, answer.id]);

    return (
        <Box
            p={4}
            borderWidth="2px"
            borderColor={isSelected ? 'blue.400' : 'gray.200'}
            borderRadius="lg"
            transition="all 0.2s"
            bg={isSelected ? 'blue.50' : 'white'}
            cursor="pointer"
            _hover={{
                borderColor: 'blue.300',
                bg: 'blue.50',
                shadow: 'md'
            }}
            onClick={handleClick}
            position="relative"
        >
            <Flex align="center">
                <Box
                    w="24px"
                    h="24px"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={isSelected ? 'blue.500' : 'gray.300'}
                    bg={isSelected ? 'blue.500' : 'transparent'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={4}
                    flexShrink={0}
                >
                    {isSelected && (
                        <Box
                            w="12px"
                            h="12px"
                            borderRadius="full"
                            bg="white"
                        />
                    )}
                </Box>
                <Text
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    flex="1"
                >
                    {answer.title}
                </Text>
            </Flex>

            {isSelected && (
                <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg="blue.500"
                    border="2px solid white"
                    shadow="sm"
                />
            )}
        </Box>
    );
});

RadioCard.displayName = 'RadioCard';

export const StandardTestView: React.FC<StandardTestViewProps> = ({ test, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // questionIndex → answerId
    const [showResult, setShowResult] = useState<boolean>(false);
    const [totalScore, setTotalScore] = useState<number>(0);

    // Вычисляем прогресс
    const progress = useMemo(() => {
        const totalQuestions = test.questions?.length || 0;
        const answeredCount = Object.keys(answers).length;
        return totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
    }, [answers, test.questions?.length]);

    // Проверяем, все ли вопросы отвечены
    const allQuestionsAnswered = useMemo(() => {
        const totalQuestions = test.questions?.length || 0;
        return Object.keys(answers).length === totalQuestions;
    }, [answers, test.questions?.length]);

    const handleAnswer = useCallback((answerId: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion]: answerId
        }));
    }, [currentQuestion]);

    const handleNext = useCallback(() => {
        if (currentQuestion < (test.questions?.length || 0) - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    }, [currentQuestion, test.questions?.length]);

    const handlePrev = useCallback(() => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    }, [currentQuestion]);

    const calculateResults = useCallback(() => {
        let totalScore = 0;
        
        Object.entries(answers).forEach(([questionIndexStr, answerId]) => {
            const questionIndex = parseInt(questionIndexStr, 10);
            const question = test.questions?.[questionIndex];
            
            if (question) {
                const selectedAnswer = question.answers.find(a => a.id === answerId);
                if (selectedAnswer) {
                    totalScore += selectedAnswer.value; 
                }
            }
        });
        
        setTotalScore(totalScore);
        setShowResult(true);
    }, [answers, test.questions]);

    const handleReset = useCallback(() => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResult(false);
        setTotalScore(0);
    }, []);

    const result: TestResult | undefined = test.results?.find((r: TestResult) =>
        totalScore >= r.min && totalScore <= r.max
    );

    if (showResult) {
        return (
            <VStack spacing={6} align="stretch">
                <Box textAlign="center">
                    <Heading size="xl" color="gray.800" mb={4}>
                        🎯 Результат теста
                    </Heading>
                    <Badge colorScheme="blue" fontSize="lg" p={2}>
                        Набрано баллов: {totalScore}
                    </Badge>
                </Box>

                <Box
                    p={6}
                    bg={result ? 'green.50' : 'gray.50'}
                    borderRadius="lg"
                    borderLeft="4px solid"
                    borderColor={result ? 'green.400' : 'gray.400'}
                >
                    {result ? (
                        <>
                            <Heading size="lg" color="gray.800" mb={4}>
                                {result.title}
                            </Heading>
                            <Text fontSize="lg" color="gray.700">
                                {result.desc}
                            </Text>
                        </>
                    ) : (
                        <Text>Результат не найден</Text>
                    )}
                </Box>

                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                    <Button
                        colorScheme="blue"
                        size="lg"
                        flex="1"
                        onClick={handleReset}
                    >
                        Пройти заново
                    </Button>
                    <Button
                        colorScheme="green"
                        size="lg"
                        flex="1"
                        onClick={onComplete}
                    >
                        Закрыть и выбрать другой тест
                    </Button>
                </Stack>
            </VStack>
        );
    }

    const question = test.questions?.[currentQuestion];
    const selectedAnswerId = answers[currentQuestion];

    if (!question) {
        return (
            <Alert status="error">
                <AlertIcon />
                Вопрос не найден
            </Alert>
        );
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Прогресс */}
            <Box>
                <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">
                        Прогресс: {Object.keys(answers).length} из {test.questions?.length} вопросов
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        {Math.round(progress)}%
                    </Text>
                </Flex>
                <Progress
                    value={progress}
                    colorScheme="blue"
                    size="sm"
                    borderRadius="full"
                    hasStripe
                />
                {allQuestionsAnswered && (
                    <Text fontSize="xs" color="green.600" mt={1} textAlign="center" fontWeight="medium">
                        ✓ Все вопросы отвечены! Можете завершить тест.
                    </Text>
                )}
            </Box>

            {/* Информация о текущем вопросе */}
            <Flex justify="space-between" align="center">
                {/* <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="md">
                    Вопрос {currentQuestion + 1} из {test.questions?.length}
                </Badge> */}
                {selectedAnswerId !== undefined && (
                    <Badge colorScheme="green" fontSize="xs" px={2} py={1}>
                        ✓ Отвечен
                    </Badge>
                )}
            </Flex>

            {/* Вопрос */}
            <Box>
                <Heading size="md" color="gray.800" mb={6}>
                    {question.question}
                </Heading>

                <Stack spacing={3}>
                    {question.answers.map((answer: TestAnswer) => (
                        <RadioCard
                            key={`q${currentQuestion}-a${answer.id}`}
                            answer={answer}
                            isSelected={selectedAnswerId === answer.id}
                            onSelect={handleAnswer}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Кнопки навигации */}
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={4}>
                <Button
                    colorScheme="gray"
                    variant="outline"
                    onClick={handlePrev}
                    isDisabled={currentQuestion === 0}
                    flex="1"
                    py={2}
                >
                    ← Предыдущий
                </Button>

                <Button
                    colorScheme="gray"
                    variant="outline"
                    onClick={handleNext}
                    isDisabled={currentQuestion === (test.questions?.length || 0) - 1}
                    flex="1"
                    py={2}
                >
                    Следующий →
                </Button>

                <Button
                    colorScheme="blue"
                    onClick={calculateResults}
                    isDisabled={!allQuestionsAnswered}
                    flex="2"
                    py={2}
                >
                    {allQuestionsAnswered ? 'Завершить тест' : `Отвечено: ${Object.keys(answers).length}/${test.questions?.length}`}
                </Button>
            </Stack>

            {/* Панель навигации по вопросам */}
            <Box mt={4}>
                <Text fontSize="sm" color="gray.600" mb={3}>
                    Навигация по вопросам:
                </Text>
                <Flex wrap="wrap" gap={2}>
                    {test.questions?.map((questionItem: TestQuestion, index: number) => {
                        const isAnswered = answers[index] !== undefined;
                        const isCurrent = index === currentQuestion;

                        return (
                            <Box
                                key={`nav-${questionItem.id}-${index}`}
                                as="button"
                                type="button"
                                w="36px"
                                h="36px"
                                borderRadius="md"
                                bg={isAnswered ? 'green.500' :
                                    isCurrent ? 'blue.500' : 'gray.200'}
                                color="white"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="sm"
                                fontWeight="bold"
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{
                                    transform: 'scale(1.1)',
                                    shadow: 'sm'
                                }}
                                onClick={() => setCurrentQuestion(index)}
                                title={`Вопрос ${index + 1}`}
                                border={isCurrent ? '2px solid' : 'none'}
                                borderColor="blue.300"
                                position="relative"
                                outline="none"
                                _focus={{
                                    outline: '2px solid',
                                    outlineColor: 'blue.300',
                                    outlineOffset: '2px'
                                }}
                            >
                                {index + 1}
                                {isAnswered && (
                                    <Box
                                        position="absolute"
                                        top="-4px"
                                        right="-4px"
                                        w="12px"
                                        h="12px"
                                        borderRadius="full"
                                        bg="green.400"
                                        border="2px solid white"
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Flex>
            </Box>

            {/* Инструкция */}
            {/* <Alert status="info" borderRadius="md" mt={4} fontSize="sm">
                <AlertIcon />
                {selectedAnswerId === undefined
                    ? `Выберите ответ на вопрос ${currentQuestion + 1}`
                    : `Ответ на вопрос ${currentQuestion + 1} сохранен. Можете изменить его или перейти к другим вопросам.`}
            </Alert> */}
        </VStack>
    );
};