import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { AppRoute } from "~/consts/consts";

import { Article, ARTICLES_DATA } from "./articles-data";

export const Articles = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(ARTICLES_DATA[0]);
    const articleRef = useRef<HTMLDivElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    // Проверяем, это десктопная версия (ширина >= 768px)
    const [isDesktop] = useMediaQuery("(min-width: 768px)");

    const sidebarBg = useColorModeValue("gray.50", "gray.800");
    const articleBg = useColorModeValue("white", "gray.900");
    const buttonHoverBg = useColorModeValue("blue.50", "blue.900");
    const activeButtonBg = useColorModeValue("blue.100", "blue.800");

    const categories = ARTICLES_DATA.filter(article => article.id !== 0)
        .reduce((acc: Record<string, Article[]>, article) => {
            if (!acc[article.category]) {
                acc[article.category] = [];
            }
            acc[article.category].push(article);
            return acc;
        }, {});

    useEffect(() => {
        // Скроллим только на десктопе и когда выбрана новая статья (не первая загрузка)
        if (articleRef.current && isDesktop) {
            articleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [selectedArticle, isDesktop]); // Добавляем isDesktop в зависимости

    const handleArticleSelect = (article: Article) => {
        const prevArticleId = selectedArticle?.id;
        setSelectedArticle(article);
        onClose(); // Закрываем модальное окно после выбора статьи

        // Скроллим только на десктопе и если это не первая загрузка страницы
        if (isDesktop && prevArticleId !== undefined) {
            // Небольшая задержка для гарантии, что статья уже отрендерилась
            setTimeout(() => {
                if (articleRef.current) {
                    articleRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 50);
        }
    };

    const getCategoryTitle = (category: string): string => {
        const titles: Record<string, string> = {
            sleep: "Сон и циркадные ритмы",
            diet: "Питание и диетология",
            activity: "Фитнес и активность",
            stress: "Ментальное здоровье",
            water: "Гидратация",
            gut: "Микробиом",
            vitaminD: "Витамины",
            belarus: "Белорусские исследования",
            intro: "Введение"
        };
        return titles[category] || category;
    };

    const renderParagraph = (paragraph: string, index: number) => {
        if (paragraph.trim() === "") {
            return <Divider key={index} my={2} />;
        }

        if (paragraph.startsWith("- ") || paragraph.startsWith("✅ ") || paragraph.startsWith("❌ ")) {
            const bullet = paragraph.startsWith("- ") ? "•" :
                paragraph.startsWith("✅ ") ? "✅" : "❌";
            const text = paragraph.substring(2);

            return (
                <Flex key={index} align="flex-start" gap={2}>
                    <Text fontSize="lg" mt={0.5}>{bullet}</Text>
                    <Text fontSize="md" color="gray.700">
                        {text}
                    </Text>
                </Flex>
            );
        }

        if (/^\d+\.\s/.test(paragraph)) {
            return (
                <Flex key={index} align="flex-start" gap={2}>
                    <Text fontSize="md" fontWeight="bold" color="blue.600">
                        {paragraph.split('.')[0]}.
                    </Text>
                    <Text fontSize="md" color="gray.700">
                        {paragraph.substring(paragraph.indexOf(' ') + 1)}
                    </Text>
                </Flex>
            );
        }

        return (
            <Text
                key={index}
                fontSize="md"
                lineHeight="tall"
                color="gray.700"
            >
                {paragraph}
            </Text>
        );
    };

    // Компонент сайдбара для повторного использования
    const SidebarContent = () => (
        <VStack align="stretch" spacing={3}>
            <Button
                onClick={() => handleArticleSelect(ARTICLES_DATA[0])}
                justifyContent="flex-start"
                leftIcon={<span>📚</span>}
                variant={selectedArticle?.id === 0 ? "solid" : "ghost"}
                colorScheme={selectedArticle?.id === 0 ? "blue" : "gray"}
                bg={selectedArticle?.id === 0 ? activeButtonBg : "transparent"}
                _hover={{ bg: buttonHoverBg }}
                size="lg"
            >
                <Text flex={1} textAlign="left">Предисловие</Text>
            </Button>

            <Divider my={2} />

            {/* Кнопки по категориям */}
            {Object.entries(categories).map(([category, articles]) => (
                <Box key={category}>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="gray.500"
                        mb={2}
                        pl={1}
                    >
                        {getCategoryTitle(category)}
                    </Text>
                    <VStack spacing={1} align="stretch">
                        {articles.map((article) => (
                            <Button
                                key={article.id}
                                onClick={() => handleArticleSelect(article)}
                                justifyContent="flex-start"
                                leftIcon={<span>{article.icon}</span>}
                                variant={selectedArticle?.id === article.id ? "solid" : "ghost"}
                                colorScheme={selectedArticle?.id === article.id ? "blue" : "gray"}
                                bg={selectedArticle?.id === article.id ? activeButtonBg : "transparent"}
                                _hover={{ bg: buttonHoverBg }}
                                size="md"
                                pl={3}
                            >
                                <Text
                                    flex={1}
                                    textAlign="left"
                                    fontSize="sm"
                                    noOfLines={1}
                                >
                                    {article.title}
                                </Text>
                            </Button>
                        ))}
                    </VStack>
                </Box>
            ))}

            {/* Статистика внизу сайдбара */}
            <Box
                mt={6}
                p={3}
                bg="blue.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="blue.100"
            >
                <Text fontSize="sm" fontWeight="bold" color="blue.700" mb={1}>
                    Всего статей:
                </Text>
                <Text fontSize="sm" color="gray.600">
                    {ARTICLES_DATA.length} материалов, основанных на исследованиях
                </Text>
            </Box>
        </VStack>
    );

    return (
        <Container maxW="7xl" py={8} pos='relative' zIndex={1} px={{ base: 0, xs: 4 }}>
            <Button as={Link} to={AppRoute.Index} mb={6} colorScheme="blue" variant="outline" ml={{ base: 2, xs: 0 }}>
                ← На главную
            </Button>
            <Box textAlign="center">
                <Heading color="blue.700" mb={4}>
                    📊 Научные исследования о ЗОЖ
                </Heading>
                <Text color="blue.600" maxW="3xl" mx="auto" fontWeight={600} fontSize={18} mb={16}>
                    Основано на последних научных данных и исследованиях
                </Text>
            </Box>
            <Flex
                direction={{ base: "column", md: "row" }}
                gap={6}
                minH="600px"
            >
                {/* Кнопка открытия модального окна на мобильных */}
                <Box display={{ base: "block", md: "none" }} mb={4}>
                    <Button
                        ref={btnRef}
                        onClick={onOpen}
                        leftIcon={<HamburgerIcon />}
                        colorScheme="blue"
                        variant="outline"
                        w="full"
                    >
                        Выбрать статью
                    </Button>
                </Box>

                {/* Модальное окно для мобильных */}
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            {/* Категории статей */}
                        </DrawerHeader>
                        <DrawerBody py={4} px={1}>
                            <SidebarContent />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                {/* Сайдбар для десктопа */}
                <Box
                    w={{ base: "100%", md: "300px" }}
                    bg={sidebarBg}
                    borderRadius="lg"
                    p={4}
                    boxShadow="sm"
                    position="sticky"
                    top="24px"
                    alignSelf="flex-start"
                    display={{ base: "none", md: "block" }}
                >
                    <SidebarContent />
                </Box>

                {/* Основное содержание статьи */}
                <Box
                    flex={1}
                    bg={articleBg}
                    borderRadius="lg"
                    p={{ base: 4, md: 6 }}
                    boxShadow="sm"
                    overflow="auto"
                    ref={articleRef}
                >
                    {selectedArticle ? (
                        <VStack align="stretch" spacing={6}>
                            {/* Заголовок статьи */}
                            <Box>
                                <Flex align="center" gap={3} mb={2}>
                                    <Text fontSize="4xl">{selectedArticle.icon}</Text>
                                    <Box flex={1}>
                                        <Flex align="center" gap={2} mb={1}>
                                            <Heading
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                color="gray.800"
                                            >
                                                {selectedArticle.title}
                                            </Heading>
                                        </Flex>
                                        <Flex align="center" gap={4} flexWrap="wrap">
                                            {selectedArticle.source && (
                                                <Text fontSize="sm" color="gray.500">
                                                    Источник: {selectedArticle.source}
                                                </Text>
                                            )}
                                            {selectedArticle.country && (
                                                <Badge colorScheme="green" variant="subtle">
                                                    {selectedArticle.country}
                                                </Badge>
                                            )}
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Divider />
                            </Box>

                            {/* Содержание статьи */}
                            <VStack align="stretch" spacing={4}>
                                {selectedArticle.article.map((paragraph, index) =>
                                    renderParagraph(paragraph, index)
                                )}
                            </VStack>

                            {/* Дополнительная информация */}
                            {selectedArticle.id !== 0 && (
                                <Box
                                    mt={6}
                                    p={4}
                                    bg="blue.50"
                                    borderRadius="md"
                                    borderLeftWidth="4px"
                                    borderLeftColor="blue.400"
                                >
                                    <Text fontSize="sm" fontStyle="italic" color="gray.600">
                                        💡 Все данные в этой статье основаны на клинических исследованиях
                                        и могут быть полезны для понимания принципов здорового образа жизни.
                                        Для индивидуальных рекомендаций обратитесь к специалисту.
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    ) : (
                        <Text>Статья не выбрана</Text>
                    )}
                </Box>
            </Flex>

            {/* Футер с информацией */}
            <Box
                mt={8}
                p={4}
                bg="gray.50"
                borderRadius="lg"
                textAlign="center"
            >
                <Text fontSize="sm" color="gray.600">
                    🔬 Все статьи обновляются по мере публикации новых исследований.
                    Последнее обновление: {new Date().getFullYear()} год
                </Text>
                <Text fontSize="xs" color="gray.500" mt={2}>
                    Информация носит ознакомительный характер
                </Text>
            </Box>
        </Container>
    );
};