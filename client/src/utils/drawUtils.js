export const drawOnCanvas = (ctx, { x, y, color, brushSize }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  