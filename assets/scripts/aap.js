const categorylist = document.querySelector(".category-list");
const cuisineList = document.querySelector(".cuisine-list");
const restaurantsList = document.querySelector(".restaurants-list");
const renderSpecialRestaurant = document.querySelector(".display-result");
const restaurantItems = document.querySelectorAll('.restaurants-list li');
const displayResultButton = document.querySelector('.display-result-button');

function loadCategory() {
  fetch("https://developers.zomato.com/api/v2.1/categories", {
    method: "get",
    headers: {
      "user-key": "2ecb50280a36df15e253695ff94d9695",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((categories) => {
      const getCategory = categories.categories;
      let html = "";
      let index = 0;
      for (category of getCategory) {
        if (index === 5) {
          break;
        } else {
          html += `
        <div>
            <input class="select-category" type="checkbox" id="${category.categories.id}" name="${category}">
            <label for="${category.categories.name}">${category.categories.name}</label>
        </div>`;
          index++;
        }
      }
      console.log(html);
      console.log(getCategory);
      categorylist.innerHTML = html;
    })
    .catch((err) => console.log(err));
}

function loadCuisine() {
  fetch("https://developers.zomato.com/api/v2.1/cuisines?city_id=250", {
    method: "get",
    headers: {
      "user-key": "2ecb50280a36df15e253695ff94d9695",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((cuisine) => {
      const getCuisine = cuisine.cuisines;
      let html = "";
      let index = 0;
      for (element of getCuisine) {
        if (index === 5) {
          break;
        } else {
          html += `
        <div>
            <input class="select-cuisine" type="checkbox" id="${element.cuisine.cuisine_id}" name="${cuisine}">
            <label for="${element.cuisine.cuisine_name}">${element.cuisine.cuisine_name}</label>
        </div>`;
          index++;
        }
      }
      console.log(html);
      console.log(getCuisine);
      cuisineList.innerHTML = html;
    })
    .catch((err) => console.log(err));
}

function loadRestaurant() {
  fetch("https://developers.zomato.com/api/v2.1/search?cuisines=&category=", {
    method: "get",
    headers: {
      "user-key": "2ecb50280a36df15e253695ff94d9695",
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const getRestaurant = data.restaurants;
      let html = "";
      for (element of getRestaurant) {
        html += `
            <li id="${element.restaurant.id}">
            ${element.restaurant.name}
        </li>
        <hr>`;
      }
      console.log(html);
      console.log(getRestaurant);
      restaurantsList.innerHTML = html;
    })
    .catch((err) => console.log(err));
    
}

function renderSpecificRestaurant(id) {
  var url = `https://developers.zomato.com/api/v2.1/restaurant?res_id= ${id}`;
  fetch(url , {
    headers: {
      "user-key": "2ecb50280a36df15e253695ff94d9695",
      "content-type": "application/json",
    },
    method: "get",
  })
    .then(res =>res.json())
    //.then((data) => console.log(data))
    .then(data => {
      let specificRes = `<div class="specific-res">
        <div class="first-col"><img src="${data.featured_image}"></div>
        <div class="second-col"><div><h1>${data.name}</h1><p style="font-size:13px;">${data.location.address}</p></div><div><p>Delivery available</p>
        <p>Booking</p></div><div><h3>CUISINES</h3><p>${data.cuisines}<p></div><div><h3>PHONE NUMBER</h3><p>${data.phone_numbers}<p></div>
        <div><h3>OPENING HOURS</h3><p>${data.timings}<p></div>
        </div>
        </div>`;
        renderSpecialRestaurant.innerHTML = specificRes;
    })
    .catch((err) => console.log(err));
}

function displayRestaurantInfo(event){
  var getId = event.target.getAttribute('id');
  console.log(getId);
  renderSpecificRestaurant(getId);
}

function renderResult(event){
var getCategoryId = event.target.getAttribute('id');
var getCuisineId = event.target.getAttribute('id');
console.log(getCuisineId);
console.log(getCategoryId);
loadRestaurant(getCategoryId, getCuisineId);
}


window.onload = loadCategory();
window.onload = loadCuisine();
window.onload = loadRestaurant();
//window.onload = renderSpecificRestaurant();
restaurantsList.addEventListener('click',displayRestaurantInfo);
displayResultButton.addEventListener('click', renderResult)