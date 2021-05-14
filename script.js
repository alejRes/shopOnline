// Crea una lista Ul/li para los diferentes productos de la lista
///fetch 
// 1- Hacer fetch de productos
//https://fakestoreapi.com/products
// 2- Generar en el DOM una lista UL/LI con el titulo de cada elemento

/* fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then((productos)=> {
        let ulC=document.createElement("ul");
        document.querySelector("body").appendChild(ulC);
        productos.map((x)=> { 
            let liC =document.createElement("li"); 
            let txt = document.createTextNode(x.title);
            liC.appendChild(txt);
            ulC.appendChild(liC);
        })
    }) */


/*     Ejercicio de hoy (extended)
1 - Hacer fetch de productos
https://fakestoreapi.com/products
2 - Generar en el DOM una lista UL/LI con el titulo de cada elemento
3 - Hacer un fetch a fakestoreapi para obtener las categorías de productos (Buscar en la documentación de la API el endpoint correspondiente)
4 - Generar en el DOM un <select> que contenga en sus opciones los nombres de las categorías en fakestoreapi. Las opciones deberán generarse dinámicamente, como los <li> del punto 2, no podrán escribirse a mano. La primera opción de nuestro <select> deberá ser "Todas las categorías".
5 - Al seleccionar una categoría nuestra app deberá hacer un nuevo fetch a fakestoreapi para obtener solo los productos correspondientes a esa categoría. (Buscar en la documentación de la API el endpoint correspondiente)
6 - Eliminar del DOM la lista anterior y generar los nuevos items con la información de cada elemento.
7 - Modificar la función que muestra en el DOM las etiquetas <li> (punto 2), para que nuestra aplicación muestre la información completa de cada producto en una tarjeta como las que podemos encontrar en una tienda online. */

let precios = [];

let selector = document.createElement("select")
document.querySelector("#select").appendChild(selector)

fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then(json=>{
        addOption("option","All")
        json.map(x=>addOption("option",x))
})

let addOption = (padre, valor) =>{
    let txt= document.createTextNode(valor.toUpperCase()) 
    let elem = document.createElement(padre)
    elem.setAttribute("value",valor)
    elem.appendChild(txt)
    selector.appendChild(elem)
}

let selectCategories = (category)=>{
    category=="All"? endpoint ='https://fakestoreapi.com/products': endpoint = `https://fakestoreapi.com/products/category/${category}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(json=>json.map(producto=>{

        precios.push(producto)
        
        addTarget(producto.image, producto.title, producto.price, producto.description)
    })
    
    
)}

selectCategories("All")

selector.addEventListener("change",()=>{
    document.getElementById("result").innerHTML=""
    selectCategories(selector.value) 
    precios =[]
    
})

let addTarget = (url, tit, pri, desc ) =>{
    
    let seccion= document.createElement("section")
    seccion.setAttribute("class","txt-art")
    let seccImg= document.createElement("section")
    seccImg.setAttribute("class","img-art")
    let tarjeta = document.createElement("figure")
    let image = document.createElement("img")
    image.setAttribute("src", url)
    seccImg.appendChild(image)
    tarjeta.appendChild(seccImg)
    let piefoto = document.createElement("figcaption")
    let txtTitle =document.createTextNode(tit)
    piefoto.appendChild(txtTitle)
    seccion.appendChild(piefoto)
    let precio = document.createElement("span")
    let txtPrecio = document.createTextNode(`${pri} €`)
    tarjeta.appendChild(seccion)
    precio.appendChild(txtPrecio)
    seccion.appendChild(precio)
    document.querySelector("#result").appendChild(tarjeta)
}

document.querySelector("button").addEventListener("click",(e)=>{
    e.target.innerHTML == "Orden ascendente"? (
        e.target.innerHTML = "Orden descendente",
        precios.sort(function(a, b){return a.price-b.price}),
        document.getElementById("result").innerHTML="",
        precios.map(ele => addTarget(ele.image, ele.title, ele.price, ele.description))
        
        
    ): (e.target.innerHTML="Orden ascendente",
        document.getElementById("result").innerHTML="",
        precios.sort(function(a, b){return b.price-a.price})),
        precios.map(ele => addTarget(ele.image, ele.title, ele.price, ele.description))
    console.log(precios)

})