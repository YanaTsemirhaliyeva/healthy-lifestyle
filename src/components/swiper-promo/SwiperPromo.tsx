import './swiper-promo.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Banner } from '../banner/banner';


export const SwiperPromo = () => {

  const promoList = [
    {
      id: 1,
      src: 'img/banner/cornflowers-2.webp',
      title: 'Кожная пятница - роднае сваё'
    },
        {
      id: 2,
      src: 'img/banner/pink-flowers.webp',
      title: '2026 - Год белорусской женщины'
    }
  ];

  return (
    <Swiper
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {promoList.length > 0 && promoList.map((item) => (
        <SwiperSlide key={item.id} data-testid='swiper'>
          <Banner item={item}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
