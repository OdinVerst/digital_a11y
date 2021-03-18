import Swiper from 'swiper/bundle';

const swiper = new Swiper('.banner-js', {
	slidesPerView: 1,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	a11y: {
		prevSlideMessage: 'Показать предыдущий слайд',
		nextSlideMessage: 'Показать следующий слайд',
	},
});

console.log(swiper);

console.log('Connect JS');
