import Swiper from 'swiper';
import { winWidth, rared } from './utils';


export function plansInit() {
    const plans = document.querySelector('.plans');
    const swiperContainer = plans.querySelector('.swiper-container');

    if (!plans || !swiperContainer) {
        return
    }

    const TABLET_MEDIA = 600;
    const DESKTOP_MEDIA = 900;
    const WIDE_MEDIA = 1045;
    const TABLET_SLIDES_PER_VIEW = 2;
    const DESKTOP_SLIDES_PER_VIEW = 3;
    const WIDE_SLIDES_PER_VIEW = 3;
    const SLIDES_COUNT = swiperContainer.querySelectorAll('.swiper-slide').length;

    if (SLIDES_COUNT <= 0) {
        return
    }

    let swiper = null;

    const initSwiper = function () {
        swiper = new Swiper(swiperContainer, {
            spaceBetween: 16,
            threshold: 10,
            autoHeight: true,
            breakpointsInverse: true,
            breakpoints: {
                600: {
                    spaceBetween: 20,
                    slidesPerView: TABLET_SLIDES_PER_VIEW,
                    slidesPerGroup: TABLET_SLIDES_PER_VIEW
                },
                900: {
                    spaceBetween: 30,
                    slidesPerView: DESKTOP_SLIDES_PER_VIEW,
                    slidesPerGroup: DESKTOP_SLIDES_PER_VIEW
                },
                1045: {
                    spaceBetween: 50,
                    slidesPerView: WIDE_SLIDES_PER_VIEW,
                    slidesPerGroup: WIDE_SLIDES_PER_VIEW
                }
            },
        });
    };

    const destroySwiper = function () {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    };

    const checkSwiper = function (minSlides) {
        if (minSlides >= SLIDES_COUNT) {
            destroySwiper();
        } else if (!swiper) {
            initSwiper();
        }
    };

    const controlSwiper = function () {
        const w = winWidth();

        if (w >= WIDE_MEDIA) {
            checkSwiper(WIDE_SLIDES_PER_VIEW);
        } else if (w >= DESKTOP_MEDIA) {
            checkSwiper(DESKTOP_SLIDES_PER_VIEW);
        } else if (w >= TABLET_MEDIA) {
            checkSwiper(TABLET_SLIDES_PER_VIEW);
        } else {
            checkSwiper(1);
        }
    };

    controlSwiper();

    window.addEventListener('resize', rared(function() {
        controlSwiper();
    }, 100));

    window.addEventListener('load', function () {
        setTimeout(function() {
            if (swiper) {
                swiper.update();
            }
        }, 1000);
    });
}
