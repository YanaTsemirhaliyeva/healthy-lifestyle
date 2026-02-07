import { RepeatIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Progress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { WheelItemI } from '~/consts/consts';

import { WheelResultModal } from './FortuneResultModal';
import {
  DEFAULT_WHEEL_CONFIG,
  drawWheel,
  WheelConfig
} from './utils';
import {
  addUsedItem,
  getRandomUnusedItem,
  getWheelHistory,
  getWheelStats,
  isItemUsed,
  resetWheelHistory
} from './wheel-history';

interface FortuneWheelProps {
  items: WheelItemI[];
  config?: Partial<WheelConfig>;
  wheelId: string; // 'health', 'exercise', 'recipes'
}

export const FortuneWheelComponent = ({
  items,
  config = {},
  wheelId
}: FortuneWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<WheelItemI | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<WheelItemI | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [stats, setStats] = useState(() => {
    const filteredItems = items.filter(item => item.category === wheelId);
    return getWheelStats(wheelId, filteredItems);
  });
  const [historyItems, setHistoryItems] = useState<WheelItemI[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useToast();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wheelConfig: WheelConfig = {
    ...DEFAULT_WHEEL_CONFIG,
    ...config,
  };

  const filteredItems = items.filter(item => item.category === wheelId);

  const getCategoryIndices = (): Map<number, number> => {
    const indicesMap = new Map<number, number>();
    
    // задания текущей категории по ID
    const sortedItems = [...filteredItems].sort((a, b) => a.id - b.id);
    
    sortedItems.forEach((item, index) => {
      indicesMap.set(item.id, index + 1);
    });
    
    return indicesMap;
  };

  const getItemCategoryIndex = (item: WheelItemI | null): number => {
    if (!item) return -1;
    
    const categoryItems = items.filter(i => i.category === item.category);

    const sortedItems = [...categoryItems].sort((a, b) => a.id - b.id);

    return sortedItems.findIndex(i => i.id === item.id);
  };


  const loadHistoryItems = () => {
    const history = getWheelHistory(wheelId);
    const usedItems = history.usedItemIds
      .map(id => items.find(item => item.id === id))
      .filter((item): item is WheelItemI => 
        item !== undefined && item.category === wheelId
      )
      .reverse();

    setHistoryItems(usedItems);
  };

  useEffect(() => {
    loadHistoryItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const categoryIndices = getCategoryIndices();

    drawWheel(
      canvas,
      filteredItems, 
      rotation,
      wheelConfig,
      (itemId) => isItemUsed(wheelId, itemId),
      categoryIndices 
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, items, wheelConfig, wheelId]); 

  const spinWheelAnimation = (
    selectedItem: WheelItemI,
    duration: number = 3000
  ) => {
    const startRotation = rotation;

    const sliceAngle = (2 * Math.PI) / filteredItems.length;
    const halfSliceAngle = sliceAngle / 2;
    const pointerAngle = -Math.PI / 2;

    const selectedIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const segmentCenter = selectedIndex * sliceAngle + halfSliceAngle;

    const fullSpins = 3 + Math.floor(Math.random() * 6);
    const targetRotation = pointerAngle - segmentCenter + fullSpins * 2 * Math.PI;

    const distance = targetRotation - startRotation;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + distance * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        addUsedItem(wheelId, selectedItem.id);

        const newStats = getWheelStats(wheelId, filteredItems);
        setStats(newStats);
        loadHistoryItems();

        setResult(selectedItem);
        const itemIndex = getItemCategoryIndex(selectedItem);
        setSelectedItemIndex(itemIndex);
        setSelectedModalItem(selectedItem);

        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setIsModalOpen(false);

    const selectedItem = getRandomUnusedItem(wheelId, filteredItems);
    spinWheelAnimation(selectedItem);
  };

  const handleRandomItem = () => {
    const randomItem = getRandomUnusedItem(wheelId, filteredItems);

    addUsedItem(wheelId, randomItem.id);

    const newStats = getWheelStats(wheelId, filteredItems);
    setStats(newStats);
    
    loadHistoryItems();

    setResult(randomItem);
    const itemIndex = getItemCategoryIndex(randomItem);
    setSelectedItemIndex(itemIndex);
    setSelectedModalItem(randomItem);
    setIsModalOpen(true);
  };

  const handleResetHistory = () => {
    resetWheelHistory(wheelId);

    const newStats = getWheelStats(wheelId, filteredItems);
    setStats(newStats);
    
    setResult(null);
    setHistoryItems([]);

    toast({
      title: '🔄 История сброшена!',
      description: `История для "${wheelId}" сброшена`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const openResultModal = (item: WheelItemI) => {
    const itemIndex = getItemCategoryIndex(item);
    
    setSelectedModalItem(item);
    setSelectedItemIndex(itemIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModalItem(null);
    setSelectedItemIndex(-1);
  };

  return (
    <>
      <Container maxW="6xl" py={8} px={0}>

        <VStack spacing={8} align="center">
          <Heading color="blue.700" textAlign="center">
            🎡 Колесо Фортуны - {wheelId === 'health' ? 'ЗОЖ' :
              wheelId === 'exercise' ? 'Упражнения' :
                'Рецепты ПП'}
          </Heading>

          {/* Прогресс выполнения */}
          <Box w="100%" maxW="2xl">
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="bold" color="gray.700">
                Прогресс в этой категории:
              </Text>
              <Text fontWeight="bold" color={stats.completionPercentage === 100 ? 'green.500' : 'blue.500'}>
                {stats.completionPercentage}% ({stats.usedItems}/{stats.totalItems})
              </Text>
            </Flex>
            <Progress
              value={stats.completionPercentage}
              colorScheme={stats.completionPercentage === 100 ? 'green' : 'blue'}
              size="lg"
              borderRadius="full"
              mb={3}
            />

            {stats.needReset ? (
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <AlertDescription>
                  🎉 Поздравляем! Вы получили все задания в этой категории.
                </AlertDescription>
              </Alert>
            ) : stats.availableItems === 1 ? (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertDescription>
                  ⚠️ Осталось всего 1 задание в этой категории!
                </AlertDescription>
              </Alert>
            ) : null}
          </Box>

          {/* Колесо */}
          <Box position="relative">
            <canvas
              ref={canvasRef}
              width={wheelConfig.size}
              height={wheelConfig.size}
              style={{
                maxWidth: '100%',
                height: 'auto',
                filter: isSpinning ? 'brightness(1.1)' : 'none',
                transition: 'filter 0.3s',
              }}
            />
          </Box>

          {/* Текущий результат (если есть) */}
          {result && (
            <Box
              w="100%"
              maxW="2xl"
              bg="green.50"
              p={6}
              borderRadius="lg"
              borderWidth={2}
              borderColor="green.200"
              textAlign="center"
              cursor="pointer"
              onClick={() => openResultModal(result)}
              _hover={{
                bg: 'green.100',
                transition: 'all 0.3s'
              }}
            >
              <Flex align="center" justify="center" mb={3} flexWrap={{base: 'wrap', xs: 'nowrap'}}>
                <Badge colorScheme="green" fontSize="md" mr={3}>
                  🔥 Текущее
                </Badge>
                <Heading size="lg" color="green.700">
                  Ваш результат:
                </Heading>
              </Flex>
              <Text fontSize="xl" fontWeight="bold" color="green.800">
                Задание #{getItemCategoryIndex(result) + 1}: {result.title}
              </Text>
              <Text mt={3} color="gray.600" fontSize="sm">
                Нажмите, чтобы посмотреть подробности
              </Text>
            </Box>
          )}

          {/* Кнопки управления */}
          <Flex gap={4} wrap="wrap" justify="center">
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSpinWheel}
              isLoading={isSpinning}
              loadingText="Крутится..."
              leftIcon={<RepeatIcon />}
              isDisabled={isSpinning}
            >
              Крутить колесо!
            </Button>

            <Button
              colorScheme="blue"
              size="lg"
              variant="outline"
              onClick={handleRandomItem}
              isDisabled={isSpinning}
            >
              Случайная задача
            </Button>

            <Button
              colorScheme="orange"
              size="lg"
              variant="ghost"
              onClick={handleResetHistory}
              isDisabled={isSpinning}
            >
              Сбросить историю
            </Button>
          </Flex>

          {/* История выпавших заданий */}
          {historyItems.length > 0 && (
            <Box w="100%" maxW="2xl" mt={8}>
              <Heading size="md" mb={4} color="gray.700">
                📜 История выпавших заданий:
              </Heading>
              <VStack align="stretch" spacing={3}>
                {result && result.id !== historyItems[0]?.id && (
                  <Flex
                    bg="blue.50"
                    p={4}
                    borderRadius="md"
                    borderLeftWidth={4}
                    borderLeftColor="blue.400"
                    align="center"
                    cursor="pointer"
                    onClick={() => openResultModal(result)}
                    _hover={{ bg: 'blue.100' }}
                  >
                    <Badge colorScheme="blue" mr={3}>
                      🔥 Текущее
                    </Badge>
                    <Badge colorScheme="blue" mr={3}>
                      #{getItemCategoryIndex(result) + 1}
                    </Badge>
                    <Text fontWeight="bold" color="gray.700" flex={1}>
                      {result.title}
                    </Text>
                  </Flex>
                )}

                {/* Остальная история */}
                {historyItems.map((item, index) => {
                  const itemIndex = getItemCategoryIndex(item);
                  return (
                    <Flex
                      key={`${item.id}-${index}`}
                      bg={index === 0 && result?.id !== item.id ? 'gray.50' : 'gray.50'}
                      p={3}
                      borderRadius="md"
                      borderLeftWidth={4}
                      borderLeftColor={index === 0 && result?.id !== item.id ? 'blue.300' : 'gray.300'}
                      align="center"
                      cursor="pointer"
                      onClick={() => openResultModal(item)}
                      _hover={{ bg: 'gray.100' }}
                    >
                      <Badge
                        colorScheme="gray"
                        mr={3}
                        opacity={0.7}
                      >
                        #{historyItems.length - index}
                      </Badge>
                      <Badge
                        colorScheme="blue"
                        mr={3}
                      >
                        Задание {itemIndex + 1}
                      </Badge>
                      <Text
                        color="gray.700"
                        flex={1}
                        fontSize={index === 0 && result?.id !== item.id ? 'md' : 'sm'}
                        fontWeight={index === 0 && result?.id !== item.id ? '500' : 'normal'}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                  );
                })}
              </VStack>

              {/* Статистика внизу истории */}
              <Flex
                justify="space-between"
                mt={4}
                p={3}
                bg="blue.50"
                borderRadius="md"
              >
                <Text fontSize="sm" color="gray.600">
                  Всего выпало: <Badge colorScheme="blue">{historyItems.length}</Badge>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Осталось: <Badge colorScheme="purple">{stats.availableItems}</Badge>
                </Text>
              </Flex>
            </Box>
          )}

          {/* Сообщение если история пуста */}
          {historyItems.length === 0 && !result && (
            <Box w="100%" maxW="2xl" mt={8} p={6} bg="gray.50" borderRadius="lg" textAlign="center">
              <Text color="gray.600" mb={3}>
                🎯 Покрутите колесо, чтобы получить первое задание!
              </Text>
              <Text fontSize="sm" color="gray.500">
                Здесь будет отображаться история всех выпавших заданий
              </Text>
            </Box>
          )}
        </VStack>
      </Container>

      {/* Модальное окно для просмотра задания */}
      <WheelResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedModalItem}
        itemIndex={selectedItemIndex}
      />
    </>
  );
};