// let fa_times = document.querySelectorAll('.fa_times');
// let list = document.querySelectorAll('.menu_list_collection');
// let li=document.querySelectorAll('.box_inside_it')


// for(let i=0 ; i<fa_times.length ; i++){
// function hideListAndRemoveListener() {
//     fa_times[i].style.display='none'
//   list[i].style.display = 'none';
//   fa_times[i].removeEventListener('click', hideListAndRemoveListener);
// }

// function showListAndAddListener() {
//     fa_times[i].style.display='inline-block'
//   list[i].style.display = 'inline-block';
//   fa_times[i].addEventListener('click', hideListAndRemoveListener);
// }

// li[i].addEventListener('mouseenter', showListAndAddListener);

// li[i].addEventListener('mouseleave',()=>{
//     list[i].style.display = 'none';
// })
// li[i].addEventListener('mouseleave',()=>{
//     fa_times[i].style.display = 'none';
// })
// if(window.innerWidth>960){
//     li[i].addEventListener('mouseenter',()=>{
//         fa_times[i].style.display = 'none';
//     })
// }else{
//     li[i].addEventListener('mouseenter',()=>{
//  fa_times[i].style.display = 'inline';
//     }) 
// }
// }
let fa_times = document.querySelectorAll('.fa_times');
let list = document.querySelectorAll('.menu_list_collection');
let li = document.querySelectorAll('.box_inside_it');

function hideListAndRemoveListener(i) {
    return function() {
        fa_times[i].style.display = 'none';
        list[i].style.display = 'none';
        fa_times[i].removeEventListener('click', hideListAndRemoveListener(i));
    };
}

function showListAndAddListener(i) {
    return function() {
        fa_times[i].style.display = 'inline-block';
        list[i].style.display = 'inline-block';
        fa_times[i].addEventListener('click', hideListAndRemoveListener(i));
    };
}

for (let i = 0; i < li.length; i++) {
    fa_times[i].style.display = 'none';
    li[i].addEventListener('mouseenter', showListAndAddListener(i));

    li[i].addEventListener('mouseleave', () => {
         list[i].style.display = 'none';
        fa_times[i].style.display = 'none';
    });

    // if (window.innerWidth > 960) {
      
    //     li[i].addEventListener('mouseenter', () => {
    //         fa_times[i].style.display = 'none';
    //     });
    // } else {

    //     li[i].addEventListener('mouseenter', () => {
    //         fa_times[i].style.display = 'inline';
    //     });
    //     fa_times[i].style.display = 'none';
    // }
}





const trunk_shows_sider_box = document.querySelector(".trunk_shows_sider_box");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".trunk_shows_sider_box i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2* carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



