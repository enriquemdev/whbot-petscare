import express, { Express, Request, Response } from "express";
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
import { getGroupChatId, getGroupChatName } from "./helpers";

const app: Express = express();
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // to work on no gui systems and if the system runs with root privileges
    }
});
const port = 3000;

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

        // WEB ROUTES

        app.get('/', (req: Request, res: Response) => {
            res.send('test');
        });


        // END WEB ROUTES
        app.listen(port, () => {
            console.log(`Servidor iniciado en http://localhost:${port}`);
        })
    } catch (error) {
        console.error('Error starting web server:', error);
    }
}

startWebServer();
