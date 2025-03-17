import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('test');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
})