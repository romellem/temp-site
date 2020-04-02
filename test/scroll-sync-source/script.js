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

let sticky = document.querySelector('.sticky');
let testScroll = new Impulsion({
  source: sticky,
  onUpdate(x, y, px, py) {
    if (py == null) {
      keytruda_scrollable.scrollBy(0, -y);
      lenvima_scrollable.scrollBy(0, -y);
    } else {
      let dy = y - py;
      keytruda_scrollable.scrollBy(0, -dy);
      lenvima_scrollable.scrollBy(0, -dy);
    }
  },
  // Reset values back to 0 when we are done scrolling
  onEndDecelerating() {
    testScroll.setValues(0, 0, null, null);
  },
});
