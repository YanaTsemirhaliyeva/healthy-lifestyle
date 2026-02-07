import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link } from "react-router";

import { AppRoute } from "~/consts/consts";

interface Video {
  id: number;
  title: string;
  src: string;
  duration?: number;
  trimFromEnd?: number;
}

export const VideoPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [videoDurations, setVideoDurations] = useState<Record<number, number>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  
  const videos: Video[] = [
    { id: 1, title: "", src: 'video/1.mp4', duration: 56, trimFromEnd: 9 },
    { id: 2, title: "", src: 'video/2.mp4', duration: 71, trimFromEnd: 9 },
    { id: 3, title: "", src: 'video/3.mp4', duration: 61, trimFromEnd: 9 },
    { id: 4, title: "", src: 'video/4.mp4' },
    { id: 5, title: "", src: 'video/5.mp4' },
    { id: 6, title: "", src: 'video/6.mp4' }
  ];

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
    
    const duration = videoDurations[video.id];
    if (duration && duration > video.trimFromEnd) {
      return duration - video.trimFromEnd;
    }
    return null;
  };

  // Обработчик времени воспроизведения
  const handleTimeUpdate = (videoId: number) => {
    const video = videoRefs.current[videoId];
    const videoData = videos.find(v => v.id === videoId);
    
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

  return (
    <Container maxW="7xl" py={8} px={{base: 1, xs: 4}}>
      <Button 
        as={Link} 
        to={AppRoute.Index} 
        mb={6} 
        colorScheme="blue" 
        variant="outline"
        leftIcon={<Text>←</Text>}
      >
        На главную
      </Button>
      <VStack spacing={4} mb={10} textAlign="center">
        <Heading color="blue.800" size={{ base: "xl", md: "2xl" }}>
          🥦 Забавные овощи
        </Heading>
        <Text color="blue.700" maxW="3xl" fontSize="lg" fontWeight={600}>
          AI-генерация: овощи рассказывают о своей пользе с юмором
        </Text>
        
        {currentlyPlaying && (
          <Text fontSize="sm" color="blue.600" fontStyle="italic">
            🎬 Сейчас играет: {videos.find(v => v.id === currentlyPlaying)?.title}
           
          </Text>
        )}
      </VStack>

      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3 }} 
        spacing={6}
      >
        {videos.map((video) => (
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
                </Box>
              </AspectRatio>
              <CardBody>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>

    </Container>
  );
};