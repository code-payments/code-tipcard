import express from "express";
import fs from "fs";
import path from "path";
import { 
    renderSocial,
    renderCode,
} from "@code-wallet/tipcard-renderer";

const router = express.Router();

function isValid (handle: string) {
    return /^[a-zA-Z0-9_]{1,15}$/.test(handle);
}

// Html page
router.get('/x/:handle', (req, res, next) => {
    if (!isValid(req.params.handle)) {
        return res.status(400).send('Invalid request');
    }

    const template = path.join(__dirname, '../../public/index.html');
    const content = fs.readFileSync(template, 'utf8');

    const html = content
        .replace(/{{handle}}/g, req.params.handle)
        .replace(/{{platform}}/g, 'x');

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

// Opengraph Image
router.get('/assets/images/x/:handle.png', async (req, res, next) => {
    if (!isValid(req.params.handle)) {
        return res.status(400).send('Invalid request');
    }

    const buf = await renderSocial(req.params.handle);
    res.setHeader('Content-Type', 'image/png');
    res.send(buf);
});

router.get('/assets/images/kikcode/x/:handle.png', async (req, res, next) => {
    if (!isValid(req.params.handle)) {
        return res.status(400).send('Invalid request');
    }

    const buf = await renderCode(req.params.handle);
    res.setHeader('Content-Type', 'image/png');
    res.send(buf);
})

router.get('/favicon.ico', (req, res) => { 
    res.sendFile('favicon.ico', { root: 'public' });
});

export default router;