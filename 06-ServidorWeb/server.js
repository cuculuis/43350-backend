import  express  from "express";
import { ProductManager } from "./src/manager.js";

const app = express()
const PORT = 8080;

const productManager = new ProductManager("./src/products.txt")

const obj1 = {title: "Mango", description: "Fruta tropical", price: 200, thumbnail: "mango.jpg", code: "123456", stock: 50}
const obj2 = {title: "Pera", description: "Fruta Pomacea", price: 100, thumbnail: "pera.jpg", code: "560231", stock: 30}
const obj3 = {title: "Limon", description: "Fruta cítrica", price: 50, thumbnail: "pera.jpg", code: "777666", stock: 35}
const obj4 = {title: "Zanahoria", description: "Verdura", price: 80, thumbnail: "zanahoria.jpg", code: "789101", stock: 60}
const obj5 = {title: "Papita", description: "Verdura", price: 30, thumbnail: "papita.jpg", code: "555101", stock: 100}
const obj6 = {title: "Naranja", description: "Fruta cítrica", price: 10, thumbnail: "naranja.jpg", code: "888923", stock: 10}
const obj7 = {title: "Frutilla", description: "Fruta fria", price: 200, thumbnail: "frutilla.jpg", code: "000123", stock: 200}
const obj8 = {title: "Melon", description: "Fruta trópical", price: 80, thumbnail: "melon.jpg", code: "465783", stock: 10}
const obj9 = {title: "Zapallo", description: "Verdura", price: 150, thumbnail: "zapallo.jpg", code: "000555", stock: 50}
const obj10 = {title: "Lechuga", description: "Verdura", price: 90, thumbnail: "lechuga.jpg", code: "400111", stock: 70}

await productManager.addProduct(obj1)
await productManager.addProduct(obj2)
await productManager.addProduct(obj3)
await productManager.addProduct(obj4)
await productManager.addProduct(obj5)
await productManager.addProduct(obj6)
await productManager.addProduct(obj7)
await productManager.addProduct(obj8)
await productManager.addProduct(obj9)
await productManager.addProduct(obj10)


app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: `Producto con id: ${id} no encontrado` });
    }
    })

app.get('/products', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
})

app.listen(PORT, () => {
    console.log('Server up at the port: ' + PORT);
})
