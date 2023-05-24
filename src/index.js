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

let booksCategory = "";
let startIndex = 6;
const cardsContainer = document.querySelector('.cards-container-js');
let httpResponseStatus = 0;
let books = [{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
},
{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
},
{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
},
{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
},
{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
},
{
  url: "",
  authors: "",
  title: "",
  rating: 0,
  ratingStyle: "",
  desc: "",
  price: "",
  priceStyle: ""
}
];

const useRequest = (categoryReq) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${categoryReq}"&key=AIzaSyDCuQISkKdOQ0rqxafunnipXRhYnqKOVnE&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
    .then((response) => {
      console.log('response.status', response.status);
      httpResponseStatus = response.status;
      return response.json();
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}

async function showCards(prevCatObj, currentCategoryObj, categoryReq) {

  startIndex = 6;
  prevCatObj.classList.remove("category-list-li-selected");
  currentCategoryObj.classList.add("category-list-li-selected");
  prevCategoryObj = currentCategoryObj;
  
  const requestResult = await useRequest(categoryReq);
  console.log('requestResult', requestResult);

  function limitStr(str, n, symb) {
    if (!n && !symb) return str;
    symb = symb || '...';
    if(str.length < n) symb = "";
    return str.substr(0, n - symb.length) + symb;
  }

  if(httpResponseStatus == 200) {

    try {books[0].url = requestResult.items[0].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[0].volumeInfo.imageLinks.thumbnail;} catch {books[0].url = "default-book.png";}
    try {books[1].url = requestResult.items[1].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[1].volumeInfo.imageLinks.thumbnail;} catch {books[1].url = "default-book.png";}
    try {books[2].url = requestResult.items[2].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[2].volumeInfo.imageLinks.thumbnail;} catch {books[2].url = "default-book.png";}
    try {books[3].url = requestResult.items[3].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[3].volumeInfo.imageLinks.thumbnail;} catch {books[3].url = "default-book.png";}
    try {books[4].url = requestResult.items[4].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[4].volumeInfo.imageLinks.thumbnail;} catch {books[4].url = "default-book.png";}
    try {books[5].url = requestResult.items[5].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[5].volumeInfo.imageLinks.thumbnail;} catch {books[5].url = "default-book.png";}

    try {
          books[0].authors = "";
          requestResult.items[0].volumeInfo.authors.forEach(author => books[0].authors += author + ", ");
          books[0].authors = books[0].authors.slice(0, -2);
          books[0].authors = limitStr(books[0].authors, 45);
        } catch {books[0].authors = "";}
    try {
          books[1].authors = "";
          requestResult.items[1].volumeInfo.authors.forEach(author => books[1].authors += author + ", ");
          books[1].authors = books[1].authors.slice(0, -2);
          books[1].authors = limitStr(books[1].authors, 45);
        } catch {books[1].authors = "";}
    try {
          books[2].authors = "";
          requestResult.items[2].volumeInfo.authors.forEach(author => books[2].authors += author + ", ");
          books[2].authors = books[2].authors.slice(0, -2);
          books[2].authors = limitStr(books[2].authors, 45);
        } catch {books[2].authors = "";}
    try {
          books[3].authors = "";
          requestResult.items[3].volumeInfo.authors.forEach(author => books[3].authors += author + ", ");
          books[3].authors = books[3].authors.slice(0, -2);
          books[3].authors = limitStr(books[3].authors, 45);
        } catch {books[3].authors = "";}
    try {
          books[4].authors = "";
          requestResult.items[4].volumeInfo.authors.forEach(author => books[4].authors += author + ", ");
          books[4].authors = books[4].authors.slice(0, -2);
          books[4].authors = limitStr(books[4].authors, 45);
        } catch {books[4].authors = "";}
    try {
          books[5].authors = "";
          requestResult.items[5].volumeInfo.authors.forEach(author => books[5].authors += author + ", ");
          books[5].authors = books[5].authors.slice(0, -2);
          books[5].authors = limitStr(books[5].authors, 45);
        } catch {books[5].authors = "";}

    try {books[0].title = requestResult.items[0].volumeInfo.title; books[0].title = limitStr(books[0].title, 45);} catch {books[0].title = "";}
    try {books[1].title = requestResult.items[1].volumeInfo.title; books[1].title = limitStr(books[1].title, 45);} catch {books[1].title = "";}
    try {books[2].title = requestResult.items[2].volumeInfo.title; books[2].title = limitStr(books[2].title, 45);} catch {books[2].title = "";}
    try {books[3].title = requestResult.items[3].volumeInfo.title; books[3].title = limitStr(books[3].title, 45);} catch {books[3].title = "";}
    try {books[4].title = requestResult.items[4].volumeInfo.title; books[4].title = limitStr(books[4].title, 45);} catch {books[4].title = "";}
    try {books[5].title = requestResult.items[5].volumeInfo.title; books[5].title = limitStr(books[5].title, 45);} catch {books[5].title = "";}

    try {books[0].ratingStyle = requestResult.items[0].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[0].ratingStyle = 'style="display:none"';}
    try {books[1].ratingStyle = requestResult.items[1].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[1].ratingStyle = 'style="display:none"';}
    try {books[2].ratingStyle = requestResult.items[2].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[2].ratingStyle = 'style="display:none"';}
    try {books[3].ratingStyle = requestResult.items[3].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[3].ratingStyle = 'style="display:none"';}
    try {books[4].ratingStyle = requestResult.items[4].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[4].ratingStyle = 'style="display:none"';}
    try {books[5].ratingStyle = requestResult.items[5].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[5].ratingStyle = 'style="display:none"';}
    
    try {books[0].desc = requestResult.items[0].volumeInfo.description; books[0].desc = limitStr(books[0].desc, 100);} catch {books[0].desc = "";}
    try {books[1].desc = requestResult.items[1].volumeInfo.description; books[1].desc = limitStr(books[1].desc, 100);} catch {books[1].desc = "";}
    try {books[2].desc = requestResult.items[2].volumeInfo.description; books[2].desc = limitStr(books[2].desc, 100);} catch {books[2].desc = "";}
    try {books[3].desc = requestResult.items[3].volumeInfo.description; books[3].desc = limitStr(books[3].desc, 100);} catch {books[3].desc = "";}
    try {books[4].desc = requestResult.items[4].volumeInfo.description; books[4].desc = limitStr(books[4].desc, 100);} catch {books[4].desc = "";}
    try {books[5].desc = requestResult.items[5].volumeInfo.description; books[5].desc = limitStr(books[5].desc, 100);} catch {books[5].desc = "";}

    try {books[0].price = requestResult.items[0].saleInfo.listPrice.amount.toString() + " " + requestResult.items[0].saleInfo.listPrice.currencyCode;} catch {books[0].price = "";}
    try {books[1].price = requestResult.items[1].saleInfo.listPrice.amount.toString() + " " + requestResult.items[1].saleInfo.listPrice.currencyCode;} catch {books[1].price = "";}
    try {books[2].price = requestResult.items[2].saleInfo.listPrice.amount.toString() + " " + requestResult.items[2].saleInfo.listPrice.currencyCode;} catch {books[2].price = "";}
    try {books[3].price = requestResult.items[3].saleInfo.listPrice.amount.toString() + " " + requestResult.items[3].saleInfo.listPrice.currencyCode;} catch {books[3].price = "";}
    try {books[4].price = requestResult.items[4].saleInfo.listPrice.amount.toString() + " " + requestResult.items[4].saleInfo.listPrice.currencyCode;} catch {books[4].price = "";}
    try {books[5].price = requestResult.items[5].saleInfo.listPrice.amount.toString() + " " + requestResult.items[5].saleInfo.listPrice.currencyCode;} catch {books[5].price = "";}

    cardsContainer.innerHTML = `<div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[0].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[0].authors}</p>
                                          <p class="book-title">${books[0].title}</p>
                                          <div class="rating" ${books[0].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">252 review</div>
                                          </div>
                                          <p class="book-desc">${books[0].desc}</p>
                                          <p class="price">${books[0].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[1].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[1].authors}</p>
                                          <p class="book-title">${books[1].title}</p>
                                          <div class="rating" ${books[1].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">1,1M review</div>
                                          </div>
                                          <p class="book-desc">${books[1].desc}</p>
                                          <p class="price">${books[1].price}</p>
                                          <form action="">
                                              <button class="buy-btn buy-btn-in-the-card">In the cart</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[2].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[2].authors}</p>
                                          <p class="book-title">${books[2].title}</p>
                                          <div class="rating" ${books[2].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">1,3M review</div>
                                          </div>
                                          <p class="book-desc">${books[2].desc}</p>
                                          <p class="price">${books[2].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[3].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[3].authors}</p>
                                          <p class="book-title">${books[3].title}</p>
                                          <div class="rating" ${books[3].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">364 review</div>
                                          </div>
                                          <p class="book-desc">${books[3].desc}</p>
                                          <p class="price">${books[3].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[4].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[4].authors}</p>
                                          <p class="book-title">${books[4].title}</p>
                                          <div class="rating" ${books[4].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">353 review</div>
                                          </div>
                                          <p class="book-desc">${books[4].desc}</p>
                                          <p class="price">${books[4].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[5].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[5].authors}</p>
                                          <p class="book-title">${books[5].title}</p>
                                          <div class="rating" ${books[5].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">454 review</div>
                                          </div>
                                          <p class="book-desc">${books[5].desc}</p>
                                          <p class="price">${books[5].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>`;
  }
}

const useRequestMore = () => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${booksCategory}"&key=AIzaSyDCuQISkKdOQ0rqxafunnipXRhYnqKOVnE&printType=books&startIndex=${startIndex.toString()}&maxResults=6&langRestrict=en`)
    .then((response) => {
      console.log('response.status', response.status);
      httpResponseStatus = response.status;
      return response.json();
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}

async function showMoreCards() {
  
  const requestResult = await useRequestMore();
  console.log('requestResult', requestResult);
  startIndex += 6;

  function limitStr(str, n, symb) {
    if (!n && !symb) return str;
    symb = symb || '...';
    if(str.length < n) symb = "";
    return str.substr(0, n - symb.length) + symb;
  }

  if(httpResponseStatus == 200) {

    try {books[0].url = requestResult.items[0].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[0].volumeInfo.imageLinks.thumbnail;} catch {books[0].url = "default-book.png";}
    try {books[1].url = requestResult.items[1].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[1].volumeInfo.imageLinks.thumbnail;} catch {books[1].url = "default-book.png";}
    try {books[2].url = requestResult.items[2].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[2].volumeInfo.imageLinks.thumbnail;} catch {books[2].url = "default-book.png";}
    try {books[3].url = requestResult.items[3].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[3].volumeInfo.imageLinks.thumbnail;} catch {books[3].url = "default-book.png";}
    try {books[4].url = requestResult.items[4].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[4].volumeInfo.imageLinks.thumbnail;} catch {books[4].url = "default-book.png";}
    try {books[5].url = requestResult.items[5].volumeInfo.imageLinks.thumbnail.length == 0? "default-book.png" : requestResult.items[5].volumeInfo.imageLinks.thumbnail;} catch {books[5].url = "default-book.png";}

    try {
          books[0].authors = "";
          requestResult.items[0].volumeInfo.authors.forEach(author => books[0].authors += author + ", ");
          books[0].authors = books[0].authors.slice(0, -2);
          books[0].authors = limitStr(books[0].authors, 45);
        } catch {books[0].authors = "";}
    try {
          books[1].authors = "";
          requestResult.items[1].volumeInfo.authors.forEach(author => books[1].authors += author + ", ");
          books[1].authors = books[1].authors.slice(0, -2);
          books[1].authors = limitStr(books[1].authors, 45);
        } catch {books[1].authors = "";}
    try {
          books[2].authors = "";
          requestResult.items[2].volumeInfo.authors.forEach(author => books[2].authors += author + ", ");
          books[2].authors = books[2].authors.slice(0, -2);
          books[2].authors = limitStr(books[2].authors, 45);
        } catch {books[2].authors = "";}
    try {
          books[3].authors = "";
          requestResult.items[3].volumeInfo.authors.forEach(author => books[3].authors += author + ", ");
          books[3].authors = books[3].authors.slice(0, -2);
          books[3].authors = limitStr(books[3].authors, 45);
        } catch {books[3].authors = "";}
    try {
          books[4].authors = "";
          requestResult.items[4].volumeInfo.authors.forEach(author => books[4].authors += author + ", ");
          books[4].authors = books[4].authors.slice(0, -2);
          books[4].authors = limitStr(books[4].authors, 45);
        } catch {books[4].authors = "";}
    try {
          books[5].authors = "";
          requestResult.items[5].volumeInfo.authors.forEach(author => books[5].authors += author + ", ");
          books[5].authors = books[5].authors.slice(0, -2);
          books[5].authors = limitStr(books[5].authors, 45);
        } catch {books[5].authors = "";}

    try {books[0].title = requestResult.items[0].volumeInfo.title; books[0].title = limitStr(books[0].title, 45);} catch {books[0].title = "";}
    try {books[1].title = requestResult.items[1].volumeInfo.title; books[1].title = limitStr(books[1].title, 45);} catch {books[1].title = "";}
    try {books[2].title = requestResult.items[2].volumeInfo.title; books[2].title = limitStr(books[2].title, 45);} catch {books[2].title = "";}
    try {books[3].title = requestResult.items[3].volumeInfo.title; books[3].title = limitStr(books[3].title, 45);} catch {books[3].title = "";}
    try {books[4].title = requestResult.items[4].volumeInfo.title; books[4].title = limitStr(books[4].title, 45);} catch {books[4].title = "";}
    try {books[5].title = requestResult.items[5].volumeInfo.title; books[5].title = limitStr(books[5].title, 45);} catch {books[5].title = "";}

    try {books[0].ratingStyle = requestResult.items[0].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[0].ratingStyle = 'style="display:none"';}
    try {books[1].ratingStyle = requestResult.items[1].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[1].ratingStyle = 'style="display:none"';}
    try {books[2].ratingStyle = requestResult.items[2].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[2].ratingStyle = 'style="display:none"';}
    try {books[3].ratingStyle = requestResult.items[3].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[3].ratingStyle = 'style="display:none"';}
    try {books[4].ratingStyle = requestResult.items[4].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[4].ratingStyle = 'style="display:none"';}
    try {books[5].ratingStyle = requestResult.items[5].volumeInfo.maturityRating == "NOT_MATURE"? 'style="display:none"': "";} catch {books[5].ratingStyle = 'style="display:none"';}
    
    try {books[0].desc = requestResult.items[0].volumeInfo.description; books[0].desc = limitStr(books[0].desc, 100);} catch {books[0].desc = "";}
    try {books[1].desc = requestResult.items[1].volumeInfo.description; books[1].desc = limitStr(books[1].desc, 100);} catch {books[1].desc = "";}
    try {books[2].desc = requestResult.items[2].volumeInfo.description; books[2].desc = limitStr(books[2].desc, 100);} catch {books[2].desc = "";}
    try {books[3].desc = requestResult.items[3].volumeInfo.description; books[3].desc = limitStr(books[3].desc, 100);} catch {books[3].desc = "";}
    try {books[4].desc = requestResult.items[4].volumeInfo.description; books[4].desc = limitStr(books[4].desc, 100);} catch {books[4].desc = "";}
    try {books[5].desc = requestResult.items[5].volumeInfo.description; books[5].desc = limitStr(books[5].desc, 100);} catch {books[5].desc = "";}

    try {books[0].price = requestResult.items[0].saleInfo.listPrice.amount.toString() + " " + requestResult.items[0].saleInfo.listPrice.currencyCode;} catch {books[0].price = "";}
    try {books[1].price = requestResult.items[1].saleInfo.listPrice.amount.toString() + " " + requestResult.items[1].saleInfo.listPrice.currencyCode;} catch {books[1].price = "";}
    try {books[2].price = requestResult.items[2].saleInfo.listPrice.amount.toString() + " " + requestResult.items[2].saleInfo.listPrice.currencyCode;} catch {books[2].price = "";}
    try {books[3].price = requestResult.items[3].saleInfo.listPrice.amount.toString() + " " + requestResult.items[3].saleInfo.listPrice.currencyCode;} catch {books[3].price = "";}
    try {books[4].price = requestResult.items[4].saleInfo.listPrice.amount.toString() + " " + requestResult.items[4].saleInfo.listPrice.currencyCode;} catch {books[4].price = "";}
    try {books[5].price = requestResult.items[5].saleInfo.listPrice.amount.toString() + " " + requestResult.items[5].saleInfo.listPrice.currencyCode;} catch {books[5].price = "";}

    cardsContainer.innerHTML += `<div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[0].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[0].authors}</p>
                                          <p class="book-title">${books[0].title}</p>
                                          <div class="rating" ${books[0].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">252 review</div>
                                          </div>
                                          <p class="book-desc">${books[0].desc}</p>
                                          <p class="price">${books[0].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[1].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[1].authors}</p>
                                          <p class="book-title">${books[1].title}</p>
                                          <div class="rating" ${books[1].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">1,1M review</div>
                                          </div>
                                          <p class="book-desc">${books[1].desc}</p>
                                          <p class="price">${books[1].price}</p>
                                          <form action="">
                                              <button class="buy-btn buy-btn-in-the-card">In the cart</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[2].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[2].authors}</p>
                                          <p class="book-title">${books[2].title}</p>
                                          <div class="rating" ${books[2].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">1,3M review</div>
                                          </div>
                                          <p class="book-desc">${books[2].desc}</p>
                                          <p class="price">${books[2].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[3].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[3].authors}</p>
                                          <p class="book-title">${books[3].title}</p>
                                          <div class="rating" ${books[3].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">364 review</div>
                                          </div>
                                          <p class="book-desc">${books[3].desc}</p>
                                          <p class="price">${books[3].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[4].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[4].authors}</p>
                                          <p class="book-title">${books[4].title}</p>
                                          <div class="rating" ${books[4].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">353 review</div>
                                          </div>
                                          <p class="book-desc">${books[4].desc}</p>
                                          <p class="price">${books[4].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                  <div class="card">
                                      <div class="img"><img class="book-cover" src="${books[5].url}" alt=""></div>
                                      <div class="desc">
                                          <p class="author">${books[5].authors}</p>
                                          <p class="book-title">${books[5].title}</p>
                                          <div class="rating" ${books[5].ratingStyle}>
                                              <div class="pale-stars"></div>
                                              <div class="stars" style="width: 60px"></div>
                                              <div class="review-amount">454 review</div>
                                          </div>
                                          <p class="book-desc">${books[5].desc}</p>
                                          <p class="price">${books[5].price}</p>
                                          <form action="">
                                              <button class="buy-btn">buy now</button>    
                                          </form>
                                      </div>
                                  </div>
                                </div>`;
  }
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

const btnLoadMore = document.querySelector('.btn-load-more-js');

cat1.addEventListener('click', function() {
  booksCategory = "Architecture";
  showCards(prevCategoryObj, this, "Architecture");
})

cat2.addEventListener('click', function() {
  booksCategory = "Art";
  showCards(prevCategoryObj, this, "Art");
})

cat3.addEventListener('click', function() {
  booksCategory = "Autobiography";
  showCards(prevCategoryObj, this, "Autobiography");
})

cat4.addEventListener('click', function() {
  booksCategory = "Business";
  showCards(prevCategoryObj, this, "Business");
})

cat5.addEventListener('click', function() {
  booksCategory = "Crafts&Hobbies";
  showCards(prevCategoryObj, this, "Crafts&Hobbies");
})

cat6.addEventListener('click', function() {
  booksCategory = "Drama";
  showCards(prevCategoryObj, this, "Drama");
})

cat7.addEventListener('click', function() {
  booksCategory = "Fiction";
  showCards(prevCategoryObj, this, "Fiction");
})

cat8.addEventListener('click', function() {
  booksCategory = "Cooking";
  showCards(prevCategoryObj, this, "Cooking");
})

cat9.addEventListener('click', function() {
  booksCategory = "Health&Fitness";
  showCards(prevCategoryObj, this, "Health&Fitness");
})

cat10.addEventListener('click', function() {
  booksCategory = "History";
  showCards(prevCategoryObj, this, "History");
})

cat11.addEventListener('click', function() {
  booksCategory = "Humor";
  showCards(prevCategoryObj, this, "Humor");
})

cat12.addEventListener('click', function() {
  booksCategory = "Poetry";
  showCards(prevCategoryObj, this, "Poetry");
})

cat13.addEventListener('click', function() {
  booksCategory = "Psychology";
  showCards(prevCategoryObj, this, "Psychology");
})

cat14.addEventListener('click', function() {
  booksCategory = "Science";
  showCards(prevCategoryObj, this, "Science");
})

cat15.addEventListener('click', function() {
  booksCategory = "Technology";
  showCards(prevCategoryObj, this, "Technology");
})

cat16.addEventListener('click', function() {
  booksCategory = "Travel";
  showCards(prevCategoryObj, this, "Travel");
})

btnLoadMore.addEventListener('click', function(event) {
  showMoreCards();
  event.preventDefault();
})

document.addEventListener("DOMContentLoaded", function() {
  booksCategory = "Architecture";
  showCards(prevCategoryObj, cat1, "Architecture");
  });