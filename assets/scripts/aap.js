
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
    let html='';
    for(category in categories){
        html += `
        <li>
            <label for="${category.name}">${category.name}</label>
            <input type="radio" id="${category.id}" name="${category.name}" value="${category.name}>
        </li>`
        console.log(category);
        console.log(html);
    };
    categorylist.appendChild = html;
    })

.catch(err=>console.log(err))
 }
 window.onload = loadData();
 /*const renderActivity = function (newData =[]) {
    const resCategory = {
        id : newData.id,
        name : newData.name
    };
    mainCategory.push(resCategory);
    let html ='';
    mainCategory.forEach(element =>
        html += `<li>${element.name}</li>`);
        console.log(mainCategory);
    categorylist.appendChild(html); } */      








