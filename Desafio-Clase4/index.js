const { ProductManager } = require('./managers/ProductManager');

const manager = new ProductManager('./files/products.json');

const env = async () => {
    const products = await manager.getProducts();

    //Test evaluando casos bordes y posibles roturas:

    console.log('Comienzo del test, \n (se agregaron casos bordes) \n' ,products , 'Arreglo vacío inicialmente');

    //Agrego el producto 1
    const product1 = {
        title: 'Iphone 14 PRO MAX',
        description: '6 RAM, 128 ROM',
        price: 1900,
        thumbnail: './iphone14pm.svg',
        code: 'abc123',
        stock: 25
    }
    await manager.addProduct(product1);

    //Agrego el producto 2
    const product2 = {
        title: 'Samsung S23 ULTRA',
        description: '8 RAM, 256 ROM',
        price: 2100,
        thumbnail: './samsungs23.svg',
        code: 'xyz999',
        stock: 30
    }
    await manager.addProduct(product2);

    //Agrego el producto 3
    const product3 = {
        title: 'Xiaomi Redmi Note 11',
        description: '4 RAM, 128 ROM',
        price: 450,
        thumbnail: './xiaomi.svg',
        code: 'asdsda',
        stock: 30
    }
    await manager.addProduct(product3);

    //muestro los  3 productos agregados
    const productsResults1 = await manager.getProducts();
    console.log('\n Agregué 3 productos: \n',productsResults1);

    //intento agregar un producto con un code repetido
    console.log('\n Intento agregar un producto con un código repetido:')
    const product4 = {
        title: 'Nokia 1100',
        description: '10 MB ROM',
        price: 35,
        thumbnail: './nokia.svg',
        code: 'abc123',
        stock: 10
    }
    await manager.addProduct(product4);

    //intento agregar un producto con campos vacíos
    console.log('\n Intento agregar un producto con campos vacíos:');
    const product5 = {
        description: '10 MB ROM',
        code: 'abc12ww3',
        stock: 10
    }
    await manager.addProduct(product5);

    //Muestro en pantalla el producto con id 2
    const userById2 = await manager.getProductById(2);
    console.log('\n Producto con id 2: \n', userById2);

    //Muestro en pantalla el producto con id 1
    const userById1 = await manager.getProductById(1);
    console.log('\n Producto con id 1: \n', userById1);

    //Le hago una actualización al producto con id 2
    const productUpdate = {
        description: '6 RAM, 128 ROM',
        price: 150,
        stock: 21
    }
    await manager.updateProduct(2, productUpdate);

    //Muestro en pantalla el producto con id 2 actualizado
    const userById2actualizado = await manager.getProductById(2);
    console.log('\n Producto ACTUALIZADO con id 2: ', userById2actualizado);

    //intento hacer una actualización a un producto utilizando un código ya existente en otro producto
    console.log('\n Intento hacer una actualización al producto numero 3 ingresandole un código ya existente:')
    const productUpdate2 = {
        description: '6 RAM, 128 ROM',
        price: 1950,
        code: 'abc123'
    }
    await manager.updateProduct(3, productUpdate2);

    //Muestro todos los productos en pantalla antes de comenzar a eliminar
    const productsResults2 = await manager.getProducts();
    console.log('\n Productos: ', productsResults2);

    //elimino el producto con id 2
    await manager.deleteProduct(2);
    console.log('\n Eliminé el producto con id 2. \n Intento mostrarlo:')
    //intento mostrar en pantalla el producto con id 2
    await manager.getProductById(2);

    //elimino el producto con id 3
    console.log('\n Elimino producto con id 3')
    await manager.deleteProduct(3);

    //intento eliminar un producto con id inexistente
    console.log('\n Intento eliminar producto con id 6: ')
    await manager.deleteProduct(6);

    //Muestro todos los productos en pantalla nuevamente
    const productsResults3 = await manager.getProducts();
    console.log('\n Productos: \n', productsResults3);

    //elimino el producto con id 1
    console.log('\n Elimino producto con id 1, ya no deberían quedar productos')
    await manager.deleteProduct(1);

    //Muestro todos los productos en pantalla nuevamente
    const productsResults4 = await manager.getProducts();

    console.log('\n Productos: \n', productsResults4, '\n FIN DEL TEST');

}

env();