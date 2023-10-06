//Con este socket vamos a establerecer la comunicación con nuestro servidor
const socket = io();

const container = document.getElementById('products-container');

const form1 = document.getElementById('formulario1');
const form2 = document.getElementById('formulario2');

socket.on('showProducts', data => {
    container.innerHTML = ``;
    
    data.forEach(prod => {
        container.innerHTML += `
            <ul class="product">
                <li><span>title:</span> ${prod.title}</li>
                <li><span>description:</span> ${prod.description}</li>
                <li><span>code:</span> ${prod.code}</li>
                <li><span>price:</span> ${prod.price}</li>
                <li><span>status:</span> ${prod.status}</li>
                <li><span>stock:</span> ${prod.stock}</li>
                <li><span>category:</span> ${prod.category}</li>
                <li><span>id:</span> ${prod.id}</li>
            </ul>
        `
    });
});

form1.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = JSON.parse(document.getElementById('addproduct').value);
    socket.emit('addProduct',  newProduct );
});

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('removeproduct').value;
    socket.emit('removeproduct',  id );
});