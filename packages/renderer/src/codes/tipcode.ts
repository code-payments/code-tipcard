import fs from 'fs';
import path from 'path';
import { Image, CanvasRenderingContext2D, Path2D } from 'skia-canvas';
import { KikCode, CodePayload, CodeKind, encode } from "@code-wallet/kikcode";

let initailized = false;
const assets = {
    codeLogo: new Image(),
}

function initialize() {
    assets.codeLogo.src = fs.readFileSync(path.resolve(__dirname, '../../assets/code-logo-4x.png'));
    initailized = true;
}

export async function render(ctx: CanvasRenderingContext2D, username: string) {
    if (!initailized) {
        initialize();
    }

    const {width, height} = ctx.canvas;

    const kikcodeSize = { width: 400, height: 400, }
    const payload = new CodePayload({
        username,
        kind: CodeKind.Tip,
    });

    //const rendezvous = generateRendezvousKeypair(payload);
    const encoded = await encode(payload.toBinary());
    const kikcode = KikCode.generateDescription(kikcodeSize, encoded);

    // Draw the KikCode
    ctx.save();
    {
        ctx.translate(width / 2, height / 2);
        ctx.translate(-kikcodeSize.width / 2, -kikcodeSize.height / 2);

        for (const arc of kikcode.arcs) {
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineCap = 'round';
            ctx.lineWidth = (5.4/173) * kikcodeSize.width;
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
        const offset = (56/173) * kikcodeSize.width;

        ctx.translate(0, offset);
        ctx.translate(width / 2, height / 2);
        ctx.translate(0, -kikcodeSize.height / 2);
        ctx.translate(-offset/2, 6);

        ctx.drawImage(assets.codeLogo, 0, 0, offset, offset);
    }
    ctx.restore();

}