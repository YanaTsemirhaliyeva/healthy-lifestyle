import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Tag,
    TagLabel,
    Text,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { AppRoute, TEST_DATA } from '~/consts/consts';

import { TestData } from './test.types';
import { TestCard } from './TestCard';
import { TestDetailModal } from './TestDetailModal';

export const TestsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [selectedTest, setSelectedTest] = useState<TestData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Категории для фильтрации
    const categories = [
        { id: 'all', label: 'Все тесты', color: 'gray' },
        { id: 'psy', label: 'Психология', color: 'purple' },
        { id: 'projective', label: 'Проективные', color: 'pink' },
        { id: 'lifestyle', label: 'Образ жизни', color: 'green' },
        { id: 'productivity', label: 'Продуктивность', color: 'blue' },
        { id: 'intellect', label: 'Интеллект', color: 'orange' },
        { id: 'fitness', label: 'Физподготовка', color: 'red' },
        { id: 'creativity', label: 'Креативность', color: 'teal' }
    ];


    // Фильтрация тестов
    const filteredTests = TEST_DATA.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.desc.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });


    // Обработчик выбора теста
    const handleTestSelect = (test: TestData) => {
        setSelectedTest(test);
        setIsModalOpen(true);
    };

    return (
        <Container maxW="7xl" py={{ base: 2, sm: 8 }} zIndex={1} px={{ base: 0, xs: 4 }} >
            {/* Заголовок */}
            <VStack spacing={6} align="stretch" mb={10}>
                <Button as={Link} to={AppRoute.Index} mb={6} colorScheme="blue" variant="outline" mr='auto' ml={{ base: 2, xs: 0 }}>
                    ← На главную
                </Button>
                <Box>
                    <Heading mb={4} color="blue.800" textAlign='center'>
                        📊 Психологические тесты
                    </Heading>
                    <Box color="blue.700" fontSize="lg">
                        <Text mb={4} fontWeight={600} fontSize={20} textAlign='center' pl={3}>
                            Диагностические инструменты для самопознания и рефлексии.
                        </Text>
                        {/* Инструкция */}
                        <Box mt={12} p={6} bg="gray.50" borderRadius="lg">
                            <Heading size="md" mb={4} color="gray.700">
                                💡 Как пользоваться платформой?
                            </Heading>
                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <InstructionStep
                                    number="1"
                                    title="Выберите тест"
                                    desc="Используйте поиск и фильтры для навигации"
                                />
                                <InstructionStep
                                    number="2"
                                    title="Пройти онлайн"
                                    desc="Отвечайте на вопросы или выбирайте изображения"
                                />
                                <InstructionStep
                                    number="3"
                                    title="Получите результат"
                                    desc="Получите персонализированную интерпретацию"
                                />
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Box>

                {/* Фильтры и поиск */}
                <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6} px={1}>
                    <GridItem>
                        <InputGroup>
                            <InputLeftElement>
                                <SearchIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                                placeholder="Поиск тестов..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                bg="white"
                            />
                        </InputGroup>
                    </GridItem>

                    <GridItem>
                        <Flex wrap="wrap" gap={2}>
                            {categories.map(cat => (
                                <Tag
                                    key={cat.id}
                                    size="lg"
                                    variant={categoryFilter === cat.id ? 'solid' : 'outline'}
                                    colorScheme={cat.color}
                                    cursor="pointer"
                                    onClick={() => setCategoryFilter(cat.id)}
                                    _hover={{ opacity: '0.8' }}
                                    transition="all 0.2s"
                                >
                                    <TagLabel>{cat.label}</TagLabel>
                                </Tag>
                            ))}
                        </Flex>
                    </GridItem>
                </Grid>
            </VStack>

            {/* Сетка тестов */}
            {filteredTests.length > 0 ? (
                <SimpleGrid columns={{ base: 1, xs: 2, lg: 3 }} spacing={6} mb={12}>
                    {filteredTests.map((test: TestData) => (
                        <TestCard
                            key={test.id}
                            test={test}
                            onSelect={() => handleTestSelect(test)}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Box textAlign="center" py={20}>
                    <Text fontSize="xl" color="gray.500">
                        По вашему запросу тесты не найдены 😔
                    </Text>
                    <Button
                        mt={4}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                            setSearchTerm('');
                            setCategoryFilter('all');
                        }}
                    >
                        Сбросить фильтры
                    </Button>
                </Box>
            )}

            {/* Модальное окно с деталями теста */}
            <TestDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                test={selectedTest}
            />

            <Box
                bg="orange.50"
                p={4}
                borderRadius="lg"
                borderLeft="4px solid"
                borderColor="orange.300"
            >
                <Text color="gray.700" fontSize="lg" lineHeight="tall">
                    ⚠️ <Text as="span" fontWeight="bold">Важная информация:</Text>
                    <br />Все представленные
                    тесты являются инструментами самодиагностики. Их результаты носят
                    информационный характер и не могут считаться медицинским диагнозом.
                    При наличии тревожных симптомов или ухудшении самочувствия обязательно
                    обратитесь к квалифицированному специалисту.
                </Text>
            </Box>
        </Container>
    );
};


// Компонент шага инструкции
interface InstructionStepProps {
    number: string;
    title: string;
    desc: string;
}

const InstructionStep: React.FC<InstructionStepProps> = ({ number, title, desc }) => (
    <Box p={4} bg="white" borderRadius="md">
        <HStack mb={3}>
            <Box
                w="30px"
                h="30px"
                bg="blue.500"
                color="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
            >
                {number}
            </Box>
            <Text fontWeight="bold">{title}</Text>
        </HStack>
        <Text color="gray.600" fontSize="sm">
            {desc}
        </Text>
    </Box>
);