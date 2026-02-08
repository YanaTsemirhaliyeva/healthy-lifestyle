export interface Video {
    id: number;
    title: string;
    src: string;
    type: string;
    duration?: number;
    trimFromEnd?: number;
}


export const VIDEOS_DATA: Video[] = [
    {
        id: 1,
        title: "#кишечник",
        src: 'video/1.mp4',
        type: 'healthy-food',
        duration: 56,
        trimFromEnd: 9
    },
    {
        id: 2,
        title: "#жир #жировые_отложения",
        src: 'video/2.mp4',
        type: 'healthy-food',
        duration: 71,
        trimFromEnd: 9
    },
    {
        id: 3,
        title: "#холестирин",
        src: 'video/3.mp4',
        type: 'healthy-food',
        duration: 61,
        trimFromEnd: 9
    },
    {
        id: 4,
        title: "#уровень_сахара #кровь",
        type: 'healthy-food',
        src: 'video/4.mp4'
    },
    {
        id: 5,
        title: "#отёки #вода #жидкость",
        type: 'useful-tips',
        src: 'video/5.mp4'
    },
    {
        id: 6,
        title: "#стереотипы",
        type: 'healthy-food',
        src: 'video/6.mp4'
    },
    {
        id: 7,
        title: "#массаж_лица",
        type: 'massage',
        src: 'video/7.mp4'
    },
    {
        id: 9,
        title: "#пищеварение #желудок",
        type: 'healthy-food',
        src: 'video/9.mp4'
    },
    {
        id: 11,
        title: "#беременность #здоровье_мамы",
        type: 'healthy-food',
        src: 'video/11.mp4',
        duration: 43,
        trimFromEnd: 8
    },
    {
        id: 12,
        title: "#чёрный_тмин #паразиты",
        type: 'healthy-food',
        src: 'video/12.mp4'
    },
    {
        id: 15,
        title: "#холестирин",
        src: 'video/15.mp4',
        type: 'healthy-food',
    },
    {
        id: 16,
        title: "#массаж_кисти",
        type: 'massage',
        src: 'video/16.mp4'
    },
    {
        id: 17,
        title: "#полезные_советы",
        type: 'useful-tips',
        src: 'video/17.mp4',
        duration: 40,
        trimFromEnd: 2
    },
    {
        id: 19,
        title: "#полезные_советы",
        type: 'useful-tips',
        src: 'video/19.mp4',
    },
    {
        id: 20,
        title: "#миома #кортизол",
        type: 'useful-tips',
        src: 'video/20.mp4',
        duration: 104,
        trimFromEnd: 13
    },
    {
        id: 21,
        title: "#кишечник #запах #газы",
        type: 'useful-tips',
        src: 'video/21.mp4'
    },
    {
        id: 22,
        title: "#полезные_советы #напитки",
        type: 'useful-tips',
        src: 'video/22.mp4',
    },
    {
        id: 23,
        title: "#полезные_советы #кожа",
        type: 'useful-tips',
        src: 'video/23.mp4',
    },
    {
        id: 24,
        title: "#полезные_советы",
        type: 'healthy-food',
        src: 'video/24.mp4',
        duration: 37,
        trimFromEnd: 2
    },
    {
        id: 25,
        title: "#полезные_советы #баня",
        type: 'useful-tips',
        src: 'video/25.mp4',
    },
    {
        id: 26,
        title: "#полезные_советы #вечернее_время",
        src: 'video/26.mp4',
        type: 'healthy-food',
        duration: 41,
        trimFromEnd: 3
    },
    {
        id: 27,
        title: "#полезные_советы #сердце #ОРВИ",
        type: 'useful-tips',
        src: 'video/27.mp4',
    },
    {
        id: 28,
        title: "#психология #грусть",
        type: 'psy',
        src: 'video/28.mp4',
    },
    {
        id: 29,
        title: "#квашеная_капуста #киви",
        type: 'useful-tips',
        src: 'video/29.mp4',
    },
    {
        id: 30,
        title: "#зубы #кариес",
        type: 'useful-tips',
        src: 'video/30.mp4',
    },
    {
        id: 31,
        title: "#кишечник #полезные_советы #газы",
        type: 'useful-tips',
        src: 'video/31.mp4',
        duration: 50,
        trimFromEnd: 4
    },
    {
        id: 32,
        title: "#никотин #зависимость",
        type: 'useful-tips',
        src: 'video/32.mp4',
    },
    {
        id: 33,
        title: "#полезные_советы #дом",
        type: 'useful-tips',
        src: 'video/33.mp4',
    },
    {
        id: 34,
        title: "#холестирин #сосуды",
        src: 'video/34.mp4',
        type: 'healthy-food',
    },
    {
        id: 35,
        title: "#кортизол #психосоматика",
        src: 'video/35.mp4',
        type: 'psy',
    },
    {
        id: 36,
        title: "#полезные_советы #напитки",
        type: 'useful-tips',
        src: 'video/36.mp4',
    },
    {
        id: 37,
        title: "#полезные_советы #волосы",
        type: 'useful-tips',
        src: 'video/37.mp4',
    },
    {
        id: 38,
        title: "#энергетики #вред",
        type: 'useful-tips',
        src: 'video/38.mp4',
    },
    {
        id: 39,
        title: "#щитовидная_железа",
        type: 'useful-tips',
        src: 'video/39.mp4',
        duration: 31,
        trimFromEnd: 3
    },
    {
        id: 40,
        title: "#смузи",
        src: 'video/40.mp4',
        type: 'healthy-food',
    },
    {
        id: 41,
        title: "#чай",
        type: 'useful-tips',
        src: 'video/41.mp4',
    },
    {
        id: 42,
        title: "#цветы",
        type: 'useful-tips',
        src: 'video/42.mp4',
    },
    {
        id: 43,
        title: "#цветы",
        type: 'useful-tips',
        src: 'video/43.mp4',
    },
    {
        id: 44,
        title: "#полезные_напитки #растения",
        type: 'useful-tips',
        src: 'video/44.mp4',
        duration: 47,
        trimFromEnd: 3
    },
    {
        id: 46,
        title: "#массаж_кисти",
        type: 'massage',
        src: 'video/46.mp4'
    },
    {
        id: 47,
        title: "#витамины",
        type: 'useful-tips',
        src: 'video/47.mp4',
        duration: 52,
        trimFromEnd: 7
    },
    {
        id: 48,
        title: "#гимнастика_для_глаз",
        type: 'massage',
        src: 'video/48.mp4'
    },
    {
        id: 49,
        title: "#головная_боль",
        type: 'massage',
        src: 'video/49.mp4'
    },
    {
        id: 50,
        title: "#вода #вода_во_время_еды",
        type: 'useful-tips',
        src: 'video/50.mp4',
    },
    {
        id: 51,
        title: "#тренировка_для_глаз",
        type: 'massage',
        src: 'video/51.mp4'
    },
    {
        id: 52,
        title: "#головная_боль #боль_в_шее",
        type: 'massage',
        src: 'video/52.mp4'
    },
    {
        id: 53,
        title: "#дыхательная_гимнастика",
        type: 'massage',
        src: 'video/53.mp4'
    },
    {
        id: 54,
        title: "#задержи_дыхание #проверь_свой_возраст",
        type: 'massage',
        src: 'video/54.mp4'
    },
    {
        id: 55,
        title: "#дыхательная_гимнастика #снижение_кортизола",
        type: 'massage',
        src: 'video/55.mp4'
    },
    {
        id: 57,
        title: "#звук #528",
        type: 'massage',
        src: 'video/57.mp4'
    },
    {
        id: 58,
        title: "#техника_дыхания #снижение_кортизола",
        type: 'massage',
        src: 'video/58.mp4'
    },
    {
        id: 59,
        title: "#розовый_шум #тревога",
        type: 'massage',
        src: 'video/59.mp4'
    },
    {
        id: 61,
        title: "#эмоции #состояние",
        src: 'video/61.mp4',
        type: 'psy',
    },
    {
        id: 63,
        title: "#гимнастика #двигай_пальцем",
        src: 'video/63.mp4',
        type: 'massage',
    },
    {
        id: 64,
        title: "#зрение #проверь_свой_возраст",
        type: 'massage',
        src: 'video/64.mp4'
    },
    {
        id: 65,
        title: "#сон",
        type: 'massage',
        src: 'video/65.mp4'
    },
    {
        id: 66,
        title: "#полезные_советы #лёд",
        type: 'useful-tips',
        src: 'video/66.mp4',
        duration: 40,
        trimFromEnd: 3
    },
    {
        id: 67,
        title: "#полезные_советы #обувь",
        type: 'useful-tips',
        src: 'video/67.mp4',
    },
    {
        id: 68,
        title: "#полезные_советы #волосы",
        type: 'useful-tips',
        src: 'video/68.mp4',
        duration: 49,
        trimFromEnd: 2
    },
    {
        id: 69,
        title: "#полезные_советы #головная_боль",
        type: 'useful-tips',
        src: 'video/69.mp4',
    },
    {
        id: 71,
        title: "#полезные_советы #уход",
        type: 'useful-tips',
        src: 'video/71.mp4',
    },
    {
        id: 72,
        title: "#полезные_советы #парфюм",
        type: 'useful-tips',
        src: 'video/72.mp4',
    },
    {
        id: 73,
        title: "#полезные_советы #волосы",
        type: 'useful-tips',
        src: 'video/73.mp4',
    },
    {
        id: 74,
        title: "#коллаген #возраст",
        type: 'massage',
        src: 'video/74.mp4'
    },
    {
        id: 75,
        title: "#полезные_советы #витамины",
        type: 'useful-tips',
        src: 'video/75.mp4',
    },
    {
        id: 76,
        title: "#тест #организм",
        type: 'massage',
        src: 'video/76.mp4'
    },
    {
        id: 77,
        title: "#микро_макро_элементы #витамины",
        type: 'useful-tips',
        src: 'video/77.mp4',
    },
    {
        id: 78,
        title: "#микро_макро_элементы #витамины",
        type: 'useful-tips',
        src: 'video/78.mp4',
    },
    {
        id: 79,
        title: "#магний #витамины",
        type: 'useful-tips',
        src: 'video/79.mp4',
    },
    {
        id: 80,
        title: "#тревожность #усталость #тяжесть",
        src: 'video/80.mp4',
        type: 'healthy-food',
    },
    {
        id: 81,
        title: "#полезные_жиры #дефицит_каллорий",
        src: 'video/81.mp4',
        type: 'healthy-food',
    },
    {
        id: 82,
        title: "#прогулка #ходьба",
        type: 'useful-tips',
        src: 'video/82.mp4',
    },
    {
        id: 83,
        title: "#спина #поясница",
        type: 'useful-tips',
        src: 'video/83.mp4',
    },
    {
        id: 84,
        title: "#сахар #глюкоза",
        src: 'video/84.mp4',
        type: 'healthy-food',
    },
    {
        id: 86,
        title: "#одиночество #психология",
        src: 'video/86.mp4',
        type: 'psy',
    },
    {
        id: 87,
        title: "#одиночество #психология",
        src: 'video/87.mp4',
        type: 'psy',
    },
    {
        id: 88,
        title: "#вода #полезные_советы",
        type: 'useful-tips',
        src: 'video/88.mp4',
    },
    {
        id: 89,
        title: "#ошибки #зож #печень",
        type: 'useful-tips',
        src: 'video/89.mp4',
    },
    {
        id: 90,
        title: "#гормоны #лишний_вес",
        type: 'useful-tips',
        src: 'video/90.mp4',
    },
    {
        id: 91,
        title: "#полезные_советы #поздний_приём_пищи",
        type: 'useful-tips',
        src: 'video/91.mp4',
    },
    {
        id: 92,
        title: "#полезные_советы #мышцы #жир",
        type: 'useful-tips',
        src: 'video/92.mp4',
    },
    {
        id: 93,
        title: "#полезные_советы #кардио #жир",
        type: 'useful-tips',
        src: 'video/93.mp4',
    },
    {
        id: 94,
        title: "#холестирин",
        src: 'video/94.mp4',
        type: 'healthy-food',
    },
    {
        id: 95,
        title: "#кишечник #антибиотики",
        src: 'video/95.mp4',
        type: 'healthy-food',
    },
    {
        id: 96,
        title: "#чай #напитки",
        src: 'video/96.mp4',
        type: 'healthy-food',
    },
    {
        id: 97,
        title: "#массаж_лица",
        type: 'massage',
        src: 'video/97.mp4'
    },
    {
        id: 98,
        title: "#массаж_ног",
        type: 'massage',
        src: 'video/98.mp4'
    },
    {
        id: 99,
        title: "#куркумин #напитки",
        src: 'video/99.mp4',
        type: 'healthy-food',
    },
    {
        id: 101,
        title: "#польза #фрукты",
        src: 'video/101.mp4',
        type: 'healthy-food',
    },
    {
        id: 102,
        title: "#никатин #зависимость",
        src: 'video/102.mp4',
        type: 'useful-tips',
    },
    {
        id: 103,
        title: "#органы #советы",
        src: 'video/103.mp4',
        type: 'useful-tips',
    },
    {
        id: 104,
        title: "#польза #еда #советы",
        src: 'video/104.mp4',
        type: 'healthy-food',
    },
    {
        id: 105,
        title: "#польза #еда #советы",
        src: 'video/105.mp4',
        type: 'healthy-food',
        duration: 47,
        trimFromEnd: 3,
    },
    {
        id: 106,
        title: "#смузи",
        src: 'video/106.mp4',
        type: 'healthy-food',
        duration: 39,
        trimFromEnd: 3,
    },
    {
        id: 109,
        title: "#соль #советы",
        src: 'video/109.mp4',
        type: 'useful-tips',
        duration: 23,
        trimFromEnd: 4,
    },
    {
        id: 110,
        title: "#лимфа #советы #движение",
        src: 'video/110.mp4',
        type: 'useful-tips',
    },
    {
        id: 111,
        title: "#еда_как_лекарство",
        src: 'video/111.mp4',
        type: 'healthy-food',
    },
    {
        id: 113,
        title: "#напитки",
        src: 'video/113.mp4',
        type: 'healthy-food',
    },
    {
        id: 114,
        title: "#лавровый_лист #советы",
        src: 'video/114.mp4',
        type: 'useful-tips',
        duration: 32,
        trimFromEnd: 2,
    },
    {
        id: 115,
        title: "#запах #домашние_советы",
        src: 'video/115.mp4',
        type: 'useful-tips',
    },
    {
        id: 117,
        title: "#напитки",
        src: 'video/117.mp4',
        type: 'healthy-food',
        duration: 50,
        trimFromEnd: 3,
    },
];