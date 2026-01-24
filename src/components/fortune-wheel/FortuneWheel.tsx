import { RepeatIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { AppRoute, HEALTH_PHRASES } from '~/consts/consts';

export const FortuneWheelComponent = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);
    const [phraseHistory, setPhraseHistory] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const toast = useToast();

    // Размеры канваса
    const CANVAS_SIZE = 500;
    const CENTER = CANVAS_SIZE / 2;
    const RADIUS = CANVAS_SIZE / 2 - 50;

    // Инициализация колеса
    useEffect(() => {
        drawWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rotation]);

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Очищаем canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Цвета для сегментов
        const SEGMENT_COLORS = ['#E53E3E', '#38A169', '#FFFFFF'];
        const BORDER_COLORS = ['#C53030', '#2F855A', '#E2E8F0'];

        // Рисуем колесо
        const sliceAngle = (2 * Math.PI) / HEALTH_PHRASES.length;
        const halfSliceAngle = sliceAngle / 2;

        HEALTH_PHRASES.forEach((phrase, index) => {
            const startAngle = index * sliceAngle + rotation;
            const endAngle = (index + 1) * sliceAngle + rotation;

            const colorIndex = index % 3;
            const color = SEGMENT_COLORS[colorIndex];
            const borderColor = BORDER_COLORS[colorIndex];

            // Сегмент
            ctx.beginPath();
            ctx.moveTo(CENTER, CENTER);
            ctx.arc(CENTER, CENTER, RADIUS, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Текст - радиальный (перпендикулярно радиусу)
            ctx.save();

            // Угол для текста (середина сегмента)
            const textAngle = startAngle + halfSliceAngle;

            // Позиция текста (ближе к краю)
            const textRadius = RADIUS - 30;
            const x = CENTER + Math.cos(textAngle) * textRadius;
            const y = CENTER + Math.sin(textAngle) * textRadius;

            // Перемещаемся к позиции текста
            ctx.translate(x, y);

            ctx.rotate(textAngle + Math.PI / 2);
            ctx.rotate(Math.PI / 2);

            // Цвет текста
            ctx.fillStyle = colorIndex === 2 ? '#2D3748' : '#FFFFFF';
            ctx.shadowColor = colorIndex === 2 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 2;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 12px Arial';

            // Обрезаем текст
            const maxLength = 20;
            const displayText = phrase.length > maxLength
                ? phrase.substring(0, maxLength) + '...'
                : phrase;

            // Рисуем текст
            ctx.fillText(displayText, 45, 0);

            ctx.shadowColor = 'transparent';
            ctx.restore();
        });

        // Центр колеса
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, 20, 0, 2 * Math.PI);

        const centerGradient = ctx.createRadialGradient(
            CENTER, CENTER, 0,
            CENTER, CENTER, 20
        );
        centerGradient.addColorStop(0, '#FFFFFF');
        centerGradient.addColorStop(1, '#CBD5E0');

        ctx.fillStyle = centerGradient;
        ctx.fill();

        ctx.strokeStyle = '#718096';
        ctx.lineWidth = 3;
        ctx.stroke();

        // === УКАЗАТЕЛЬ ВВЕРХУ ===
        const pointerY = 30;

        ctx.beginPath();
        ctx.moveTo(CENTER, pointerY + 60);
        ctx.lineTo(CENTER - 25, pointerY);
        ctx.lineTo(CENTER + 25, pointerY);
        ctx.closePath();

        // ЗОЛОТОЙ градиент
        const pointerGradient = ctx.createLinearGradient(
            CENTER, pointerY,
            CENTER, pointerY + 60
        );
        pointerGradient.addColorStop(0, '#FEFCBF');
        pointerGradient.addColorStop(0.4, '#FAF089');
        pointerGradient.addColorStop(0.7, '#F6E05E');
        pointerGradient.addColorStop(1, '#D69E2E');

        ctx.fillStyle = pointerGradient;
        ctx.fill();

        ctx.strokeStyle = '#B7791F';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Линия для объема
        ctx.beginPath();
        ctx.moveTo(CENTER, pointerY + 50);
        ctx.lineTo(CENTER, pointerY + 10);
        ctx.strokeStyle = 'rgba(246, 224, 94, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Блик
        ctx.beginPath();
        ctx.moveTo(CENTER, pointerY + 45);
        ctx.lineTo(CENTER - 12, pointerY + 18);
        ctx.lineTo(CENTER + 12, pointerY + 18);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 250, 205, 0.4)';
        ctx.fill();
    };

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setResult(null);

        // 1. Сначала выбираем случайную фразу
        const newSelectedIndex = Math.floor(Math.random() * HEALTH_PHRASES.length);
        const selectedPhrase = HEALTH_PHRASES[newSelectedIndex];

        console.log('Выбрана фраза:', newSelectedIndex, selectedPhrase);

        // 2. Рассчитываем угол для этой фразы
        const sliceAngle = (2 * Math.PI) / HEALTH_PHRASES.length;
        const halfSliceAngle = sliceAngle / 2;

        // Указатель находится вверху (угол -π/2 = 270°)
        const pointerAngle = -Math.PI / 2;

        // Центр выбранного сегмента (без учета текущего rotation)
        const segmentCenter = newSelectedIndex * sliceAngle + halfSliceAngle;

        // Нужно, чтобы после вращения: segmentCenter + finalRotation = pointerAngle (по модулю 2π)
        // finalRotation = pointerAngle - segmentCenter (по модулю 2π)

        // Полные обороты для эффекта
        const fullSpins = 3 + Math.floor(Math.random() * 6);

        // Целевой угол вращения
        // Мы хотим, чтобы после вращения: (segmentCenter + targetRotation) % (2π) = pointerAngle
        // Поэтому: targetRotation = pointerAngle - segmentCenter + fullSpins * 2π
        const targetRotation = pointerAngle - segmentCenter + fullSpins * 2 * Math.PI;

        console.log('Параметры вращения:');
        console.log('Выбранный индекс:', newSelectedIndex);
        console.log('Центр сегмента (град):', (segmentCenter * 180 / Math.PI).toFixed(1));
        console.log('Угол указателя (град):', (pointerAngle * 180 / Math.PI).toFixed(1));
        console.log('Целевой rotation (град):', (targetRotation * 180 / Math.PI).toFixed(1));

        // 3. Анимация
        const startRotation = rotation;
        const distance = targetRotation - startRotation;
        const duration = 3000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing функция
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentRotation = startRotation + distance * easeOut;

            setRotation(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Проверяем, какая фраза сейчас под указателем
                const currentPhrase = getCurrentPhraseUnderPointer();
                console.log('После вращения под указателем:', currentPhrase);

                // Показываем результат
                setResult(selectedPhrase);
                setPhraseHistory(prev => [selectedPhrase, ...prev.slice(0, 4)]);
                setIsSpinning(false);

                toast({
                    title: '🎯 Ваша задача на сегодня!',
                    description: selectedPhrase,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            }
        };

        requestAnimationFrame(animate);
    };

    // Функция для получения текущей фразы под указателем
    const getCurrentPhraseUnderPointer = () => {
        const sliceAngle = (2 * Math.PI) / HEALTH_PHRASES.length;
        const halfSliceAngle = sliceAngle / 2;
        const pointerAngle = -Math.PI / 2;

        // Нормализуем rotation в диапазоне [0, 2π)
        const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Для каждого сегмента проверяем расстояние до указателя
        let minDistance = Infinity;
        let closestIndex = 0;

        for (let i = 0; i < HEALTH_PHRASES.length; i++) {
            // Центр текущего сегмента с учетом rotation
            const segmentCenter = (i * sliceAngle + halfSliceAngle + normalizedRotation) % (2 * Math.PI);

            // Расстояние от центра сегмента до указателя
            let distance = Math.abs(segmentCenter - pointerAngle);

            // Учитываем круговую природу углов
            if (distance > Math.PI) {
                distance = 2 * Math.PI - distance;
            }

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        console.log('Проверка: под указателем индекс', closestIndex,
            'расстояние', (minDistance * 180 / Math.PI).toFixed(1), 'град');

        return HEALTH_PHRASES[closestIndex];
    };

    const getRandomPhrase = () => {
        const randomIndex = Math.floor(Math.random() * HEALTH_PHRASES.length);
        const randomPhrase = HEALTH_PHRASES[randomIndex];
        setResult(randomPhrase);
        setPhraseHistory(prev => [randomPhrase, ...prev.slice(0, 4)]);

        toast({
            title: '✨ Случайная задача!',
            description: randomPhrase,
            status: 'info',
            duration: 4000,
            isClosable: true,
        });
    };


    return (
        <Container maxW="6xl" py={8}>
            <Button as={Link} to={AppRoute.Index} mb={6} colorScheme="teal" variant="outline">
                ← Назад к тестам
            </Button>

            <VStack spacing={8} align="center">
                <Heading color="teal.600" textAlign="center">
                    🎡 Колесо ЗОЖ Фортуны
                </Heading>

                <Text color="gray.600" textAlign="center" maxW="2xl">
                    Крутите колесо, чтобы получить случайную задачу для поддержания здорового образа жизни!
                    Выполняйте выпавшие задания каждый день для улучшения самочувствия.
                </Text>

                {/* Статистика */}
                <Flex gap={4} wrap="wrap" justify="center">
                    <Badge colorScheme="green" fontSize="lg" p={2}>
                        Всего заданий: {HEALTH_PHRASES.length}
                    </Badge>
                    <Badge colorScheme="blue" fontSize="lg" p={2}>
                        История: {phraseHistory.length}
                    </Badge>
                    <Badge colorScheme="purple" fontSize="lg" p={2}>
                        🎯 Попробуйте все!
                    </Badge>
                </Flex>

                {/* Колесо */}
                <Box position="relative">
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_SIZE}
                        height={CANVAS_SIZE}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            filter: isSpinning ? 'brightness(1.1)' : 'none',
                            transition: 'filter 0.3s',
                        }}
                    />
                </Box>

                {/* Результат */}
                {result && (
                    <Box
                        bg="green.50"
                        p={6}
                        borderRadius="lg"
                        borderWidth={2}
                        borderColor="green.200"
                        maxW="2xl"
                        textAlign="center"
                    >
                        <Heading size="lg" color="green.700" mb={3}>
                            🎉 Ваша задача:
                        </Heading>
                        <Text fontSize="xl" fontWeight="bold" color="green.800">
                            {result}
                        </Text>
                        <Text mt={3} color="gray.600">
                            Постарайтесь выполнить это задание сегодня!
                        </Text>
                    </Box>
                )}

                {/* Кнопки управления */}
                <Flex gap={4} wrap="wrap" justify="center">
                    <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={spinWheel}
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
                        onClick={getRandomPhrase}
                        isDisabled={isSpinning}
                    >
                        Случайная задача
                    </Button>
                </Flex>

                {/* История заданий */}
                {phraseHistory.length > 0 && (
                    <Box w="100%" maxW="2xl" mt={8}>
                        <Heading size="md" mb={4} color="gray.700">
                            📜 История заданий:
                        </Heading>
                        <VStack align="stretch" spacing={2}>
                            {phraseHistory.map((phrase, index) => (
                                <Flex
                                    key={index}
                                    bg={index === 0 ? 'blue.50' : 'gray.50'}
                                    p={3}
                                    borderRadius="md"
                                    borderLeftWidth={4}
                                    borderLeftColor={index === 0 ? 'blue.400' : 'gray.300'}
                                    align="center"
                                >
                                    <Text fontWeight={index === 0 ? 'bold' : 'normal'} color="gray.700">
                                        {index === 0 ? '🔥 Текущее: ' : `#${index + 1}: `}
                                        {phrase}
                                    </Text>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>
                )}

                {/* Подсказки */}
                <Box bg="yellow.50" p={4} borderRadius="lg" maxW="2xl">
                    <Heading size="sm" mb={2} color="yellow.700">
                        💡 Советы:
                    </Heading>
                    <Text color="gray.700">
                        1. Крутите колесо утром, чтобы определить задачу на день<br />
                        2. Выполняйте задания последовательно<br />
                        3. Отмечайте выполненные задачи в календаре<br />
                        4. Поделитесь задачей с друзьями для мотивации
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};