import './styles.css'

let images = [{
  url: "img1.jpg",
  title: ""
}, {
  url: "img2.jpg",
  title: ""
}, {
  url: "img3.jpg",
  title: ""
}
];

function initSlider(options) {
if (!images || !images.length) return;

options = options || {
  titles: false,
  dots: true,
  autoplay: false
};

let sliderImages = document.querySelector(".slider__images");
let sliderArrows = document.querySelector(".slider__arrows");
let sliderDots = document.querySelector(".slider__dots");

initImages();
initArrows();

if (options.dots) {
  initDots();
}

if (options.titles) {
  initTitles();
}

if (options.autoplay) {
  initAutoplay();
}

function initImages() {
  images.forEach((image, index) => {
    let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
    sliderImages.innerHTML += imageDiv;
  });
}

function initArrows() {
  sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
    arrow.addEventListener("click", function() {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber;
      if (arrow.classList.contains("left")) {
        nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
      } else {
        nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      }
      moveSlider(nextNumber);
    });
  });
}

function initDots() {
  images.forEach((image, index) => {
    let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
    sliderDots.innerHTML += dot;
  });
  sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
    dot.addEventListener("click", function() {
      moveSlider(this.dataset.index);
    })
  })
}

function moveSlider(num) {
  sliderImages.querySelector(".active").classList.remove("active");
  sliderImages.querySelector(".n" + num).classList.add("active");
  if (options.dots) {
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");
  }
  if (options.titles) changeTitle(num);
}

function initTitles() {
  let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
  sliderImages.innerHTML += cropTitle(titleDiv, 50);
}

function changeTitle(num) {
  if (!images[num].title) return;
  let sliderTitle = sliderImages.querySelector(".slider__images-title");
  sliderTitle.innerText = cropTitle(images[num].title, 50);
}

function cropTitle(title, size) {
  if (title.length <= size) {
    return title;
  } else {
    return title.substr(0, size) + "...";
  }
}

function initAutoplay() {
  setInterval(() => {
    let curNumber = +sliderImages.querySelector(".active").dataset.index;
    let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
    moveSlider(nextNumber);
  }, options.autoplayInterval);
}
}

let sliderOptions = {
dots: true,
titles: false,
autoplay: true,
autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
initSlider(sliderOptions);
});

const cardsContainer = document.querySelector('.cards-container-js');

function showCards(prevCatObj, currentCategoryObj) {
  prevCatObj.classList.remove("category-list-li-selected");
  currentCategoryObj.classList.add("category-list-li-selected");
  prevCategoryObj = currentCategoryObj;

  

  cardsContainer.innerHTML = `<div class="row">
                                <div class="card">
                                    <div class="img"><img src="img1.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Kevin Kwan</p>
                                        <p class="book-title">Crazy rich asians</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 42px"></div>
                                            <div class="review-amount">252 review</div>
                                        </div>
                                        <div class="book-desc">the outrageously funny debut novel about three super-rich, pedigreed Chinese families and the gossip...</div>
                                        <p class="price">$4.99</p>
                                        <form action="">
                                            <button class="buy-btn">buy now</button>    
                                        </form>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="img"><img src="img2.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Margaret Atwood</p>
                                        <p class="book-title">The handmaid’s tale</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 35px"></div>
                                            <div class="review-amount">1,1M review</div>
                                        </div>
                                        <div class="book-desc">This novel can be interpreted as a double narrative, Offred's tale and the handmaids' tales. The night...</div>
                                        <p class="price">$6.99</p>
                                        <form action="">
                                            <button class="buy-btn buy-btn-in-the-card">In the cart</button>    
                                        </form>
                                    </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="card">
                                    <div class="img"><img src="img3.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Aldous Huxley</p>
                                        <p class="book-title">Brave new world</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 55px"></div>
                                            <div class="review-amount">1,3M review</div>
                                        </div>
                                        <div class="book-desc">dystopian novel written in 1931 by English author Aldous Huxley, and published in 1932. Largely set in...</div>
                                        <p class="price">$12.43</p>
                                        <form action="">
                                            <button class="buy-btn">buy now</button>    
                                        </form>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="img"><img src="img4.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Tara Westover</p>
                                        <p class="book-title">Educated</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 27px"></div>
                                            <div class="review-amount">364 review</div>
                                        </div>
                                        <div class="book-desc">It is a tale of fierce family loyalty and of the grief that comes with severing the closest of ties. With...</div>
                                        <p class="price">$12.68</p>
                                        <form action="">
                                            <button class="buy-btn">buy now</button>    
                                        </form>
                                    </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="card">
                                    <div class="img"><img src="img5.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Marianne Fritz</p>
                                        <p class="book-title">The weight of things</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 60px"></div>
                                            <div class="review-amount">353 review</div>
                                        </div>
                                        <div class="book-desc">You discover not an eccentric fluke of literary nature but rather a brilliant and masterful satiris...</div>
                                        <p class="price">$18.23</p>
                                        <form action="">
                                            <button class="buy-btn">buy now</button>    
                                        </form>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="img"><img src="img6.png" alt=""></div>
                                    <div class="desc">
                                        <p class="author">Chris Power</p>
                                        <p class="book-title">Mothers stories</p>
                                        <div class="rating">
                                            <div class="pale-stars"></div>
                                            <div class="stars" style="width: 30px"></div>
                                            <div class="review-amount">454 review</div>
                                        </div>
                                        <div class="book-desc">the stories in Mothers lay bare the emotional and psychic damage of life, love, and abandonment...</div>
                                        <p class="price">$12.35</p>
                                        <form action="">
                                            <button class="buy-btn">buy now</button>    
                                        </form>
                                    </div>
                                </div>
                              </div>`;
}

let prevCategoryObj = document.querySelector('.category-list-li1-js');

const cat1 = document.querySelector('.category-list-li1-js');
const cat2 = document.querySelector('.category-list-li2-js');
const cat3 = document.querySelector('.category-list-li3-js');
const cat4 = document.querySelector('.category-list-li4-js');
const cat5 = document.querySelector('.category-list-li5-js');
const cat6 = document.querySelector('.category-list-li6-js');
const cat7 = document.querySelector('.category-list-li7-js');
const cat8 = document.querySelector('.category-list-li8-js');
const cat9 = document.querySelector('.category-list-li9-js');
const cat10 = document.querySelector('.category-list-li10-js');
const cat11 = document.querySelector('.category-list-li11-js');
const cat12 = document.querySelector('.category-list-li12-js');
const cat13 = document.querySelector('.category-list-li13-js');
const cat14 = document.querySelector('.category-list-li14-js');
const cat15 = document.querySelector('.category-list-li15-js');
const cat16 = document.querySelector('.category-list-li16-js');

cat1.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat2.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat3.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat4.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat5.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat6.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat7.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat8.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat9.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat10.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat11.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat12.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat13.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat14.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat15.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})

cat16.addEventListener('click', function() {
  showCards(prevCategoryObj, this);
})