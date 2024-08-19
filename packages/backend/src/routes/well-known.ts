import https from "https";
import { Router } from "express";

const router = Router();

router.get('/apple-app-site-association', (req, res, next) => {
    const url = 'https://app.getcode.com/.well-known/apple-app-site-association';
    res.setHeader('Content-Type', 'application/json');
    https.get(url, (response: any) => { response.pipe(res); });
});

router.get('/assetlinks.json', (req, res, next) => {
    const url = 'https://app.getcode.com/.well-known/assetlinks.json';
    res.setHeader('Content-Type', 'application/json');
    https.get(url, (response: any) => { response.pipe(res); });
});

export default router;