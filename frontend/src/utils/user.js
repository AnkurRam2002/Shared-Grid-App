import { v4 as uuidv4 } from 'uuid';

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#14b8a6', '#06b6d4', '#f43f5e', '#a855f7'
];

export const getOrCreateUser = () => {
  let user = localStorage.getItem('grid_user');
  if (user) {
    return JSON.parse(user);
  }

  const newUser = {
    id: uuidv4(),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };

  localStorage.setItem('grid_user', JSON.stringify(newUser));
  return newUser;
};
