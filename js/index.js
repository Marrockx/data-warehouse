const slides = document.getElementsByClassName('testimonial-card');

const totalSlides = slides.length;

let sliderDots = document.getElementsByClassName('testimonial-dots-indicator');
let slideOne = document.querySelector('.dot-one');
let slideTwo = document.querySelector('.dot-two');
let slideThree = document.querySelector('.dot-three');

let previousSlide = document.querySelector('.previous-slide-control');
let nextSlide = document.querySelector('.next-slide-control');


let slidePosition = 0;

// console.log(totalSlides);

slideOne.addEventListener('click', () => {
    slidePosition = 0;
    updateSlidePosition();
});

slideTwo.addEventListener('click', () => {
    slidePosition = 1;
    updateSlidePosition();
});

slideThree.addEventListener('click', () => {
    slidePosition = 2;
    updateSlidePosition();
});


previousSlide.addEventListener('click', prevSlide);
nextSlide.addEventListener('click', nextSlider);




function currentSlide(slideCount) {
    showSlides(slidePosition = slideCount);
}

function prevSlide() {
    // console.log('clicked')
    goToPrevSlide();

}

function nextSlider() {
    goToNextSlide();
    // console.log('forward click')
}

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove("card-visible");
        slide.classList.add("card-hidden");

        slides[slidePosition].classList.remove('card-hidden');
        slides[slidePosition].classList.add('card-visible');

    }
}

function updateSliderIndicator() {
    for (dot of sliderDots) {
        dot.classList.remove("selected-testimonial")
        sliderDots[slidePosition].classList.add('selected-testimonial');

    }
}

function goToPrevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition();
    updateSliderIndicator();

}

function goToNextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    updateSlidePosition();
    updateSliderIndicator();

}


// function showSlides(slideCount) {
//     if (slideCount > slides.length) {
//         slidePosition = 1;
//     }

//     if (slideCount < 1) {
//         slidePosition = slides.length - 1;
//     }

//     for (let i = 0; i < sliderDots.length; i++) {
//         sliderDots[i].className = sliderDots[i].className.replace(" active", "");
//     }

//     slides[slidePosition - 1].style.overflow = "scroll";
//     sliderDots[slidePosition - 1].className += (" active");
// }
