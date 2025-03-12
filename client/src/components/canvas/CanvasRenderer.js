// import React, { useRef, useEffect } from 'react';
// import { drawOnCanvas } from '../../utils/drawUtils';
// import { socket } from '../../context/socketContext';

// const CanvasRenderer = ({ color, brushSize }) => {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const handleMouseMoveRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = 800;
//     canvas.height = 600;
//     const ctx = canvas.getContext('2d');
//     ctx.lineCap = 'round';
//     ctxRef.current = ctx;

//     socket.on('draw', (data) => drawOnCanvas(ctxRef.current, data));
//     socket.on('clear', clearCanvas);

//     return () => {
//       socket.off('draw');
//       socket.off('clear');
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     const ctx = ctxRef.current;
//     const { offsetX, offsetY } = getMousePosition(e);

//     ctx.strokeStyle = color;
//     ctx.lineWidth = brushSize;
//     ctx.beginPath();
//     ctx.moveTo(offsetX, offsetY);

//     handleMouseMoveRef.current = (e) => {
//       const { offsetX, offsetY } = getMousePosition(e);
//       ctx.lineTo(offsetX, offsetY);
//       ctx.stroke();

//       socket.emit('draw', {
//         x: offsetX,
//         y: offsetY,
//         color,
//         brushSize,
//       });
//     };

//     canvasRef.current.addEventListener('mousemove', handleMouseMoveRef.current);
//     canvasRef.current.addEventListener('mouseup', handleMouseUp);
//   };

//   const handleMouseUp = () => {
//     if (handleMouseMoveRef.current) {
//       canvasRef.current.removeEventListener('mousemove', handleMouseMoveRef.current);
//       handleMouseMoveRef.current = null;
//     }
//     canvasRef.current.removeEventListener('mouseup', handleMouseUp);
//   };

//   const getMousePosition = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       offsetX: e.clientX - rect.left,
//       offsetY: e.clientY - rect.top,
//     };
//   };

//   const clearCanvas = () => {
//     const ctx = ctxRef.current;
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       onMouseDown={handleMouseDown}
//       style={{
//         border: '2px solid black',
//         backgroundColor: '#ffffff',
//         cursor: 'crosshair',
//         width: '800px',
//         height: '600px',
//       }}
//     />
//   );
// };

// export default CanvasRenderer;


// client/src/components/canvas/CanvasRenderer.js
import React from 'react';
import Canvas from './Canvas';

const CanvasRenderer = ({ canvasRef }) => {
  return (
    <Canvas canvasRef={canvasRef} />
  );
};

export default CanvasRenderer;
