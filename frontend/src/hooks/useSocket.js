import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = (user) => {
  const [grid, setGrid] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('get_grid');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('grid_data', (data) => {
      const gridMap = {};
      data.forEach(cell => {
        gridMap[`${cell.x}-${cell.y}`] = cell;
      });
      setGrid(gridMap);
    });

    socket.on('cell_updated', (cell) => {
      setGrid(prev => ({
        ...prev,
        [`${cell.x}-${cell.y}`]: cell
      }));
    });

    socket.on('claim_failed', ({ x, y, reason }) => {
      console.warn(`Claim failed for (${x}, ${y}): ${reason}`);
      // You could add a toast here
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const claimCell = useCallback((x, y) => {
    if (cooldown > 0) return;
    
    socketRef.current.emit('claim_cell', {
      x,
      y,
      userId: user.id,
      color: user.color
    });
    
    const envCooldown = parseInt(import.meta.env.VITE_COOLDOWN) || 0;
    if (envCooldown > 0) {
      setCooldown(envCooldown);
    }
  }, [user, cooldown]);

  return { grid, isConnected, claimCell, cooldown };
};
