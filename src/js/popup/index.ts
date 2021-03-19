export class Popup {
	private popupItem: HTMLElement;
	private lastFocus: any;
	private focusableItems: NodeListOf<HTMLInputElement>;

	constructor(popupItem: HTMLElement, lastFocus: HTMLButtonElement) {
		this.popupItem = popupItem;
		this.lastFocus = lastFocus;
		this.focusableItems = this.popupItem.querySelectorAll('input:not([type="hidden"]), button')
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this._keyupHandler = this._keyupHandler.bind(this);
		this._clickOverlayHandler = this._clickOverlayHandler.bind(this);
		this._trapFocus = this._trapFocus.bind(this);
	}

	_trapFocus(evt: FocusEvent) {
		const { relatedTarget } = evt;
		if (relatedTarget instanceof HTMLElement && relatedTarget === this.focusableItems[this.focusableItems.length - 1]) {
			this.focusableItems[0].focus()
		}
	}

	close() {
		this.popupItem.classList.remove('active');
		this.removeListeners();
	}

	open() {
		this.popupItem.classList.add('active');
		this.focusableItems[0]?.focus();

		this.setListeners();
	}

	setListeners() {
		document.addEventListener('keyup', this._keyupHandler);
		document.addEventListener('click', this._clickOverlayHandler);
		document.addEventListener('focus', this._trapFocus, true);
	}

	removeListeners() {
		document.removeEventListener('keyup', this._keyupHandler);
		document.removeEventListener('click', this._clickOverlayHandler);
		document.removeEventListener('focus', this._trapFocus);
	}

	_keyupHandler(evt: KeyboardEvent) {
		if (evt.code === 'Escape') {
			this.close();
			this.lastFocus.focus();
		}
	}

	_clickOverlayHandler(evt: Event) {
		const { target } = evt;
		if (target instanceof HTMLElement && !target.closest('.auth__content') && target.closest('.auth')) {
			this.close();
			this.lastFocus.focus();
		}
	}
}
