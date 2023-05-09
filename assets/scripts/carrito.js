const btnCarrito = document.querySelector('.icon-cart')
const carritoProductos = document.querySelector('.container-carrito-productos')

btnCarrito.addEventListener('click', () => {
    carritoProductos.classList.toggle('carrito-oculto')
})

// ------------

const carritoInfo = document.querySelector('.producto-carrito')
const carritoRow = document.querySelector('.row-producto')

//Lista de los contenedores de productos
const listaProductos = document.querySelector('.container-productos')

//Variables 
let productos = []
const valorTotal = document.querySelector('.total-pagar')


listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('agregar')) {
        const producto = e.target.parentElement

        const productoInfo = {
            quantity: 1,
            title: producto.querySelector('h2').textContent,
            price: producto.querySelector('p').textContent,
        };

        const existe= productos.some(producto => producto.title === productoInfo.title)

        if (existe){
            const p= productos.map(producto =>{
                if(producto.title === productoInfo.title){
                    producto.quantity++;
                    return producto
                }else{
                    return producto
                }
            })
            productos = [...p]   
        }else{
            productos = [...productos, productoInfo]
        }

        mostrarHTML();
    }
});


//Eliminar producto de lista de compras
carritoRow.addEventListener('click', e => {
    if(e.target.classList.contains('icon-close')){
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('svg').textContent;

        productos = productos.filter(
            producto => producto.titulo !== titulo
        );

        console.log(productos)
        mostrarHTML()
    }

})




// Funcion para mostrar el carrito
const mostrarHTML = () => {

    //LimpiarCarrito
    carritoRow.innerHTML = '';

    //TotalAlPrincipio
    let precioTotal= 0;

    productos.forEach(producto => {
        const productoContainter = document.createElement('div')
        productoContainter.classList.add('producto-carrito')

        productoContainter.innerHTML = `
         <div class="info-producto-carrito">
            <span class="cantidadproducto-carrito">${producto.quantity}</span>
            <p class="tituloproducto-carrito">${producto.title}</p>
            <span class="precioproducto-carrito">${producto.price}</span>
         </div >
         <div class="cancelar-carrito">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon-close">
            <path 
                stroke-linecap="round" stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
            </svg>
         </div>
    `
    carritoRow.append(productoContainter);

    //Actualizar valor final
    precioTotal = precioTotal + parseInt(producto.quantity * producto.price.slice(1))

    });

    //Dando el valor a la Variable
    valorTotal.innerText = `$${precioTotal}`;

};