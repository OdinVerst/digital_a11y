import Swiper from 'swiper/bundle';

import { Tabs } from './tabs';
import { Video } from './video';

const swiper = new Swiper('.banner-js', {
	slidesPerView: 1,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	a11y: {
		prevSlideMessage: 'Показать предыдущий слайд',
		nextSlideMessage: 'Показать следующий слайд'
	}
});

const tabList: NodeListOf<HTMLElement> = document.querySelectorAll('[role="tablist"]');
tabList.forEach(tabsEl => {
	const tabs = new Tabs(tabsEl);
	tabs.init();
});

const videos: NodeListOf<HTMLElement> = document.querySelectorAll('.video');
videos.forEach(videoItem => {
	const video = new Video(videoItem);
	video.init();
});

const skipBtn = document.querySelector('.skip');
if (skipBtn) {
	skipBtn.addEventListener('click', () => {
		skipBtn.setAttribute('tabindex', '-1')
	})
}
