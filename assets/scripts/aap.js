
const categorylist = document.querySelector('.category-list');
mainCategory =[]

 function loadData(){ 
    
    fetch('https://developers.zomato.com/api/v2.1/categories' , {
    method: "get",
    headers:{
        "user-key": "2ecb50280a36df15e253695ff94d9695",
        'Content-Type' :'application/json'
    }
}
).then(response => response.json())
.then(categories =>{
    const getCategory = categories.categories;
    let html='';
    let i = 0;
    for(category of getCategory){
         html += `
        <li>
            <label for="${category.categories.name}">${category.categories.name}</label>
            <input type="radio" id="${category.categories.id}" name="${category.categories.name}" value="${category.categories.name}>
        </li>`
    }
    console.log(html);
    console.log(getCategory);
    categorylist.appendChild = html;
    })

.catch(err=>console.log(err))
 }
 window.onload = loadData();
      








