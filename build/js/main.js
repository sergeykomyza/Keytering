
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HEADER
const headerLogic = () => {
    const header = document.querySelector('.header')
    const toggleMobileMenu = document.querySelector('.js-mMenuToggle ')
    const menu = document.querySelector('.menu')
    toggleMobileMenu.addEventListener('click', function(){
        this.classList.toggle('is-open')
        menu.classList.toggle('is-open')
    })
    $('.menu__link').click(function () {
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top
        }, 1000);
        if(document.documentElement.clientWidth < 768){
            menu.classList.remove('is-open')
            toggleMobileMenu.classList.remove('is-open')
        }
    });
    function headerActiveToggle() {
        const scrollSize = window.pageYOffset
        scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
    }
    window.addEventListener('load', headerActiveToggle) 
    window.addEventListener('scroll', headerActiveToggle) 
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.js-sliderFormat', {
        pagination: {
            el: ".formats__pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + "0" +(index + 1) + "</span>";
            },
        },
        navigation: {
            nextEl: '.formats__navbtn--next',
            prevEl: '.formats__navbtn--prev',
        },
    });
    const swiper2 = new Swiper('.js-sliderPresent', {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
        },
    })
    const swiper3 = new Swiper('.js-sliderCatalog', {
        speed: 800,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 15,
        grabCursor: true,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        breakpoints: {
            768: {
               slidesPerView: 5, 
               spaceBetween: 20
            }
        }
    })
    const swiper4 = new Swiper('.js-sliderPlace', {
        effect: "cube",
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".place__slider .swiper-btn-next",
            prevEl: ".place__slider .swiper-btn-prev",
        },
    })
    const swiper5 = new Swiper('.js-sliderCases', {
        speed: 800,
        loop: true,
        slidesPerView: "auto",
        // spaceBetween: 122,
        grabCursor: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".cases__slider .swiper-btn-next",
            prevEl: ".cases__slider .swiper-btn-prev",
        },
    })
}

Fancybox.bind('[data-fancybox="gallery"]', {
    placeFocusBack: false,
});
Fancybox.bind('[data-fancybox="cases"]', {
    placeFocusBack: false,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODAL
const modal = ()=> {
    document.querySelectorAll('.js-openModal').forEach( item => {
        const attr = item.dataset.src
        item.addEventListener('click', function(){
            console.log(attr)
            document.querySelector(attr).classList.add('is-active')
        })
        document.querySelector(attr).querySelector('.js-closeModal').addEventListener('click', function(){
            document.querySelector(attr).classList.remove('is-active')
        })
    })
    
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ACCORDEON
const accordeons = (box, item, header, content, openedClass, closedClass) => {
    const accordeon = document.querySelector(box)

    const accItem = accordeon.querySelectorAll(item)

    accItem.forEach(item => { // перебираем все блоки аккордеона
        const accContent = item.querySelector(content)
        accContent.style.cssText = `
        overflow: hidden;
        transition: all .3s;
      `
        item.className = closedClass
        accContent.style.maxHeight = 0
        item.addEventListener('click', toggle)
    });

    accItem[0].className = openedClass
    accItem[0].querySelector(content).style.maxHeight = accItem[0].querySelector(content).scrollHeight + 'px'

    function toggle(e) {
        let target = e.target
        e.preventDefault()
        const thisClass = this.className
        const itsAccHeader = target == this.querySelector(header) || this.querySelector(header).contains(target)
        const accHeader = this.querySelector(header)
        const accContent = this.querySelector(content)

        accItem.forEach(item => {
            const accHeader = item.querySelector(header)
            const accContent = item.querySelector(content)
            if (itsAccHeader) {
                item.className = closedClass
                accContent.style.maxHeight = 0
            }
        });

        if (thisClass == closedClass) {
            this.className = openedClass
            this.querySelector(content).style.maxHeight = this.querySelector(content).scrollHeight + 'px'
        }

    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GSAP
function GsapAnimationScrubSections(animationElem, animationTrigger) {
    let distance = document.documentElement.clientWidth > 768 ? 800 : 300
    gsap.from(animationElem, {
        y: 200,
        scrollTrigger: {
            pin: false,
            trigger: animationTrigger,
            start: "top bottom",
            end: `+=${distance}`,
            scrub: 2,
            markers: false,
            id: '1'
        }
    });
}
function GsapAnimationTitles(animationElem, animationTrigger) {
    gsap.from(animationElem, {
        y: -200,
        scrollTrigger: {
            pin: false,
            trigger: animationTrigger,
            start: "top 80%",
            end: " 300px bottom",
            scrub: false,
            markers: false,
            toggleActions: "play none resume reverse",
            id: '1'
        }
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
headerLogic()
inputMask()
sliders()
modal()
accordeons('.places', '.place', '.place__head', '.place__body', 'place opened', 'place closed');
GsapAnimationScrubSections('.about', '.about')
GsapAnimationScrubSections('.formats .container', '.formats')
GsapAnimationScrubSections('.catalog', '.catalog')
GsapAnimationScrubSections('.places .container', '.places')
GsapAnimationScrubSections('.cases', '.cases')
GsapAnimationScrubSections('#contacts', '#contacts')
GsapAnimationTitles(".present__title",".present")
GsapAnimationTitles(".about__title",".about")
GsapAnimationTitles(".formats__title",".formats__title")
GsapAnimationTitles(".catalog__title",".catalog__title")
GsapAnimationTitles(".places__title",".places__title")
GsapAnimationTitles(".cases__title",".cases__title")
GsapAnimationTitles(".order-form__title",".order-form__title")