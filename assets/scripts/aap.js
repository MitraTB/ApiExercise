const categorylist = document.querySelector(".category-list");
const cuisineList = document.querySelector(".cuisine-list");
const restaurantsList = document.querySelector(".restaurants-list");

function loadCategory() {
  fetch("https://developers.zomato.com/api/v2.1/categories", {
    method: "get",
    headers: {
      "user-key": "2ecb50280a36df15e253695ff94d9695",
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(categories => {
      const getCategory = categories.categories;
      let html = "";
      let index = 0;
      for (category of getCategory) {
        if (index === 4) {
          break;
        } else {
          html += `
        <li>
            <label for="${category.categories.name}">${category.categories.name}</label>
            <input class="select-category" type="radio" id="${category.categories.id}" name="${category}" value="${category.categories.name}>
        </li>`;
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
    .then(response => response.json())
    .then(cuisine => {
      const getCuisine = cuisine.cuisines;
      let html = "";
      let index = 0;
        for (element of getCuisine) {
            if(index ===5){
                break;
            }
            else{
          html += `
        <li>
            <label for="${element.cuisine.cuisine_name}">${element.cuisine.cuisine_name}</label>
            <input class="select-cuisine" type="radio" id="${element.cuisine.cuisine_id}" name="${cuisine}" value="${element.cuisine.cuisine_name}>
        </li>`;
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
    fetch("https://developers.zomato.com/api/v2.1/search?entity_type=city" , {
        method : "get",
        headers : {
            "user-key":"2ecb50280a36df15e253695ff94d9695",
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(
        data =>{
        const getRestaurant = data.restaurants;
        let html = '';
        for (element of getRestaurant){
            html += `
            <li>
            ${element.restaurant.name}
        </li>`;    
        }
        console.log(html);
        console.log(getRestaurant);
        restaurantsList.innerHTML = html;

    })
    .catch(err => console.log(err))
}





window.onload = loadCategory();
window.onload = loadCuisine();
window.onload = loadRestaurant();
