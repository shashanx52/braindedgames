import React, { useRef, useState, useEffect } from "react";

const BRUSH_RADIUS = 5;

const ScribbleGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(BRUSH_RADIUS);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctxRef.current = ctx;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
  }, [brushSize, color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="scribble-game">
      <h2>Scribble Game</h2>
      
      <div>
        <label>Brush Size: </label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
        />
        
        <label>Color: </label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
        />

        <button onClick={clearCanvas}>Clear</button>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
};

export default ScribbleGame;
