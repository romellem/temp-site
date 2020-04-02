// Good enough for iOS, which is what we are targetting
const IS_TOUCH_DEVICE = 'ontouchstart' in window;

let button = document.getElementById('tick');
let keytruda_ssi = 1;
let lenvima_ssi = 1;

let keytruda_breakpoints = document.querySelectorAll('.keytruda [data-ssi]');
let lenvima_breakpoints = document.querySelectorAll('.lenvima [data-ssi]');
let max_keytruda_ssi = [...keytruda_breakpoints].reduce((acc, li) => parseInt(li.getAttribute('data-ssi'), 10), 0);
let max_lenvima_ssi = [...lenvima_breakpoints].reduce((acc, li) => parseInt(li.getAttribute('data-ssi'), 10), 0);

let keytruda_scrollable = document.querySelector('.keytruda-scrollable');
keytruda_scrollable.previousScrollTop = 0;
let lenvima_scrollable = document.querySelector('.lenvima-scrollable');
lenvima_scrollable.previousScrollTop = 0;

const increment = () => {
  keytruda_ssi++;
  lenvima_ssi++;
  if (keytruda_ssi > max_keytruda_ssi) keytruda_ssi = 1;
  if (lenvima_ssi > max_lenvima_ssi) lenvima_ssi = 1;
};

button.addEventListener('click', e => {
  increment();

  document.querySelector(`.keytruda [data-ssi="${keytruda_ssi}"]`)?.scrollIntoView();
  document.querySelector(`.lenvima [data-ssi="${lenvima_ssi}"]`)?.scrollIntoView();
});

let hover_on_event = IS_TOUCH_DEVICE ? 'touchstart' : 'mouseenter';
let hover_off_event = IS_TOUCH_DEVICE ? 'touchend' : 'mouseleave';

const syncElements = (thisElement, otherElement) => {
	let thisElementScrollHandler = function(e) {
		// console.log("Syncing...");
		let current_position = this.scrollTop;
		let amount_scrolled_by = current_position - this.previousScrollTop;
		this.previousScrollTop = current_position;

		let otherPreviousScrollTop = otherElement.scrollTop;
		// otherElement.scrollBy(0, amount_scrolled_by);
		otherElement.scrollTop += amount_scrolled_by;
		const other_scrolled_by = otherElement.scrollTop - otherPreviousScrollTop;
		if (amount_scrolled_by !== other_scrolled_by) {
			console.log('Unequal scroll amounts!');
			console.log(`This scrolled by ${amount_scrolled_by}, other scrolled by ${otherElement.scrollTop - otherPreviousScrollTop}`);
			const difference = amount_scrolled_by - other_scrolled_by;
			otherElement.scrollTop += difference;
		}
		
		
	};

	const turnOnSync = function(e) {
		console.log("Sync'd!");
		this.previousScrollTop = this.scrollTop;
		this.addEventListener('scroll', thisElementScrollHandler);
	};
	const turnOffSync = function(e) {
		console.log("Unsync'd!");
		this.previousScrollTop = this.scrollTop;
		this.removeEventListener('scroll', thisElementScrollHandler);
	};
	thisElement.addEventListener(hover_on_event, turnOnSync);
	thisElement.addEventListener(hover_off_event, turnOffSync);
	
	// return turnOffSync.bind(thisElement);
};

syncElements(keytruda_scrollable, lenvima_scrollable);
syncElements(lenvima_scrollable, keytruda_scrollable);

