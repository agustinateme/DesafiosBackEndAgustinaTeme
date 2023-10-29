import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }
            else {
                return [];
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    addProduct = async (product) => {
        try {
            const allProducts = await this.getProducts();

            if (allProducts.some(p => p.code === product.code)) {
                throw new Error("You cannot add the product because a product with the same code already exists");
            }

            if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
                throw new Error("All fields are required to add a product.");
            }
            product.id = allProducts.length === 0 ? 1 : allProducts[allProducts.length - 1].id + 1;
            allProducts.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
            return product;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getProductById = async (id) => {
        try {
            const allProducts = await this.getProducts();
            const productById = allProducts.find(p => p.id === id);

            if (!productById) {
                throw new Error("There is no product with the ID entered");
            }
            return productById;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    updateProduct = async (id, product) => {
        try {
            const allProducts = await this.getProducts();
            const productIndex = allProducts.findIndex(p => p.id === id);

            if (productIndex != -1) {
                if (allProducts.some(p => p.code === product.code)) {
                    throw new Error("You cannot update a product code with an existing one");
                }
                else {
                    allProducts[productIndex] = {
                        title: product.title || allProducts[productIndex].title,
                        description: product.description || allProducts[productIndex].description,
                        price: product.price || allProducts[productIndex].price,
                        thumbnail: product.thumbnail || allProducts[productIndex].thumbnail,
                        code: product.code || allProducts[productIndex].code,
                        stock: product.stock || allProducts[productIndex].stock,
                        status: product.status || allProducts[productIndex].status,
                        category: product.category || allProducts[productIndex].category,
                        id: id
                    };

                    await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
                }

            } else {
                throw new Error("The ID of the product you are trying to update does not exist.");
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteProduct = async (id) => {
        try {
            const allProducts = await this.getProducts();
            const productIndex = allProducts.findIndex(p => p.id === id);

            if (productIndex != -1) {
                allProducts.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
            }
            else {
                throw new Error("The ID of the product you are trying to delete does not exist.");
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default ProductManager;