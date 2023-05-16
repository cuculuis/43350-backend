const fs = require('fs');


class ProductManager {

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

    // async validateProduct(title, description, price, thumbnail, code, stock) {
    //     await this.checkFileExists()
    //     try {
    //         if (!title || !description || !price || !thumbnail || !code || !stock) {
    //             return this.error = `campos incompletos`
    //         } else {
    //             const allProducts = await this.getProducts()
    //             const found = await allProducts.find(product => product.code === code)
    //             if (found) {return this.error = `El code: ${code} ya existe`}
    //             else {return this.error = undefined}
    //         }
    //     } catch (error) {
    //         console.log("Hubo un error: " + error);
    //     }
    // }

    async validateTitle(title) {
        if (!title) {
            console.log(`El campo title es obligatorio`)
            return false
        }
    }
    
    async validateDescription(description) {
        if (!description) {
            console.log(`El campo description es obligatorio`);
            return false
        }
    }
    
    async validatePrice(price) {
        if (!price) {
            console.log(`El campo price es obligatorio`);
            return false
        }
    }
    
    async validateThumbnail(thumbnail) {
        if (!thumbnail) {
            console.log(`El campo thumbnail es obligatorio`)
            return false
        }
    }
    
    async validateCode(code) {
        if (!code) {
            console.log(`El campo code es obligatorio`);
            return false;
        }
        const allProducts = await this.getProducts();
        const found = allProducts.find(product => product.code === code);
        if (found) {
            console.log(`El code: ${code} ya existe`)
            return false;
        }
        return true;
    }
    
    async validateStock(stock) {
        if (!stock) {
            console.log(`El campo stock es obligatorio`)
            return false
        } 
    }


    async addProduct(newProduct) {
        await this.checkFileExists()
        try {
            let allProducts = await this.getProducts();

            if (!this.validateTitle(newProduct.title) || !this.validateDescription(newProduct.description) || !this.validatePrice(newProduct.price) || !this.validateThumbnail(newProduct.thumbnail) || !this.validateStock(newProduct.stock)) {
                return `Faltan campos`
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
            let product = allProducts.find((item) => item.id === productId);
                if (product) {
                    return product;
                } else {
                    return `No hay productos con id: ${productId}`;
                }
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
    }

    async updateProduct(idProduct, productNow) {
        await this.checkFileExists()
        try {
            let allProducts = await this.getProducts();
            const index = allProducts.findIndex((item) => item.id === idProduct);
            if (index === -1) {
                return { error: 'producto no encontrado.'}
            }

            allProducts[index] = {...productNow, id: idProduct}
            await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, 2));
            return allProducts[index];
        } catch (err) {
            console.log('Hubo un error: ' + err);
        }
    }

    async deleteAllProducts() {
        await this.checkFileExists()
        try {
            await fs.promises.writeFile(this.path, '[]');
            this.idProducts = 1;
        } catch (err) {
            console.log('Hubo un error: ' + err);
        }
    }

    async deleteProductById(idProduct) {
        await this.checkFileExists()
        try {
            let allProducts = await this.getProducts()
            let product = allProducts.filter((item) => item.id !== idProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(product))
        } catch (err) {
            console.log(err);
        }
    }

}

const productmanager = new ProductManager("./products.txt")

const obj1 = {title: "Mango", description: "Fruta tropical", price: 200, thumbnail: "mango.jpg", code: "123456", stock: 50}
const obj2 = {title: "Pera", description: "Fruta Pomacea", price: 100, thumbnail: "pera.jpg", code: "123456", stock: 30}
const obj3 = {title: "Limon", description: "Fruta cítrica", price: 50, thumbnail: "pera.jpg", code: "654321", stock: 35}
const obj4 = {title: "Zanahoria", description: "Verdura", price: 80, thumbnail: "zanahoria.jpg", code: "789101", stock: 60}
const obj5 = {title: "Papita", description: "Verdura", price: 30, thumbnail: "papita.jpg", code: "555101", stock: 100}


const test = async () => {

    console.log('/-------------------------------------/');
    console.log('/--1) Primer llamado de getProducts--/');
    console.log('/-----------------------------------/');
    console.log(await productmanager.getProducts());

    console.log(await productmanager.addProduct(obj1))

    console.log('/---------------------------------------------------------/');
    console.log('/--No se agrega Pera porque tiene un code igual a Mango--/');
    console.log('/-------------------------------------------------------/');
    console.log(await productmanager.addProduct(obj2))

    console.log(await productmanager.addProduct(obj3))

    console.log(await productmanager.addProduct(obj4))

    console.log('/------------------------------------------/');
    console.log('/--2) Llamado de getProducts 2do intento--/');
    console.log('/----------------------------------------/');
    console.log(await productmanager.getProducts());

    console.log('/--------------------------------/');
    console.log('/--3) Llamado de getProductById--/');
    console.log('/--------------------------------/');

    console.log('/--------------------------------------/');
    console.log('/--a) Llamado de getProductById id 1--/');
    console.log('/------------------------------------/');
    console.log(await productmanager.getProductById(1));
    console.log('/-----------------------------------------------------------/');
    console.log('/--3) Llamado de getProductById id 5 (Producto no existe)--/');
    console.log('/-----------------------------------------------------------/');
    console.log(await productmanager.getProductById(5));
    console.log('/--------------------------------------/');
    console.log('/--3) Llamado de getProductById id 3--/');
    console.log('/------------------------------------/');
    console.log(await productmanager.getProductById(3));
    console.log('/--------------------------------------/');
    console.log('/--3) Llamado de getProductById id 2--/');
    console.log('/------------------------------------/');
    console.log(await productmanager.getProductById(2));
    console.log('/--------------------------------------/');
    console.log('/--3) Llamado de getProductById id 4--/');
    console.log('/------------------------------------/');
    console.log(await productmanager.getProductById(4));

    console.log("-----------------------------------------------------");
    
    console.log("Prueba de updateProduct");
    console.log(await productmanager.updateProduct(4, obj5));
    console.log("Ahora en el id 4 está 'papita'");
    console.log("-----------------------------------------------------");
    console.log(await productmanager.getProductById(4));
    
    console.log("-----------------------------------------------------");
    
    // console.log("Prueba de deleteById");
    // console.log(await productmanager.deleteProductById(1));
    // console.log("Ahora en el id 1 no hay producto");
    // console.log("-----------------------------------------------------");
    // console.log(await productmanager.getProductById(1));
    

    console.log("-----------------------------------------------------");
    
    // console.log("Prueba de deleteAll");
    // await productmanager.deleteAllProducts();
    // console.log(await productmanager.getProducts());
    
    console.log("-----------------------------------------------------");

    console.log('/--------------------------------/');
    console.log('/----------Fin------------------/');
    console.log('/------------------------------/');
}

test();



