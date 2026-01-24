import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import {
    ORGANIZM_NEEDS,
    PSY_TEST_PROJECTIVE,
    PSYCHOLOGICAL_STATE
} from '~/consts/consts';

// Типы
type Test = {
    id: number;
    title: string;
    desc: string;
    src?: string;
    type?: string;
};

type TestResult = {
    selectedId?: number | null;
    resultText?: string | null;
};

type TestResults = {
    [testId: number]: TestResult;
};

type TestContentProps = {
    test: Test;
    isCompleted: boolean;
    result: TestResult;
    onSelect: (id: number) => void;
    onReset: () => void;
};

type ImageItem = {
    id: number;
    src: string;
    desc: string;
};

type OptionItem = {
    id: number;
    title: string;
    desc: string;
};

export const Projective = () => {
    // Изначально ВСЕ тесты закрыты (пустой массив)
    const [expandedTest, setExpandedTest] = useState<number | null>(null);
    const [testResults, setTestResults] = useState<TestResults>({});

    // Обработчик выбора в тесте 1
    const handleTest1Select = (id: number) => {
        const result = PSYCHOLOGICAL_STATE.find(item => item.id === id);
        setTestResults(prev => ({
            ...prev,
            1: {
                selectedId: id,
                resultText: result?.desc || null,
            }
        }));
    };

    // Обработчик выбора в тесте 2
    const handleTest2Select = (id: number) => {
        const result = ORGANIZM_NEEDS.find(item => item.id === id);
        setTestResults(prev => ({
            ...prev,
            2: {
                selectedId: id,
                resultText: result?.desc || null,
            }
        }));
    };

    // Сброс результатов теста
    const resetTest = (testId: number) => {
        setTestResults(prev => {
            const newResults = { ...prev };
            delete newResults[testId];
            return newResults;
        });
    };

    // Проверка, пройден ли тест
    const isTestCompleted = (testId: number): boolean => testResults[testId]?.selectedId !== undefined;

    // Получение результата теста
    const getTestResult = (testId: number): TestResult => testResults[testId] || {};

    // Обработчик для Accordion - разрешаем несколько открытых одновременно
    const handleAccordionChange = (index: number | number[]) => {
        if (typeof index === 'number') {
            setExpandedTest(index); // Просто число
        } else if (Array.isArray(index) && index.length > 0) {
            setExpandedTest(index[0]); // Берем первый элемент
        } else {
            setExpandedTest(null); // Закрываем все
        }
    };
    return (
        <Container maxW="6xl" pb={8} pt={{ sm: 8 }}>
            <Button as={Link} to="/" mb={6} colorScheme="teal" variant="outline">
                ← Назад к тестам
            </Button>

            <Heading mb={8} color="teal.600" textAlign="center">
                🎨 Проективные тесты в картинках
            </Heading>

            <Text color="gray.600" textAlign="center" mb={10} maxW="3xl" mx="auto">
                Проективные тесты помогают лучше понять своё психологическое состояние через ассоциации с изображениями.
                Выберите тест и следуйте инструкциям.
            </Text>

            {/* Аккордеон - все тесты изначально закрыты */}
            <Accordion
                allowToggle// Разрешаем открывать несколько тестов одновременно
                index={expandedTest !== null ? [expandedTest] : []}
                onChange={handleAccordionChange}
            >
                {PSY_TEST_PROJECTIVE.map((test: Test) => (
                    <AccordionItem
                        key={test.id}
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        mb={4}
                    >
                        <h2>
                            <AccordionButton
                                py={4}
                                _hover={{ bg: 'gray.50' }}
                                _expanded={{
                                    bg: 'teal.50',
                                    borderBottom: '1px solid',
                                    borderColor: 'gray.200',
                                    borderRadius: 'lg lg 0 0'
                                }}
                            >
                                <Box flex="1" textAlign="left">
                                    <Flex align="center" gap={3}>
                                        <Badge
                                            colorScheme={isTestCompleted(test.id) ? "green" : "teal"}
                                            fontSize="md"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            Тест {test.id}
                                            {isTestCompleted(test.id) && (
                                                <Box as="span" fontSize="xs">✓</Box>
                                            )}
                                        </Badge>
                                        <Heading size="md" color="gray.800">
                                            {test.title}
                                        </Heading>
                                    </Flex>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={6} pt={4}>
                            <TestContent
                                test={test}
                                isCompleted={isTestCompleted(test.id)}
                                result={getTestResult(test.id)}
                                onSelect={test.id === 1 ? handleTest1Select :
                                    test.id === 2 ? handleTest2Select :
                                        () => { }}
                                onReset={() => resetTest(test.id)}
                            />
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Инструкция */}
            <Box bg="yellow.50" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="yellow.400" mt={8}>
                <Heading size="md" color="yellow.800" mb={3}>
                    💡 Как проходить проективные тесты?
                </Heading>
                <VStack align="start" spacing={2} color="gray.700">
                    <Text>1. Нажмите на заголовок теста, чтобы открыть его</Text>
                    <Text>2. Расслабьтесь и не думайте слишком долго над выбором</Text>
                    <Text>3. Доверяйте первой ассоциации или ощущению</Text>
                    <Text>4. Не пытайтесь "угадать" правильный ответ</Text>
                    <Text>5. Результаты носят рекомендательный характер</Text>
                    <Text fontWeight="bold">
                        6. Пройдено тестов: {Object.keys(testResults).length}/{PSY_TEST_PROJECTIVE.length}
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
};

// Компонент содержимого теста
const TestContent = ({ test, isCompleted, result, onSelect, onReset }: TestContentProps) => (
    <Box>
        <Text color="gray.700" mb={6}>
            {test.desc}
        </Text>

        {!isCompleted ? (
            <TestUncompletedContent test={test} onSelect={onSelect} />
        ) : (
            <TestResultContent test={test} result={result} onReset={onReset} />
        )}
    </Box>
);

// Контент непройденного теста
const TestUncompletedContent = ({ test, onSelect }: { test: Test; onSelect: (id: number) => void }) => {
    switch (test.id) {
        case 1:
            return (
                <>
                    <Text fontWeight="bold" mb={4} color="gray.800">
                        Выберите одну картинку, которая больше других нравится по цвету и содержанию:
                    </Text>
                    <SimpleGrid columns={{ base: 2, sm: 3, md: 3 }} spacing={4}>
                        {PSYCHOLOGICAL_STATE.map((image: ImageItem) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                onClick={() => onSelect(image.id)}
                            />
                        ))}
                    </SimpleGrid>
                </>
            );
        case 2:
            return (
                <>
                    <Text fontWeight="bold" mb={4} color="gray.800">
                        Расслабьтесь, посмотрите на картинку 10 секунд. Что вы увидели самым первым?
                    </Text>

                    <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                        <Box flex="1">
                            {test.src && (
                                <Image
                                    src={test.src}
                                    alt="Тест: что видите первым"
                                    borderRadius="lg"
                                    border="2px solid"
                                    borderColor="gray.200"
                                />
                            )}
                        </Box>

                        <Box flex="1">
                            <VStack spacing={4} align="stretch">
                                {ORGANIZM_NEEDS.map((option: OptionItem) => (
                                    <OptionButton
                                        key={option.id}
                                        option={option}
                                        onClick={() => onSelect(option.id)}
                                    />
                                ))}
                            </VStack>
                        </Box>
                    </Flex>
                </>
            );
        default:
            return (
                <Box textAlign="center" py={10}>
                    <Text color="gray.500">Этот тест ещё в разработке</Text>
                </Box>
            );
    }
};

// Контент с результатами теста
const TestResultContent = ({ test, result, onReset }: { test: Test; result: TestResult; onReset: () => void }) => (
    <Box>
        <Flex justify="space-between" align="center" mb={4}>
            <Heading size="lg" color="teal.700">
                🎯 Ваш результат
            </Heading>
            <Button
                size="sm"
                colorScheme="teal"
                variant="outline"
                onClick={onReset}
            >
                {test.id === 1 ? 'Пройти ещё раз' : 'Посмотреть ещё раз'}
            </Button>
        </Flex>

        <Box
            bg={test.id === 1 ? 'teal.50' : 'blue.50'}
            p={6}
            borderRadius="lg"
            borderLeft="4px solid"
            borderColor={test.id === 1 ? 'teal.400' : 'blue.400'}
        >
            {test.id === 1 && result.selectedId ? (
                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    <Box flex="1">
                        <Image
                            src={PSYCHOLOGICAL_STATE[result.selectedId - 1].src}
                            alt="Выбранная картинка"
                            borderRadius="lg"
                            maxH="300px"
                            objectFit="cover"
                        />
                    </Box>
                    <Box flex="2">
                        <Text fontSize="lg" color="gray.800" lineHeight="tall">
                            {result.resultText}
                        </Text>
                    </Box>
                </Flex>
            ) : test.id === 2 && result.selectedId ? (
                <VStack align="start" spacing={4}>
                    <Box>
                        <Badge colorScheme="blue" fontSize="md" mb={2}>
                            Вы увидели:
                        </Badge>
                        <Heading size="md" color="gray.800">
                            {ORGANIZM_NEEDS[result.selectedId - 1].title}
                        </Heading>
                    </Box>

                    <Text fontSize="lg" color="gray.800" lineHeight="tall">
                        {result.resultText}
                    </Text>

                    {test.src && (
                        <Box mt={4}>
                            <Image
                                src={test.src}
                                alt="Тест: что видите первым"
                                borderRadius="lg"
                                maxH="200px"
                                objectFit="cover"
                            />
                        </Box>
                    )}
                </VStack>
            ) : (
                <Text>{result.resultText}</Text>
            )}
        </Box>
    </Box>
);

// Компонент карточки изображения
const ImageCard = ({ image, onClick }: { image: ImageItem; onClick: () => void }) => (
    <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        border="2px solid"
        borderColor="gray.200"
        transition="all 0.2s"
        _hover={{
            transform: 'translateY(-4px)',
            borderColor: 'teal.300',
            boxShadow: 'lg'
        }}
        onClick={onClick}
    >
        <Image
            src={image.src}
            alt={`Картинка ${image.id}`}
            width="100%"
            height="200px"
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
            color="teal.600"
            boxShadow="sm"
        >
            {image.id}
        </Box>
    </Box>
);

// Компонент кнопки варианта
const OptionButton = ({ option, onClick }: { option: OptionItem; onClick: () => void }) => (
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
        borderColor="gray.200"
        borderRadius="lg"
        transition="all 0.2s"
        _hover={{
            borderColor: 'blue.300',
            bg: 'blue.50',
            transform: 'translateX(4px)'
        }}
        onClick={onClick}
    >
        <VStack align="start" spacing={1}>
            <Text fontWeight="bold" color="gray.800">
                {option.title}
            </Text>
        </VStack>
    </Button>
);