class ProductManager {

    constructor() {
        this.products = [];
        this.idProducts = 1
    }



    addProduct(object) {
        if (!object.code) {
            let codigo = Math.random().toString(36).substring(2, 8);
            object.code = codigo
        }

        const existingProduct = this.products.find((p) => p.code === this.products.code);
        if (existingProduct) {
            throw new Error("El código de producto ya existe.");
        }

        object.id = this.idProducts;
        this.products.push(object);
        this.idProducts++;
    }

    getProducts() {
        return this.products
    }

    getProductById(productId) {
        const product = this.products.find((product) => product.id === productId);
    
        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }
}

const productmanager = new ProductManager()

console.log('/--1) Primer llamado de getProducts--/');
console.log(productmanager.getProducts());

productmanager.addProduct({title: "Mango", descripcion: "Fruta tropical", price: 200, thumbnail: "mango.jpg", code: "123456", stock: 50})

productmanager.addProduct({title: "Pera", descripcion: "Fruta Pomacea", price: 100, thumbnail: "pera.jpg", code: "123456", stock: 30})

productmanager.addProduct({title: "Limon", descripcion: "Fruta cítrica", price: 50, thumbnail: "pera.jpg", stock: 35})

productmanager.addProduct({title: "Zanahoria", descripcion: "Verdura", price: 80, thumbnail: "zanahoria.jpg", stock: 60})

console.log('/--2) Llamado de getProducts 2do intento--/');
console.log(productmanager.getProducts());

console.log('/--3) Llamado de getProductById--/');
console.log('/--a) Llamado de getProductById id 1--/');
console.log(productmanager.getProductById(1));
console.log('/--3) Llamado de getProductById id 3--/');
console.log(productmanager.getProductById(3));
console.log('/--3) Llamado de getProductById id 2--/');
console.log(productmanager.getProductById(2));

console.log('/----------Fin----------/');




