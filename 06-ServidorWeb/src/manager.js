import fs from 'fs';

export class ProductManager {

    constructor(path) {
        this.path = path;
        this.idProducts = 1;
        this.error = undefined;
        this.checkFileExists()
    }

    async checkFileExists() {
        try {
        await fs.promises.access(this.path);
        } catch (err) {
            await fs.promises.writeFile(this.path, "[]")
            console.log(`El archivo ${this.path} no existe`);
        }
    }

    validateProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) 
        {
        return this.error = `campos incompletos`
        }
    }

    async checkCodeExists(code) {
        const products = await this.getProducts();
        const existingProduct = products.find(product => product.code === code);
        if (existingProduct) {
            console.log(`El código ${code} ya existe`);
            return false;
        }
        return true;
    }

    async addProduct(newProduct) {
        await this.checkFileExists()
        try {
            let allProducts = await this.getProducts();

            if  (this.validateProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock)) {
                return `Faltan campos`
            }
            
            if (!await this.checkCodeExists(newProduct.code)) {
                return `No se puede agregar el producto. Code: ${code} duplicado`
            }
            newProduct.id = this.idProducts;
            allProducts.push(newProduct);
            this.idProducts++;
            await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, 2));
            
            return newProduct.id;
        } catch (err) {
            console.log('Hubo un error: ' + err);
        }
    }

    async getProducts() {
        await this.checkFileExists()    
            try {
                let allProducts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(allProducts);
            } catch (err) {
                console.log('Hubo un error: ' + err);
        }
    }

    async getProductById(productId) {
        await this.checkFileExists()
        try {
            let allProducts = await this.getProducts();
            return allProducts.find((item) => item.id === productId);
            } catch (err) {
                console.log('Error al obtener el producto por ID: ' + error);
                return null;
            }
    }
}





