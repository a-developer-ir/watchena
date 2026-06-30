// =========================================
// 1. AOS Animation Initialization
// =========================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });
}

// =========================================
// 2. Auth Page Logic (Safe Check)
// =========================================
const authModalTitle = document.getElementById('authModalTitle');

if (authModalTitle) {
    const mainAuthSection = document.getElementById('mainAuthSection');
    const forgotPasswordSection = document.getElementById('forgotPasswordSection');
    const registerSection = document.getElementById('registerSection');
    const otpVerificationSection = document.getElementById('otpVerificationSection');

    const tabOtp = document.getElementById('tabOtp');
    const tabPassword = document.getElementById('tabPassword');
    const formOtp = document.getElementById('formOtp');
    const formPassword = document.getElementById('formPassword');

    const goToForgotBtn = document.getElementById('goToForgotBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const goToRegisterBtn = document.getElementById('goToRegisterBtn');
    const backToLoginFromRegisterBtn = document.getElementById('backToLoginFromRegisterBtn');
    const requestOtpBtn = document.getElementById('requestOtpBtn');
    const editPhoneBtn = document.getElementById('editPhoneBtn');

    const phoneInputForOtp = document.getElementById('phoneInputForOtp');
    const displayUserPhone = document.getElementById('displayUserPhone');

    function hideAllSections() {
        mainAuthSection.style.display = 'none';
        forgotPasswordSection.style.display = 'none';
        registerSection.style.display = 'none';
        otpVerificationSection.style.display = 'none';
    }

    tabOtp.addEventListener('click', function () {
        tabOtp.classList.add('active');
        tabPassword.classList.remove('active');
        formOtp.style.display = 'block';
        formPassword.style.display = 'none';
    });

    tabPassword.addEventListener('click', function () {
        tabPassword.classList.add('active');
        tabOtp.classList.remove('active');
        formPassword.style.display = 'block';
        formOtp.style.display = 'none';
    });

    goToForgotBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideAllSections();
        forgotPasswordSection.style.display = 'block';
        authModalTitle.innerText = 'بازیابی رمز عبور';
    });

    goToRegisterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideAllSections();
        registerSection.style.display = 'block';
        authModalTitle.innerText = 'ثبت‌نام';
    });

    requestOtpBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const phoneValue = phoneInputForOtp.value || 'شما';
        displayUserPhone.innerText = phoneValue;

        hideAllSections();
        otpVerificationSection.style.display = 'block';
        authModalTitle.innerText = 'تایید شماره موبایل';
    });

    function resetToLoginState() {
        hideAllSections();
        mainAuthSection.style.display = 'block';
        authModalTitle.innerText = 'ورود به حساب';

        tabOtp.classList.add('active');
        tabPassword.classList.remove('active');
        formOtp.style.display = 'block';
        formPassword.style.display = 'none';
    }

    backToLoginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetToLoginState();
    });

    backToLoginFromRegisterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetToLoginState();
    });

    editPhoneBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetToLoginState();
    });
}

// =========================================
// 3. Index Page Logic: Mobile Menu
// =========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');

function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

// =========================================
// 4. Index Page Logic: Main Hero Slider
// =========================================
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
    const sliderDots = document.querySelectorAll('.slider-dot');
    const btnPrev = document.querySelector('.slider-arrow.right');
    const btnNext = document.querySelector('.slider-arrow.left');

    const sliderImages = [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1920&q=80'
    ];

    let currentSlide = 0;
    let slideInterval;

    function updateSlide(index) {
        heroSlider.style.opacity = '0.5';
        setTimeout(() => {
            heroSlider.style.backgroundImage = `url('${sliderImages[index]}')`;
            heroSlider.style.opacity = '1';
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 200);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        updateSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
        updateSlide(currentSlide);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => { nextSlide(); resetInterval(); });
        btnPrev.addEventListener('click', () => { prevSlide(); resetInterval(); });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
            resetInterval();
        });
    });

    slideInterval = setInterval(nextSlide, 5000);
}

// =========================================
// 5. Index Page Logic: Horizontal Carousel
// =========================================
const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

carouselWrappers.forEach(wrapper => {
    const productRow = wrapper.querySelector('.product-row');
    const rightBtn = wrapper.querySelector('.carousel-scroll-btn.right');
    const leftBtn = wrapper.querySelector('.carousel-scroll-btn.left');

    const updateButtonsVisibility = () => {
        if (!productRow || !rightBtn || !leftBtn) return;

        const currentScroll = Math.abs(Math.round(productRow.scrollLeft));
        const maxScroll = productRow.scrollWidth - productRow.clientWidth;

        if (currentScroll <= 5) {
            rightBtn.classList.add('hidden');
        } else {
            rightBtn.classList.remove('hidden');
        }

        if (currentScroll >= maxScroll - 5) {
            leftBtn.classList.add('hidden');
        } else {
            leftBtn.classList.remove('hidden');
        }
    };

    if (productRow) {
        productRow.addEventListener('scroll', updateButtonsVisibility);
        window.addEventListener('resize', updateButtonsVisibility);
        setTimeout(updateButtonsVisibility, 100);
    }

    if (rightBtn && leftBtn && productRow) {
        leftBtn.addEventListener('click', () => {
            const cardWidth = productRow.querySelector('.product-card').offsetWidth;
            productRow.scrollBy({ left: -(cardWidth + 25), behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            const cardWidth = productRow.querySelector('.product-card').offsetWidth;
            productRow.scrollBy({ left: (cardWidth + 25), behavior: 'smooth' });
        });
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    if (productRow) {
        productRow.addEventListener('mousedown', (e) => {
            isDown = true;
            productRow.classList.add('dragging');
            startX = e.pageX - productRow.offsetLeft;
            scrollLeft = productRow.scrollLeft;
        });

        productRow.addEventListener('mouseleave', () => {
            isDown = false;
            productRow.classList.remove('dragging');
        });

        productRow.addEventListener('mouseup', () => {
            isDown = false;
            productRow.classList.remove('dragging');
        });

        productRow.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - productRow.offsetLeft;
            const walk = (x - startX) * 1.5;
            productRow.scrollLeft = scrollLeft - walk;
        });
    }
});

// =========================================
// 6. Index Page Logic: Countdown Timers
// =========================================
const timerElements = document.querySelectorAll('.card-timer');

if (timerElements.length > 0) {
    timerElements.forEach(timerEl => {
        let timeInSeconds = parseInt(timerEl.getAttribute('data-time'), 10);

        setInterval(() => {
            if (timeInSeconds <= 0) return;

            timeInSeconds--;

            let h = Math.floor(timeInSeconds / 3600);
            let m = Math.floor((timeInSeconds % 3600) / 60);
            let s = timeInSeconds % 60;

            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            timerEl.innerHTML = `<span>زمان باقی‌مانده:</span> ${h}:${m}:${s}`;
        }, 1000);
    });
}