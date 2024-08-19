import { Canvas } from 'skia-canvas'
import { render as socialRenderer } from "./cards/tipcard"
import { render as codeRenderer } from "./codes/tipcode"

export async function renderSocial(username: string) {
  const canvas = new Canvas(1040, 640);
  const ctx = canvas.getContext("2d");

  await socialRenderer(ctx, username);
  return await canvas.png;
}

export async function renderCode(username: string) {
  const canvas = new Canvas(400, 400);
  const ctx = canvas.getContext("2d");

  await codeRenderer(ctx, username);
  return await canvas.png;
}