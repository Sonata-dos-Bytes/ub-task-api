import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({
        "status": true,
        "message": "Welcome to the UB API!",
        "data": {
            "contact": {
                "email_personal": "pedro.henrique.martins404@gmail.com",
                "email_academic": "pedro.borges@alu.unibalsas.edu.br",
                "github": "https://github.com/orgs/Sonata-dos-Bytes/repositories",
            },
            "version": "4.0.0v"
        },
    });
});

router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve("./src/static/favicon.ico"));
});

export default router;
