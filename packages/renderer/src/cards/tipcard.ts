import fs from 'fs';
import path from 'path';
import { Image, CanvasRenderingContext2D, Path2D, FontLibrary } from 'skia-canvas';
import { KikCode, CodePayload, CodeKind, encode } from "@code-wallet/kikcode";

let initailized = false;
const assets = {
    tipcardBackground: new Image(),
    twitterLogo: new Image(),
    codeLogo: new Image(),
}

function initialize() {
    assets.tipcardBackground.src = fs.readFileSync(path.resolve(__dirname, '../../assets/tipcard-background.png'));
    assets.twitterLogo.src = fs.readFileSync(path.resolve(__dirname, '../../assets/twitter-logo.png'));
    assets.codeLogo.src = fs.readFileSync(path.resolve(__dirname, '../../assets/code-logo.png'));

    FontLibrary.use('AvenirNextLTPro-Demi', [
        "fonts/avenir/AvenirNextLTPro-Demi.otf",
    ]);

    initailized = true;
}

export async function render(ctx: CanvasRenderingContext2D, username: string) {
    if (!initailized) {
        initialize();
    }

    const {width, height} = ctx.canvas;

    const kikcodeSize = { width: 173, height: 173, }
    const payload = new CodePayload({
        username,
        kind: CodeKind.Tip,
    });

    //const rendezvous = generateRendezvousKeypair(payload);
    const encoded = await encode(payload.toBinary());
    const kikcode = KikCode.generateDescription(kikcodeSize, encoded);

    // Background
    ctx.drawImage(assets.tipcardBackground, 0, 0, width, height);

    // Draw the KikCode
    ctx.save();
    {
        ctx.translate(width / 2, height / 2);
        ctx.translate(-kikcodeSize.width / 2, -kikcodeSize.height / 2);
        ctx.translate(0, -52);

        for (const arc of kikcode.arcs) {
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineCap = 'round';
            ctx.lineWidth = 5.4;
            ctx.stroke(new Path2D(arc));
        }

        for (const dot of kikcode.dots) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fill(new Path2D(dot));
        }
    }
    ctx.restore();

    // Draw the Code logo
    ctx.save();
    {
        const logoSize = 56;

        ctx.translate(width / 2, height / 2);
        ctx.translate(0, -kikcodeSize.height / 2);
        ctx.translate(-logoSize/2, 6);

        ctx.drawImage(assets.codeLogo, 0, 0, logoSize, logoSize);
    }
    ctx.restore();

    // Twitter logo and username
    ctx.save();
    {
        const fontSize = 20;
        const logoSize = fontSize;
        const space = 10;

        ctx.fillStyle = 'white';
        ctx.font = `${fontSize}px AvenirNextLTPro-Demi`; 

        const text = `${username}`;
        const textWidth = ctx.measureText(text).width;

        ctx.translate((width - textWidth - space - logoSize)/2, height-178);
        ctx.drawImage(assets.twitterLogo, 0, -logoSize + 4, logoSize, logoSize);
        ctx.fillText(`${username}`, logoSize + space, 0);
    }
    ctx.restore();
}