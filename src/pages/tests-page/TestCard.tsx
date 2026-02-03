import {
    Box,
    Button,
    Heading,
    HStack,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import React from 'react';

import { TestData } from './test.types';

interface TestCardProps {
    test: TestData;
    onSelect: () => void;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onSelect }) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    
    // Иконки для категорий
    const categoryIcons: Record<string, string> = {
        projective: '🖼️',
        psy: '🧠',
        lifestyle: '🏃',
        productivity: '⚡',
        intellect: '📚',
        fitness: '💪',
        creativity: '🎨'
    };

    // Текст для кнопки в зависимости от типа теста
    const getButtonText = (): string => {
        if (test.type === 'image-grid' || test.type === 'single-image-options') {
            return 'Пройти тест';
        }
        return 'Пройти тест';
    };

    // Подсчитываем количество вопросов
    const getQuestionCount = (): number | string => test.questions?.length || 'N/A';

    const questionCount = getQuestionCount();
    const buttonText = getButtonText();

    return (
        <Box
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{
                shadow: 'lg',
                borderColor: 'blue.300',
            }}
            cursor="pointer"
            onClick={onSelect}
            position="relative"
            height="100%"
        >
            <VStack p={6} align="stretch" spacing={4} height="100%">
                {/* Заголовок и иконка */}
                <HStack spacing={3}>
                    <Box fontSize="xl">
                        {categoryIcons[test.category] || '📋'}
                    </Box>
                    <Heading size="md" color="gray.800">
                        {test.title}
                    </Heading>
                </HStack>

                {/* Описание */}
                <Text color="gray.700" noOfLines={3} flex="1" fontWeight={600}>
                    {test.desc}
                </Text>

                {/* Детали теста */}
                <HStack spacing={4} color="gray.500" fontSize="sm">
                    <HStack spacing={1}>
                        <Text fontWeight="bold">Вопросов:</Text>
                        <Text>{questionCount}</Text>
                    </HStack>
                    
                    {/* <HStack spacing={1}>
                        <Text fontWeight="bold">Тип:</Text>
                        <Text textTransform="capitalize">
                            {test.category === 'projective' ? 'Проективный' : test.category}
                        </Text>
                    </HStack> */}
                </HStack>

                {/* Кнопка */}
                <Button
                    colorScheme="blue"
                    size="md"
                    w="100%"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect();
                    }}
                    mt="auto"
                >
                    {buttonText}
                </Button>
            </VStack>
        </Box>
    );
};