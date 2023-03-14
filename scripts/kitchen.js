
// Kichen functionality

let logeduse = JSON.parse(localStorage.getItem("loggedUser")) || [];
//console.log(logeduser)
document.querySelector("#welcome").textContent = logeduse.name;

let sidemenu=document.getElementById("header-menu")
let furnitureContainer=document.getElementById("furniture-container")
 let furnitureContainermouseover=document.getElementById("furniture-container-mouseover")
 let kitchenContainer=document.getElementById("Kitchen-container")
 let kitchenContainermouseover=document.getElementById("Kitchen-container-mouseover")
 let tableContainer=document.getElementById("table-container")
 let tableContainermouseover=document.getElementById("table-container-mouseover")


 let delay1000=function () {
     setTimeout(() => {
    }, 1000);
 }
function hideheadermenu(){
    sidemenu.style.left="-500px"
}
function showheadermenu(){
    sidemenu.style.left="0"
}

kitchenContainer.addEventListener("mouseleave",()=>{
    setTimeout(()=>{
     kitchenContainer.style.display="none"
    },1000)
    
    
 })
 kitchenContainermouseover.addEventListener("mouseenter",()=>{
    kitchenContainer.style.display="flex"
})
kitchenContainer.addEventListener("mouseover",()=>{
    kitchenContainer.style.display="flex"
   
})


tableContainermouseover.addEventListener("mouseenter",()=>{
    tableContainer.style.display="flex"
  

})
tableContainer.addEventListener("mouseleave",()=>{
  
    setTimeout(()=>{
        tableContainer.style.display="none"
       },1000)
       
})
tableContainer.addEventListener("mouseover",()=>{
    tableContainer.style.display="flex"
  

})

furnitureContainer.addEventListener("mouseover",()=>{
    furnitureContainer.style.display="flex"
  

})
furnitureContainermouseover.addEventListener("mouseenter",()=>{
    furnitureContainer.style.display="flex"

})
furnitureContainer.addEventListener("mouseleave",()=>{
   
    setTimeout(()=>{
        furnitureContainer.style.display="none"
       },1000)
       
})








// KITCHEN DATA
let logeduser = JSON.parse(localStorage.getItem("loggedUser")) || [];
console.log(logeduser)
document.querySelector("#welcome").textContent = logeduser.name;

let  wishListData = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart  = JSON.parse(localStorage.getItem("Addtocart")) || [];






let kitchen = document.querySelector(".kitchen-container")

//localStorage.setItem("kitchen", JSON.stringify(kitchenData))
let kitchenData=[]
let fetchedData=async()=>{
    try {
        let res=await fetch(`http://localhost:8080/kitchen`)
  let data=await res.json()
  kitchenData=data
  displayData(kitchenData)
     } catch (error) {
        console.log(error)
    }
}

fetchedData()

function displayData(data) {
    kitchen.innerHTML = ""
    data.forEach(function (el) {

        let div = document.createElement("div")

        let image = document.createElement("img")
        image.setAttribute("src", el.Image)

        let names = document.createElement("h3")
        names.textContent = el.Name;

        let price = document.createElement("h5")
        price.textContent = "₹ " + el.Price

        let desc = document.createElement("p")
        desc.textContent = el.Description

        let buynow = document.createElement("button")
        buynow.textContent = "Add To Cart"
    

        buynow.addEventListener("click", function () {

            
            let cart = JSON.parse(localStorage.getItem("Addtocart")) || [];

            let datapresent = false;
            for (let i = 0; i < cart.length; i++) {

                if (cart[i].ProductId == el.ProductId) {
                    datapresent = true;
                    break;
                }
            }

            console.log(datapresent)
            if (datapresent == true) {
                alert("Product Already in Cart❌");

            } else {
                cart.push({ ...el, quantity: 1 });
                localStorage.setItem("Addtocart", JSON.stringify(cart));
                alert("Product Added To Cart ✔");

            }
        })

              
        let but=document.createElement("i")
        but.setAttribute("id","heartss")
        but.setAttribute("class","fa fa-heart")

        but.addEventListener("click",function(){

            let wishListData = JSON.parse(localStorage.getItem("wishlist")) || [];

            let datapresent = false;
            for (let i = 0; i <  wishListData.length; i++) {

                if ( wishListData[i].ProductId == el.ProductId) {
                    datapresent = true;
                    break;
                }
            }

            console.log(datapresent)
            if (datapresent == true) {
                alert("Product Already in wishlist ❌");

            } else {
                wishListData.push({ ...el, quantity: 1 });
                localStorage.setItem("wishlist", JSON.stringify(wishListData));
                alert("Product Added To Wishlist ✔");

            }

      })
      
        div.append(image,names,price,desc,buynow,but)

        kitchen.append(div);


    })
}
// displayData(kitchenData)

function search() {
    let q = document.querySelector("input").value;
   
    let newData = kitchenData.filter(function (el) {
        return el.Name.toLowerCase().includes(q.toLowerCase());
    });

    console.log(newData)
    displayData(newData);
}
let prio = document.querySelector("#filter");

prio.addEventListener("change", function (event) {
    event.preventDefault();

    let selected = event.target.value;

    if (selected == "all") {
        displayData(kitchenData)
       
    } else {

        let filtered_data = kitchenData.filter(function (el) {
            return el.Category == selected
        });
        displayData(filtered_data)
      
    }

});
function searchsmallscreen(){
    let smallsearch=document.getElementById("small-search").value

    let newDatasmall = kitchenData.filter(function (el) {
        
        return el.Name.toLowerCase().includes(smallsearch.toLowerCase());
    });
    
    displayData(newDatasmall)
}

let sorted = document.querySelector("#sort");

sorted.addEventListener("change", function (event) {

    let val = document.querySelector("#sort").value;
    //console.log(val)

    if (val == "LTH") {
        let data1 = kitchenData.sort(function (a, b) {
            return a.Price - b.Price;

        })
       
        displayData(data1)
        
        


    } else if (val == "HTL") {
        let sorteddata = kitchenData.sort(function (a, b) {
            return b.Price - a.Price;

        })
        displayData(sorteddata)
       
    } else {
        displayData(kitchenData)
     
        
    }
})


