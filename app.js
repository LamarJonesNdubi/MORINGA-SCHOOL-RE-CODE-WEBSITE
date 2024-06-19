document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        initializeSplide('testimonials-splide', 1, 1, false, false, false);
        initializeSplide('stories-splide', 3, 1, false, false, false);
        initializeSplide('tms-splide', 1, 1, false, false, false);
        initializeSplide('case-studies-splide', 1, 1, false, false, false);
        initializeSplide('partners-splide', 1, 1, false, false, false);
        initializeSplide('our-journey-splide', 4, 1, false, true, true);

        function initializeSplide(id, perPageDesktop, perPageMobile, hasArrows, cover, hasPadding) {
            if (document.getElementById(id)) {
                /**
                 * Check is Splide is defined
                 */
                if (typeof Splide === 'function') {

                    let options = {
                        cover: cover,
                        type: 'loop',
                        perPage: perPageDesktop,
                        arrows: hasArrows,
                        autoplay: true,
                        gap: 20,
                        classes: {
                            arrow : 'splide__arrow text-primary bg-white shadow-xl',
                            page : 'splide__pagination__page bg-secondary',
                        },
                        breakpoints: {
                            640: {
                                perPage: perPageMobile,
                            },
                        }
                    };

                    if (hasPadding) {
                        options.padding = {
                            right: '5rem',
                            left : '5rem',
                        };
                        options.breakpoints = {
                            640: {
                                perPage: perPageMobile,
                                padding: {
                                    right: '1rem',
                                    left: '1rem',
                                }
                            },
                        }
                    }

                    new Splide(`#${id}`, options).mount();

                } else {
                    console.log(`${id} Splide is not defined`)
                }
            }
        }

        let splides = document.querySelectorAll('.ms-splide');
        if (splides.length && typeof Splide === 'function') {
            splides.forEach(function (_splide) {
                let options = {};

                let showArrows = _splide.dataset.arrows;
                if(typeof showArrows === 'undefined')
                    showArrows = true

                let perPage = _splide.dataset.count;
                if (typeof perPage === 'undefined')
                    perPage = 1

                let perPageMobile = _splide.dataset.countMobile;
                if (typeof perPageMobile === 'undefined')
                    perPageMobile = 1

                let dots = _splide.dataset.dots;
                if (typeof dots === 'undefined')
                    dots = true

                let marquee = _splide.dataset.marquee;
                if (typeof marquee === 'undefined')
                    marquee = false

                let slider_type = _splide.dataset.type;
                if (typeof slider_type === 'undefined')
                    slider_type = 'loop'

                let direction = _splide.dataset.direction;
                if (typeof direction === 'undefined')
                    direction = 'ltr'

                let wheel = _splide.dataset.wheel;
                if (typeof wheel === 'undefined')
                    wheel = false

                let hasPadding = _splide.dataset.padding;
                if (hasPadding) {
                    options.padding = {
                        right: '5rem',
                        left : '5rem',
                    };
                }

                let gap = _splide.dataset.gap;

                options.autoplay = true;
                options.lazyLoad = 'nearby';
                options.perPage = parseInt(perPage);
                options.pagination = JSON.parse(dots);
                options.arrows = JSON.parse(showArrows);
                options.direction = direction;
                options.wheel = JSON.parse(wheel);
                options.type = slider_type
                options.classes = {
                    arrow : 'splide__arrow text-primary bg-white shadow-xl',
                    page : 'splide__pagination__page bg-secondary',
                }

                options.breakpoints = {
                    640: {
                        padding: false
                    },
                }

                options.breakpoints[640].perPage = perPageMobile;
                options.breakpoints[640].arrows = false;
                options.breakpoints[640].pagination = true;

                if (marquee) {
                    options.autoplay = true
                    options.speed = 1000
                    options.easing = 'linear'
                    options.autoWidth = true
                }

                if (typeof gap === 'undefined') {
                    options.breakpoints[640].gap = 20;
                    options.gap = 40;
                } else {
                    options.breakpoints[640].gap = parseInt(gap);
                    options.gap = parseInt(gap);
                }

                new Splide(_splide, options).mount();
            })

        }

        if (typeof GLightbox === 'function') {
            var lightbox = GLightbox({
                selector: '.glightbox'
            });
        }

        if (typeof MicroModal === 'object') {
            MicroModal.init();
        }

        if (typeof Accordion === 'function') {
            const accordions = Array.from(document.querySelectorAll('.accordion-container'));
            new Accordion(accordions, {});
        }

        /**
         * Mobile Menu
         * @param selector
         */
        function dynamicCurrentMenuClass(selector) {
            let FileName = window.location.href.split("/").reverse()[0];

            selector.querySelectorAll("li").forEach(function (child) {
                let anchor = child.querySelector("a");
                if (anchor.getAttribute('href') === FileName) {
                    anchor.classList.add("current");
                }
            });
            // if any li has .current elmnt add class
            selector.querySelectorAll("li").forEach(function (child) {
                if (child.querySelector(".current")) {
                    child.classList.add("current");
                }
            });
            // if no file name return
            if ("" == FileName) {
                selector.querySelectorAll("li").forEach(function(child) {
                    child.classList.add("current");
                })
            }
        }

        let main_menu_list = document.querySelector('.main-menu__list');
        let mobile_menu_list = document.querySelector('.mobile-nav__container .main-menu__list');

        if (main_menu_list) {
            dynamicCurrentMenuClass(main_menu_list);
        }

        if (mobile_menu_list) {
            let dropdownAnchor = document.querySelectorAll('.mobile-nav__container .main-menu__list .dropdown > a');
            dropdownAnchor.forEach(function (anchor) {
                let toggleBtn = document.createElement("BUTTON");
                toggleBtn.classList.add('bg-secondary', 'text-white')
                toggleBtn.setAttribute("aria-label", "dropdown toggler");
                toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>';
                anchor.append(toggleBtn);

                anchor.querySelectorAll('button').forEach(function (button) {
                    button.addEventListener('click', e => {
                        e.preventDefault();
                        button.classList.toggle("expanded");
                        button.parentElement.classList.toggle("expanded");


                        if (typeof slidetoggle !== 'undefined') {
                            let dropdown_menu = button.parentElement.parentElement.querySelector('ul');
                            slidetoggle.toggle(dropdown_menu, {
                                miliseconds: 300,
                                transitionFunction: 'ease-in-out',
                                onAnimationStart: () => {

                                },
                                onAnimationEnd: () => {

                                },
                            },);
                        }
                    })
                });
            });
        }


        /**
         * Toggle Mobile Menu
         * @type {NodeListOf<Element>}
         */
        let mobile_menu_togglers = document.querySelectorAll('.mobile-nav__toggler');
        let mobile_menu = document.querySelector('.mobile-nav__wrapper');
        if (mobile_menu_togglers && mobile_menu) {
            mobile_menu_togglers.forEach(function (toggler) {
                toggler.addEventListener('click', event => {
                    mobile_menu.classList.toggle('expanded')
                });
            })
        }

        //Initialize AOS Animation library
        // AOS.init();

        /**
         *
         */
        const _tabs = document.querySelectorAll('[data-tab]');
        const _content = document.getElementsByClassName('tab-content-active');
        const toggleContent = function(e) {
            const target = e.target

            Array.from(_tabs).forEach( tabItem => {
                if (tabItem !== target) {
                    tabItem.classList.remove('tab-nav-active');
                }
            });

            if (!target.classList.contains("tab-nav-active")) {
                Array.from(_content).forEach( tabContent => {
                    tabContent.classList.remove('tab-content-active');
                });
                target.classList.add('tab-nav-active');
                let currentTab = target.getAttribute('data-tab');
                if (currentTab) {
                    let _tabContent = document.getElementById(currentTab);
                    _tabContent.classList.add('tab-content-active');
                }

            }
        };
        Array.from(_tabs).forEach( item => {
            item.addEventListener('click', function (e) {
                e.preventDefault()
                toggleContent(e)
            });
        });
    }
};