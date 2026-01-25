import './swiper-promo.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Banner } from '../banner/banner';
import cornflowersImg from './images/cornflowers-2.webp';
import pinkFlowersImg from './images/pink-flowers.webp';


export const SwiperPromo = () => {

  const promoList = [
    {
      id: 1,
      src: cornflowersImg ,
      title: 'Кожная пятница - роднае, сваё'
    },
        {
      id: 2,
      src: pinkFlowersImg,
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
