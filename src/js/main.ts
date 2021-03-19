import Swiper from 'swiper/bundle';

import { Tabs } from './tabs';

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

const tabList: NodeListOf<HTMLElement> = document.querySelectorAll('[role="tablist"]');

if (tabList.length) {
	tabList.forEach(tabsEl => {
		const tabs = new Tabs(tabsEl);
		tabs.init();
	})
}
