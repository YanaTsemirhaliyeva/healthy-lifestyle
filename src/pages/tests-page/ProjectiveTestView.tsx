import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { TestAnswer,TestData } from './test.types';

interface ProjectiveTestViewProps {
    test: TestData;
}

interface ImageCardProps {
    imageSrc: string;
    title: string;
    isSelected: boolean;
    onClick: () => void;
    index: number;
}

interface OptionButtonProps {
    option: TestAnswer;
    isSelected: boolean;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, title, isSelected, onClick, index }) => (
    <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        border="2px solid"
        borderColor={isSelected ? 'blue.400' : 'gray.200'}
        bg={isSelected ? 'blue.50' : 'white'}
        transition="all 0.2s"
        _hover={{
            borderColor: 'blue.300',
            boxShadow: 'lg'
        }}
        onClick={onClick}
    >
        <Image
            src={imageSrc}
            alt={title}
            width="100%"
            height="180px"
            objectFit="cover"
        />
        <Box
            position="absolute"
            top="2"
            right="2"
            bg="white"
            borderRadius="full"
            w="30px"
            h="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            color="blue.600"
            boxShadow="sm"
        >
            {index + 1}
        </Box>
    </Box>
);

const OptionButton: React.FC<OptionButtonProps> = ({ option, isSelected, onClick }) => (
    <Button
        variant="outline"
        size="lg"
        justifyContent="flex-start"
        textAlign="left"
        height="auto"
        py={4}
        px={6}
        whiteSpace="normal"
        border="2px solid"
        borderColor={isSelected ? 'blue.400' : 'gray.200'}
        bg={isSelected ? 'blue.50' : 'white'}
        borderRadius="lg"
        transition="all 0.2s"
        _hover={{
            borderColor: 'blue.300',
            bg: 'blue.50',
        }}
        onClick={onClick}
    >
        <Text fontWeight="bold" color="gray.800">
            {option.title}
        </Text>
    </Button>
);

export const ProjectiveTestView: React.FC<ProjectiveTestViewProps> = ({ test }) => {
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);

    const question = test.questions?.[0];
    const answers = question?.answers || [];

    const handleSelect = (id: number) => {
        setSelectedAnswerId(id);
        setShowResult(true);
    };

    const handleReset = () => {
        setSelectedAnswerId(null);
        setShowResult(false);
    };

    const selectedAnswer: TestAnswer | undefined = answers.find((answer: TestAnswer) => 
        answer.id === selectedAnswerId
    );

    if (!question) {
        return (
            <Alert status="error">
                <AlertIcon />
                Вопрос не найден
            </Alert>
        );
    }

    if (showResult) {
        return (
            <VStack spacing={6} align="stretch">
                <Flex justify="space-between" align="center">
                    <Heading size="xl" color="gray.800">
                        🎯 Результат теста
                    </Heading>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={handleReset}
                    >
                        Пройти ещё раз
                    </Button>
                </Flex>

                <Box
                    p={6}
                    bg="green.50"
                    borderRadius="lg"
                    borderLeft="4px solid"
                    borderColor="green.400"
                >
                    {test.type === 'image-grid' && selectedAnswer?.imageSrc ? (
                        <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={6}>
                            <GridItem>
                                <Image
                                    src={selectedAnswer.imageSrc}
                                    alt="Выбранное изображение"
                                    borderRadius="lg"
                                    shadow="md"
                                    w="100%"
                                />
                            </GridItem>
                            <GridItem>
                                <VStack align="start" spacing={4}>
                                    <Box>
                                        <Badge colorScheme="blue" fontSize="md" mb={2}>
                                            Выбранная картинка
                                        </Badge>
                                        <Heading size="md" color="gray.800" mb={2}>
                                            {selectedAnswer.title}
                                        </Heading>
                                    </Box>
                                    <Text fontSize="lg" color="gray.700" lineHeight="tall">
                                        {selectedAnswer.resultText}
                                    </Text>
                                </VStack>
                            </GridItem>
                        </Grid>
                    ) : (
                        <VStack align="start" spacing={4}>
                            <Box>
                                <Badge colorScheme="blue" fontSize="md" mb={2}>
                                    Ваш выбор
                                </Badge>
                                <Heading size="md" color="gray.800" mb={2}>
                                    {selectedAnswer?.title}
                                </Heading>
                            </Box>
                            <Text fontSize="lg" color="gray.700" lineHeight="tall">
                                {selectedAnswer?.resultText}
                            </Text>
                            
                            {test.src && (
                                <Image
                                    src={test.src}
                                    alt="Тестовое изображение"
                                    borderRadius="lg"
                                    maxH="200px"
                                    mx="auto"
                                    mt={4}
                                />
                            )}
                        </VStack>
                    )}
                </Box>
            </VStack>
        );
    }

    return (
        <VStack spacing={8} align="stretch">
            {/* Инструкция */}
            <Box bg="blue.50" p={4} borderRadius="lg" borderLeft="4px solid" borderColor="blue.400">
                <Text fontWeight="bold" color="blue.800">
                    💡 {test.type === 'image-grid' 
                        ? 'Выберите одну картинку, которая больше всего нравится' 
                        : 'Посмотрите на изображение и выберите первое, что увидели'}
                </Text>
            </Box>

            {/* Вопрос */}
            {/* <Heading size="lg" color="gray.800">
                {question.question}
            </Heading> */}

            {/* Содержимое теста */}
            {test.type === 'image-grid' ? (
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                    {answers.map((answer: TestAnswer, index: number) => (
                        <ImageCard
                            key={answer.id}
                            imageSrc={answer.imageSrc || ''}
                            title={answer.title}
                            isSelected={selectedAnswerId === answer.id}
                            onClick={() => handleSelect(answer.id)}
                            index={index}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
                    <GridItem>
                        {test.src && (
                            <Image
                                src={test.src}
                                alt="Проективный тест"
                                borderRadius="lg"
                                shadow="md"
                                w="100%"
                            />
                        )}
                    </GridItem>
                    
                    <GridItem>
                        <Stack spacing={4}>
                            {answers.map((answer: TestAnswer) => (
                                <OptionButton
                                    key={answer.id}
                                    option={answer}
                                    isSelected={selectedAnswerId === answer.id}
                                    onClick={() => handleSelect(answer.id)}
                                />
                            ))}
                        </Stack>
                    </GridItem>
                </Grid>
            )}
        </VStack>
    );
};