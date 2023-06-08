import { Router } from "express";
import ProductManager from "../Controllers/ProductManager.js";

const productRouter = Router()
export const productManager = new ProductManager('./src/DB/products.json')


    productRouter.get('/', async (req, res) => {
        res.render('realTimeProducts', {products: await productManager.getProducts()})
    })

    productRouter.post('/', async (req, res) => {
        try {
            let newProduct = req.body

            if (await productManager.validateProduct(req.body.title, req.body.description, req.body.code, req.body.price, req.body.status, req.body.stock, req.body.category)){
                res.status(400).json({ error: `The keys 'title', 'description', 'code', 'price', 'status', 'stock', 'category' are required` });
            }
            
            else if(await productManager.checkCodeExists(req.body.code)) {
                res.status(400).json({ error: `The code: ${req.body.code} is already used.` });
            } 

            else {
                await productManager.addProduct(newProduct)
                res.redirect('/realTimeProducts')
            }
            
        } catch (error) {
            console.log(error)
        } 
    })

    productRouter.post('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const product = await productManager.getProductById(id);
        if (product) {
            await productManager.deleteProductById(parseInt(req.params.id))
            res.redirect('/realTimeProducts')
        } else {
            res.status(404).json({ error: `Product with id: ${id} not found.` });
        }
    });

    export default productRouter;