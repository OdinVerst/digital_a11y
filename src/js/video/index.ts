const classNames = {
	link: 'video__link',
	media: 'video__media',
	button: 'video__button'
}

export class Video {
	private video: HTMLElement;
	private link: HTMLElement | null;
	private readonly media: HTMLElement | null;
	private button: HTMLElement | null;
	private readonly id: string | null;
	private isOpen: boolean;
	constructor(video: HTMLElement) {
		this.video = video;
		this.link = this.video.querySelector(`.${classNames.link}`);
		this.media = this.video.querySelector(`.${classNames.media}`);
		this.button = this.video.querySelector(`.${classNames.button}`);
		this.id = this._parseMediaURL(this.media);
		this.isOpen = false;
	}

	init() {
		this.video.addEventListener('click', () => {
			if (this.isOpen) return;
			let iframe = this._createIframe();

			this.isOpen = true;
			this.link?.remove();
			this.button?.remove();
			this.video.appendChild(iframe);
		});

		this.link?.removeAttribute('href');
		this.video.classList.add('video--enabled');
	}

	_createIframe() {
		let iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', this._generateURL());
		iframe.classList.add(classNames.media);

		return iframe;
	}

	_generateURL(): string {
		return 'https://www.youtube.com/embed/' + this.id + '?rel=0&showinfo=0&autoplay=1';
	}

	_parseMediaURL(media: HTMLElement | null) {
		let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
		if (media && media instanceof HTMLImageElement) {
			let url = media.src;
			let match = url.match(regexp);
			return !(match) ? '' : match[1];
		}
		return '';
	}
}
