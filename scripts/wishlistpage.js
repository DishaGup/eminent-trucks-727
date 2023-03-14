
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


 let delay5000=function () {
    setTimeout(() => {
        Location.reload()
    }, 5000);
 }
function hideheadermenu(){
    sidemenu.style.left="-500px"
}
function showheadermenu(){
    sidemenu.style.left="0"
}


 kitchenContainermouseover.addEventListener("mouseover",()=>{
    kitchenContainer.style.display="flex"
  

})
kitchenContainer.addEventListener("mouseleave",()=>{
    kitchenContainer.style.display="none"
})

tableContainermouseover.addEventListener("mouseover",()=>{
    tableContainer.style.display="flex"
  

})
tableContainer.addEventListener("mouseleave",()=>{
    tableContainer.style.display="none"
})

furnitureContainermouseover.addEventListener("mouseover",()=>{
    furnitureContainer.style.display="flex"

})
furnitureContainer.addEventListener("mouseleave",()=>{
    furnitureContainer.style.display="none"
})













//wishlist page original functionality 


let container = document.getElementById("card-container");

let displaywishcount = document.getElementById("wishcount");


let logeduser = JSON.parse(localStorage.getItem("loggedUser")) || [];
    console.log(logeduser)
    document.querySelector("#welcome").textContent = logeduser.name;

let wishListData  = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart  = JSON.parse(localStorage.getItem("Addtocart")) || [];

function displayProducts(data) {
    
    displaywishcount.innerHTML = data.length;
    localStorage.setItem("wishlistcount",displaywishcount)

    // console.log(data.length)

      container.innerHTML = null;

     data.forEach((element, index) => {

        let card = document.createElement("div");

        let image = document.createElement("img");
        image.setAttribute("src", element.Image);

        let name = document.createElement("h4");
        name.textContent = element.Name;

        let price = document.createElement("h5");
        price.textContent = "₹ " + element.Price;

        let desc = document.createElement("p");
        desc.textContent = element.Description;

        let addtocart = document.createElement("button");
        addtocart.innerText = "ADD TO CART"
      

        addtocart.addEventListener("click", function () {

            let cart  = JSON.parse(localStorage.getItem("Addtocart")) || [];

            let datapresent = false;
            for (let i = 0; i < cart.length; i++) {

                if (cart[i].ProductId == element.ProductId) {
                    datapresent = true;
                    break;
                }
            }

            console.log(datapresent)
            if (datapresent == true) {
                alert("Product Already in Cart❌");

            } else {
                cart.push({ ...element, quantity: 1 });
                localStorage.setItem("Addtocart", JSON.stringify(cart));
                alert("Product Added To Cart ✔");
                remove()

            }
        })

        let removeProduct = document.createElement("i");
       
        removeProduct.setAttribute("id", "heartss")
       
        removeProduct.setAttribute("class", "fa fa-minus-circle")
        function remove() {
            event.target.parentNode.remove();
            data.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(data));
            displayProducts(data);
        }

       removeProduct.addEventListener("click", () => {
           remove();
        });

        card.append(image, name, price, desc, addtocart, removeProduct);

        container.append(card);
    });

  
}
displayProducts(wishListData);


