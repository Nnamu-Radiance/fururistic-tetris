import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Point } from '../types';
import { Trophy, RotateCcw, Play } from 'lucide-react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [gameState, setGameState] = useState<GameState>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, []);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState('PLAYING');
    generateFood(INITIAL_SNAKE);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-[400px] px-4">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Score</span>
          <span className="text-2xl font-mono neon-text-cyan">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">High Score</span>
          <span className="text-2xl font-mono neon-text-pink">{highScore}</span>
        </div>
      </div>

      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-zinc-900/50 rounded-xl neon-border-cyan overflow-hidden backdrop-blur-sm">
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-500/20" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute rounded-sm ${i === 0 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10' : 'bg-cyan-600/80'}`}
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(segment.x * 100) / GRID_SIZE}%`,
              top: `${(segment.y * 100) / GRID_SIZE}%`,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x * 100) / GRID_SIZE}%`,
            top: `${(food.y * 100) / GRID_SIZE}%`,
          }}
        />

        {/* Overlays */}
        {gameState === 'START' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md z-20">
            <h2 className="text-4xl font-bold mb-8 neon-text-cyan tracking-tighter italic">NEON SNAKE</h2>
            <button
              onClick={startGame}
              className="group flex items-center gap-3 px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 rounded-full transition-all duration-300"
            >
              <Play className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-cyan-400 font-medium tracking-widest uppercase text-sm">Start Game</span>
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md z-20">
            <Trophy className="w-16 h-16 text-pink-500 mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
            <h2 className="text-3xl font-bold mb-2 text-pink-500 tracking-tight">GAME OVER</h2>
            <p className="text-zinc-400 mb-8 font-mono">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="group flex items-center gap-3 px-8 py-3 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/50 rounded-full transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 text-pink-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-pink-400 font-medium tracking-widest uppercase text-sm">Try Again</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4 text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">↑↓←→</kbd> to move</span>
      </div>
    </div>
  );
};
