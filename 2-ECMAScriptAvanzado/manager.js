class ProductManager {

    constructor() {
        this.products = [];
        this.idProducts = 1
        this.error = undefined
    }

    validateProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return this.error = `campos incompletos`
        } else {
            const found = this.products.find(product => product.code === code)
            if (found) {return this.error = `El code: ${code} ya existe`}
            else {return this.error = undefined}
        }
    }


    addProduct(object) {
        if (!object.code) {
            let codigo = Math.random().toString(36).substring(2, 8);
            object.code = codigo
        }

        this.validateProduct(object.title, object.description, object.price, object.thumbnail, object.code, object.stock)
        if (this.error === undefined) {
            object.id = this.idProducts;
            this.products.push(object);
            this.idProducts++;
        }
        else {
            console.log(this.error);
        }

    }

    getProducts() {
        return this.products
    }

    getProductById(productId) {
        const product = this.products.find((product) => product.id === productId);
    
        if (!product) {
            return "Producto no encontrado.";
        }

        return product;
    }
}

const productmanager = new ProductManager()

console.log('/-------------------------------------/');
console.log('/--1) Primer llamado de getProducts--/');
console.log('/-----------------------------------/');
console.log(productmanager.getProducts());

productmanager.addProduct({title: "Mango", description: "Fruta tropical", price: 200, thumbnail: "mango.jpg", code: "123456", stock: 50})

console.log('/---------------------------------------------------------/');
console.log('/--No se agrega Pera porque tiene un code igual a Mango--/');
console.log('/-------------------------------------------------------/');
productmanager.addProduct({title: "Pera", description: "Fruta Pomacea", price: 100, thumbnail: "pera.jpg", code: "123456", stock: 30})

productmanager.addProduct({title: "Limon", description: "Fruta cítrica", price: 50, thumbnail: "pera.jpg", stock: 35})

productmanager.addProduct({title: "Zanahoria", description: "Verdura", price: 80, thumbnail: "zanahoria.jpg", stock: 60})

console.log('/------------------------------------------/');
console.log('/--2) Llamado de getProducts 2do intento--/');
console.log('/----------------------------------------/');
console.log(productmanager.getProducts());

console.log('/--------------------------------/');
console.log('/--3) Llamado de getProductById--/');
console.log('/--------------------------------/');

console.log('/--------------------------------------/');
console.log('/--a) Llamado de getProductById id 1--/');
console.log('/------------------------------------/');
console.log(productmanager.getProductById(1));
console.log('/-----------------------------------------------------------/');
console.log('/--3) Llamado de getProductById id 5 (Producto no existe)--/');
console.log('/-----------------------------------------------------------/');
console.log(productmanager.getProductById(5));
console.log('/--------------------------------------/');
console.log('/--3) Llamado de getProductById id 3--/');
console.log('/------------------------------------/');
console.log(productmanager.getProductById(3));
console.log('/--------------------------------------/');
console.log('/--3) Llamado de getProductById id 2--/');
console.log('/------------------------------------/');
console.log(productmanager.getProductById(2));

console.log('/--------------------------------/');
console.log('/----------Fin------------------/');
console.log('/------------------------------/');




