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
            return `Se actualizó el producto con id: ${idProduct}`;
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

//Falta title
const obj1 = {description: "Fruta tropical", price: 200, thumbnail: "mango.jpg", code: "123456", stock: 50}
const obj2 = {title: "Pera", description: "Fruta Pomacea", price: 100, thumbnail: "pera.jpg", code: "123456", stock: 30}
//Mismo code que Pera, no se va a agregar.
const obj3 = {title: "Limon", description: "Fruta cítrica", price: 50, thumbnail: "pera.jpg", code: "123456", stock: 35}

const obj4 = {title: "Zanahoria", description: "Verdura", price: 80, thumbnail: "zanahoria.jpg", code: "789101", stock: 60}
const obj5 = {title: "Papita", description: "Verdura", price: 30, thumbnail: "papita.jpg", code: "555101", stock: 100}
const obj6 = {title: "Naranja", description: "Fruta cítrica", price: 30, thumbnail: "naranja.jpg", code: "888923", stock: 10}
const obj7 = {title: "Frutilla", description: "Fruta fria", price: 30, thumbnail: "frutilla.jpg", code: "000123", stock: 200}
const obj8 = {title: "Melon", description: "Fruta trópical", price: 30, thumbnail: "melon.jpg", code: "465783", stock: 60}


const test = async () => {

    console.log('/-------------------------------------/');
    console.log('/--1) Primer llamado de getProducts--/');
    console.log(await productmanager.getProducts());

    console.log('/---------------------------------------------------------/');
    console.log('/--No se agrega porque le falta "title"--/');
    console.log(await productmanager.addProduct(obj1))
    
    console.log(await productmanager.addProduct(obj2))

    console.log('/---------------------------------------------------------/');
    console.log('/--No se agrega "Limon" porque tiene el mismo code que "Pera"--/');
    console.log(await productmanager.addProduct(obj3))
    console.log(await productmanager.addProduct(obj4))
    console.log(await productmanager.addProduct(obj5))
    console.log(await productmanager.addProduct(obj6))
    console.log(await productmanager.addProduct(obj7))

    console.log('/------------------------------------------/');
    console.log('/--2) Llamado de getProducts 2do intento--/');
    console.log(await productmanager.getProducts());

    console.log('/--------------------------------/');
    console.log('/--3) Llamado de getProductById--/');

    console.log('/--------------------------------------/');
    console.log('/--a) Llamado de getProductById id 1--/');
    console.log(await productmanager.getProductById(1));
    console.log('/-----------------------------------------------------------/');
    console.log('/--3) Llamado de getProductById id 6 (Producto no existe)--/');
    console.log('/-----------------------------------------------------------/');
    console.log(await productmanager.getProductById(6));
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
    console.log(await productmanager.updateProduct(4, obj8));
    console.log("-----------------------------------------------------");
    console.log("Ahora en el id 4 está 'Melon'");
    console.log("-----------------------------------------------------");
    console.log(await productmanager.getProductById(4));
    
    console.log("-----------------------------------------------------");
    
    //Estan comentados los métodos delete porque me borran los datos del txt entonces no puedo testear correctamente, los demas metodos, si quieres testear deleteById y deleteAll, solo descomentalos :D. 

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



