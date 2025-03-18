import express, { Express, Request, Response } from "express";
import mongoose, {Schema, Document } from 'mongoose';
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
import dotenv from 'dotenv';
import { getGroupChatName, getGroupChatId } from "./helpers";

dotenv.config();

const app: Express = express();
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // to work on no gui systems and if the system runs with root privileges
    }
});
const port = 3000;

app.use(express.json());

// Connect to mongodb with mongoose
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// } as mongoose.ConnectOptions
mongoose.connect(process.env.MONGODB_URI!)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})


async function initializeWhatsappClient () {
    try {
        client.once('ready', () => {
            console.log('Whatsapp client is ready!');
        });
        
        client.on('qr', (qr: any) => {
            qrcode.generate(qr, {small: true});
            console.log('Whatsapp QR RECEIVED', qr);
        });

        await client.initialize();
        console.log('Whatsapp client initialized');
    } catch (error) {
        console.error('Error initializing whatsapp client:', error);
    }
}

async function startWebServer() {
    try {
        await initializeWhatsappClient();

        // WEB ROUTES (FUNCTIONS)

        app.get('/', async (req: Request, res: Response) => {
            console.log('yes');
            try {

            } catch (error) {

            }
            const groupChatName = await getGroupChatName();

            if (groupChatName) {
                const groupChatId = await getGroupChatId(groupChatName, client);
                res.send(groupChatId);
            } else {
                // groupChatName es undefined, manejar el error o enviar una respuesta adecuada
                res.status(404).send('Nombre del grupo no encontrado'); // Ejemplo: devolver un error 404
            }
           
        });

        // END WEB ROUTES
        app.listen(port, () => {
            console.log(`Servidor web iniciado en http://localhost:${port}`);
        })
    } catch (error) {
        console.error('Error starting web server:', error);
    }
}

startWebServer();
