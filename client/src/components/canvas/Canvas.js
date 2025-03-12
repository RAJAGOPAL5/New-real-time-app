// client/src/components/canvas/Canvas.js
import React, { useRef } from 'react';
import { emitDraw } from '../../services/socketService';

const Canvas = ({ color, brushSize }) => {
  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    const handleMouseMove = (e) => {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();

      // ✅ Emit drawing event to server
      emitDraw({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        color,
        brushSize
      });
    };

    const handleMouseUp = () => {
      canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current.removeEventListener('mouseup', handleMouseUp);
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      width={800}
      height={500}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
