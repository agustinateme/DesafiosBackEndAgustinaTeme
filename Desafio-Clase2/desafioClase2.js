class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        console.log(this.products)
        return this.products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (this.products.some(product => product.code === code)) {
            console.log("There is already a product with this code.");
        }
        else if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("All fields are required.");
        }
        else {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            product.id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
            this.products.push(product);
        }  
    }

    getProductById = (id) => {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product)
            return product;
        } else {
            console.error("Not Found.");
        }
    }
}

//TEST:
//Creo la instancia productManager
const manejadorProducts = new ProductManager();
console.log('Tengo un arreglo vacío:')
manejadorProducts.getProducts()

//intento agregar un elemento con no todos los campos completos
console.log('Intento agregar un elemento sin completar todos los campos:')
manejadorProducts.addProduct(2002);

//Agrego un producto
manejadorProducts.addProduct('iphone12', '6ram, 64rom', 980, './image.jpg', 'abc123', 45);
console.log('Agregué un elemento:')
manejadorProducts.getProducts()

//Agrego dos productos más
manejadorProducts.addProduct('samsungS23', '8ram, 128rom', 1190, './image2.jpg', 'cdf567', 45);
manejadorProducts.addProduct('redmi9', '2ram, 32rom', 190, './image3.jpg', 'hga847', 160);
console.log('Agregué dos elementos más:')
manejadorProducts.getProducts()

//Intento agregar un producto con código repetido
console.log('Intento agregar un elemento que tiene el mismo código:')
manejadorProducts.addProduct('samsungS23', '8ram, 128rom', 1190, './image2.jpg', 'cdf567', 45);

//Obtengo un producto por su id
console.log('Obtengo un producto por su id: 3')
manejadorProducts.getProductById(3)

console.log('Obtengo un producto por su id: 1')
manejadorProducts.getProductById(1)

console.log('Obtengo un producto por su id: 4, spoiler NO EXISTE')
manejadorProducts.getProductById(4)

//Listo todos los productos
console.log('Listo todos los productos:')
manejadorProducts.getProducts()


