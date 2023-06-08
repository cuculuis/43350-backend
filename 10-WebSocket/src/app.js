import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './util.js'
import { productManager } from './routes/productRoute.js'
import productRouter from './routes/productRoute.js'

const app = express();

const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/realTimeProducts', productRouter)


app.get('/products', async (req, res) => {
    res.render('products', { products: await productManager.getProducts()});
})



const serverHttp = app.listen(PORT, () => {console.log('Servidor escuchando en el: ' + PORT);})
const io = new Server(serverHttp)

io.on('connection', (socket) => {
    console.log('A new user connected');

    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
        await productosContenedor.save(data);
        io.sockets.emit('products', products);
    });

    });

