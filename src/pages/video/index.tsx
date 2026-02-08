import { SearchIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Select,
  SimpleGrid,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

import { AppRoute } from "~/consts/consts";

import { Video, VIDEOS_DATA } from "./video-data";

const VIDEOS_PER_PAGE_MOBILE = 8;
const VIDEOS_PER_PAGE_DESKTOP = 12;

const TYPE_LABELS: Record<string, string> = {
  'useful-tips': 'Полезные советы',
  'massage': 'Массаж и гимнастика',
  'psy': 'Психология',
  'healthy-food': 'Полезная еда/напитки'
};

export const VideoPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [videoDurations, setVideoDurations] = useState<Record<number, number>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // Состояния для фильтрации и поиска
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Получаем уникальные типы из данных
  const videoTypes = useMemo(() => {
    const types = Array.from(new Set(VIDEOS_DATA.map(video => video.type)));
    return types.sort();
  }, []);

  const aspectRatio = 3 / 4;

  // Получаем длительность видео при загрузке метаданных
  const handleLoadedMetadata = (videoId: number, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.duration && video.duration !== Infinity) {
      setVideoDurations(prev => ({
        ...prev,
        [videoId]: video.duration
      }));
    }
  };

  // Получаем конечное время для обрезки видео
  const getEndTime = (video: Video) => {
    if (!video.trimFromEnd) return null;

    const duration = videoDurations[video.id] || video.duration;
    if (duration && duration > video.trimFromEnd) {
      return duration - video.trimFromEnd;
    }
    return null;
  };

  // Обработчик времени воспроизведения
  const handleTimeUpdate = (videoId: number) => {
    const video = videoRefs.current[videoId];
    const videoData = VIDEOS_DATA.find(v => v.id === videoId);

    if (!video || !videoData?.trimFromEnd) return;

    const endTime = getEndTime(videoData);
    if (endTime && video.currentTime >= endTime) {
      video.pause();
      video.currentTime = 0;
      setCurrentlyPlaying(null);
    }
  };

  const handlePlay = (videoId: number) => {
    // Останавливаем все другие видео
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      const idNum = parseInt(id);
      if (idNum !== videoId && video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    setCurrentlyPlaying(videoId);
  };

  const handlePause = (videoId: number) => {
    if (currentlyPlaying === videoId) {
      setCurrentlyPlaying(null);
    }
  };

  const handleEnded = (videoId: number) => {
    if (currentlyPlaying === videoId) {
      setCurrentlyPlaying(null);
    }
  };

  // Фильтрация видео
  const filteredVideos = useMemo(() => VIDEOS_DATA.filter(video => {
    // Фильтр по типу
    if (selectedType !== "all" && video.type !== selectedType) {
      return false;
    }

    // Фильтр по поиску
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(query) ||
        (TYPE_LABELS[video.type]?.toLowerCase() || '').includes(query)
      );
    }

    return true;
  }), [searchQuery, selectedType]);

  // Пагинация
  const videosPerPage = window.innerWidth < 768 ? VIDEOS_PER_PAGE_MOBILE : VIDEOS_PER_PAGE_DESKTOP;
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    return filteredVideos.slice(startIndex, startIndex + videosPerPage);
  }, [filteredVideos, currentPage, videosPerPage]);

  // Сброс пагинации при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && currentPage > Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE_MOBILE)) {
        setCurrentPage(1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredVideos, currentPage]);

  return (
    <Container maxW="7xl" py={8} px={{ base: 0, xs: 4 }}>
      <Button
        as={Link}
        to={AppRoute.Index}
        mb={6}
        colorScheme="blue"
        variant="outline"
        leftIcon={<Text>←</Text>}
        ml={{ base: 2, xs: 0 }}
      >
        На главную
      </Button>

      <VStack spacing={4} mb={10} textAlign="center">
        <Heading color="blue.800" size={{ base: "xl", md: "2xl" }}>
          📹 Видео о здоровье
        </Heading>
        <Text color="blue.700" maxW="3xl" fontSize="lg" fontWeight={600}>
          Полезные советы, упражнения и научные факты в коротких видео
        </Text>

        {currentlyPlaying && (
          <Text fontSize="sm" color="blue.600" fontStyle="italic">
            🎬 Сейчас играет: {VIDEOS_DATA.find(v => v.id === currentlyPlaying)?.title}
          </Text>
        )}
      </VStack>

      {/* Фильтры и поиск */}
      <Box mb={8}>
        <Flex direction={{ base: "column", md: "row" }} gap={4} align="center">
          <InputGroup flex="1" maxW={{ base: "100%", md: "400px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Поиск по названию или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
            />
          </InputGroup>

          <HStack spacing={4} width={{ base: "100%", md: "auto" }}>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              bg="white"
              width={{ base: "100%", md: "250px" }}
            >
              <option value="all">Все категории</option>
              {videoTypes.map(type => (
                <option key={type} value={type}>
                  {TYPE_LABELS[type] || type}
                </option>
              ))}
            </Select>

            <Badge colorScheme="blue" fontSize="sm" p={2}>
              {filteredVideos.length} видео
            </Badge>
          </HStack>
        </Flex>
      </Box>

      {/* Сетка видео */}
      {paginatedVideos.length > 0 ? (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={6}
            mb={8}
          >
            {paginatedVideos.map((video) => (
              <Card
                key={video.id}
                bg={cardBg}
                borderWidth="2px"
                borderColor={currentlyPlaying === video.id ? "blue.400" : "gray.200"}
                overflow="hidden"
                transition="border-color 0.2s"
                _hover={{ borderColor: "blue.300" }}
              >
                <AspectRatio ratio={aspectRatio}>
                  <Box position="relative">
                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      src={video.src}
                      controls
                      preload="metadata"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#f0f0f0"
                      }}
                      onPlay={() => handlePlay(video.id)}
                      onPause={() => handlePause(video.id)}
                      onEnded={() => handleEnded(video.id)}
                      onTimeUpdate={() => handleTimeUpdate(video.id)}
                      onLoadedMetadata={(e) => handleLoadedMetadata(video.id, e)}
                    />

                    {currentlyPlaying === video.id && (
                      <Box
                        position="absolute"
                        top="2"
                        left="2"
                        bg="blue.500"
                        color="white"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="bold"
                        zIndex={1}
                      >
                        ▶ Играет
                      </Box>
                    )}

                    {/* Бейдж типа */}
                    <Box
                      position="absolute"
                      top="2"
                      right="2"
                      bg="green.500"
                      color="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="bold"
                      zIndex={1}
                      opacity={0.9}
                    >
                      {TYPE_LABELS[video.type] || video.type}
                    </Box>

                  </Box>
                </AspectRatio>
                <CardBody color='blue.700'>
                  <VStack align="stretch" spacing={2}>
                    <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                      {video.title}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Flex justify="center" mt={8} mb={8}>
              <HStack spacing={2}>
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  isDisabled={currentPage === 1}
                  size="sm"
                >
                  ←
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      colorScheme={currentPage === pageNum ? "blue" : "gray"}
                      size="sm"
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  isDisabled={currentPage === totalPages}
                  size="sm"
                >
                  →
                </Button>
              </HStack>

              <Text ml={4} fontSize="sm" color="gray.600" alignSelf="center">
                Страница {currentPage} из {totalPages}
              </Text>
            </Flex>
          )}
        </>
      ) : (
        <Center py={10}>
          <VStack spacing={4}>
            <Text fontSize="lg" color="gray.500">
              Видео не найдены
            </Text>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
              }}
              colorScheme="blue"
              variant="outline"
            >
              Сбросить фильтры
            </Button>
          </VStack>
        </Center>
      )}

      <VStack
        spacing={6}
        align="stretch"
        p={4}
        bg="blue.50"
        borderRadius="lg"
        borderLeftWidth="4px"
        borderLeftColor="blue.400"
        color='blue.800'
      >
        <Heading mb={6}>Правовая информация</Heading>
        <Box>
          <Heading size="md" mb={3}>Авторские права</Heading>
          <Text>
            Все видео материалы на этом сайте размещены исключительно в ознакомительных целях.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>DMCA / Запрос на удаление</Heading>
          <Text mb={3}>
            Если вы являетесь правообладателем и считаете, что размещение какого-либо материала
            нарушает ваши авторские права, пожалуйста, свяжитесь с нами для его удаления.
          </Text>
          <UnorderedList>
            <ListItem>Предоставьте доказательства авторских прав</ListItem>
            <ListItem>Укажите точные ссылки на контент</ListItem>
            <ListItem>Мы удалим материал в течение 24-48 часов</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Законодательство РБ</Heading>
          <Text>
            Наша деятельность осуществляется в соответствии с законодательством Республики Беларусь,
            в частности с Законом "Об авторском праве и смежных правах".
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};