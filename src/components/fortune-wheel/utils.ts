import { WheelItemI } from "~/consts/consts";

export interface WheelConfig {
    size: number;
    radius: number;
    center: number;
    segmentColors: string[];
    borderColors: string[];
}

export const DEFAULT_WHEEL_CONFIG: WheelConfig = {
    size: 500,
    radius: 200,
    center: 250,
    segmentColors: ['#E53E3E', '#38A169', '#FFFFFF'],
    borderColors: ['#C53030', '#2F855A', '#E2E8F0'],
};

//Отрисовка колеса фортуны
export const drawWheel = (
    canvas: HTMLCanvasElement,
    items: WheelItemI[],
    rotation: number,
    config: WheelConfig = DEFAULT_WHEEL_CONFIG,
    isItemUsed?: (itemId: number) => boolean,
    categoryIndices?: Map<number, number> // item.id -> индекс в категории (1-based)
): void => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { size, radius, center } = config;

    // Очищаем canvas
    ctx.clearRect(0, 0, size, size);

    // Рисуем колесо
    const sliceAngle = (2 * Math.PI) / items.length;
    const halfSliceAngle = sliceAngle / 2;

    items.forEach((item, index) => {
        const startAngle = index * sliceAngle + rotation;
        const endAngle = (index + 1) * sliceAngle + rotation;

        const colorIndex = index % 3;
        let color = config.segmentColors[colorIndex];
        let borderColor = config.borderColors[colorIndex];

        // Если задание уже использовано - делаем его бледнее
        const used = isItemUsed && isItemUsed(item.id);
        if (used) {
            // Добавляем прозрачность для использованных заданий
            color = color.replace(')', ', 0.4)').replace('rgb', 'rgba');
            borderColor = borderColor.replace(')', ', 0.4)').replace('rgb', 'rgba');
        }

        // Сегмент
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Текст - только индекс в категории
        ctx.save();

        const textAngle = startAngle + halfSliceAngle;
        const textRadius = radius - 30;
        const x = center + Math.cos(textAngle) * textRadius;
        const y = center + Math.sin(textAngle) * textRadius;

        ctx.translate(x, y);
        ctx.rotate(textAngle + Math.PI/2);

        // Цвет текста - для использованных делаем серым
        ctx.fillStyle = used ? '#718096' : (colorIndex === 2 ? '#2D3748' : '#FFFFFF');
        ctx.shadowColor = used ? 'transparent' : (colorIndex === 2 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)');
        ctx.shadowBlur = used ? 0 : 2;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 24px Arial'; // Увеличиваем размер для цифр

        // Получаем индекс в категории
        let displayNumber = (index + 1).toString(); // fallback
        if (categoryIndices && categoryIndices.has(item.id)) {
            displayNumber = categoryIndices.get(item.id)!.toString();
        }
        
        // Рисуем индекс
        ctx.fillText(displayNumber, 0, 0);

        // Если задание использовано - добавляем галочку
        if (used) {
            ctx.fillStyle = '#38A169';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('✓', 25, 0);
        }

        ctx.shadowColor = 'transparent';
        ctx.restore();
    });

    // Центр колеса
    drawWheelCenter(ctx, center);

    // Указатель
    drawWheelPointer(ctx, center);
};


/**
 * Отрисовка центра колеса
 */
const drawWheelCenter = (ctx: CanvasRenderingContext2D, center: number): void => {
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, 2 * Math.PI);

    const centerGradient = ctx.createRadialGradient(
        center, center, 0,
        center, center, 20
    );
    centerGradient.addColorStop(0, '#FFFFFF');
    centerGradient.addColorStop(1, '#CBD5E0');

    ctx.fillStyle = centerGradient;
    ctx.fill();

    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 3;
    ctx.stroke();
};

/**
 * Отрисовка указателя колеса
 */
const drawWheelPointer = (ctx: CanvasRenderingContext2D, center: number): void => {
    const pointerY = 30;

    ctx.beginPath();
    ctx.moveTo(center, pointerY + 60);
    ctx.lineTo(center - 25, pointerY);
    ctx.lineTo(center + 25, pointerY);
    ctx.closePath();

    // ЗОЛОТОЙ градиент
    const pointerGradient = ctx.createLinearGradient(
        center, pointerY,
        center, pointerY + 60
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
    ctx.moveTo(center, pointerY + 50);
    ctx.lineTo(center, pointerY + 10);
    ctx.strokeStyle = 'rgba(246, 224, 94, 0.9)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Блик
    ctx.beginPath();
    ctx.moveTo(center, pointerY + 45);
    ctx.lineTo(center - 12, pointerY + 18);
    ctx.lineTo(center + 12, pointerY + 18);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 250, 205, 0.4)';
    ctx.fill();
};

/**
 * Запуск вращения колеса с анимацией
 */
export const spinWheel = (
    items: WheelItemI[],
    currentRotation: number,
    onRotationChange: (rotation: number) => void,
    onSpinComplete: (selectedItem: WheelItemI) => void,
    duration: number = 3000
): void => {
    // Выбираем случайный элемент
    const newSelectedIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[newSelectedIndex];

    // Рассчитываем угол
    const sliceAngle = (2 * Math.PI) / items.length;
    const halfSliceAngle = sliceAngle / 2;
    const pointerAngle = -Math.PI / 2;
    const segmentCenter = newSelectedIndex * sliceAngle + halfSliceAngle;

    // Полные обороты для эффекта
    const fullSpins = 3 + Math.floor(Math.random() * 6);
    const targetRotation = pointerAngle - segmentCenter + fullSpins * 2 * Math.PI;

    // Анимация
    const startRotation = currentRotation;
    const distance = targetRotation - startRotation;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing функция
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentRotation = startRotation + distance * easeOut;

        onRotationChange(currentRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Небольшая задержка перед вызовом колбека
            setTimeout(() => {
                onSpinComplete(selectedItem);
            }, 100); // 100мс задержка для плавности
        }
    };

    requestAnimationFrame(animate);
};

/**
 * Получение элемента под указателем
 */
export const getCurrentItemUnderPointer = (
    items: WheelItemI[],
    rotation: number
): WheelItemI => {
    const sliceAngle = (2 * Math.PI) / items.length;
    const halfSliceAngle = sliceAngle / 2;
    const pointerAngle = -Math.PI / 2;

    // Нормализуем rotation
    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Находим ближайший элемент
    let minDistance = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < items.length; i++) {
        const segmentCenter = (i * sliceAngle + halfSliceAngle + normalizedRotation) % (2 * Math.PI);
        let distance = Math.abs(segmentCenter - pointerAngle);

        if (distance > Math.PI) {
            distance = 2 * Math.PI - distance;
        }

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }

    return items[closestIndex];
};

/**
 * Получение случайного элемента
 */
export const getRandomItem = (items: WheelItemI[]): WheelItemI => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
};