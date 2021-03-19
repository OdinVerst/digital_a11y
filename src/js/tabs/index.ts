export class Tabs {
	private tab: HTMLElement;
	private tabFocus: number;

	constructor(tab: HTMLElement) {
		this.tab = tab;
		this.tabFocus = 0;
	}

	init() {
		this.tab.addEventListener('click', (e) => this.clickHandler(e));
		this.tab.addEventListener('keydown', (e) => this.keyHandler(e));
	}

	clickHandler(event: Event) {
		const { target } = event;
		const wrapper = this.tab.parentNode;
		if (target instanceof HTMLElement && target.getAttribute('role') === 'tab' && wrapper) {
			// Remove all current selected tabs
			wrapper.querySelectorAll('[aria-selected="true"]').forEach((t => t.setAttribute('aria-selected', 'false')));
			// Set this tab as selected
			target.setAttribute('aria-selected', 'true');
			// Hide all tab panels
			wrapper.querySelectorAll('[role="tabpanel"]').forEach((p => p.setAttribute('hidden', 'true')));
			// Show the selected panel
			wrapper.querySelector(`#${target.getAttribute('aria-controls')}`)?.removeAttribute('hidden');
		}
	}

	keyHandler(event: KeyboardEvent) {
		const tabs: NodeListOf<HTMLElement> = this.tab.querySelectorAll('[role="tab"]');
		const { code } = event;
		if (code === 'ArrowLeft' || code === 'ArrowRight') {
			tabs[this.tabFocus].setAttribute('tabindex', '-1');

			if (code === 'ArrowRight') {
				console.log(this.tabFocus);
				this.tabFocus++;
				if (this.tabFocus >= tabs.length) {
					this.tabFocus = 0;
				}
			}
			if (code === 'ArrowLeft') {
				this.tabFocus--;
				if (this.tabFocus < 0) {
					this.tabFocus = tabs.length - 1;
				}
			}
			tabs[this.tabFocus].setAttribute('tabindex', '0');
			tabs[this.tabFocus].focus();
		}
	}
}




