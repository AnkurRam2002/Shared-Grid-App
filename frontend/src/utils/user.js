import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#14b8a6', '#06b6d4', '#f43f5e', '#a855f7'
];

export const getOrCreateUser = () => {
  let userStr = localStorage.getItem('grid_user');
  let user = userStr ? JSON.parse(userStr) : null;

  // Migration: If user exists but doesn't have a name, or if no user exists
  if (!user || !user.name) {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: ' ',
      length: 2,
      style: 'capital'
    });

    if (!user) {
      user = {
        id: uuidv4(),
        name: randomName,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    } else {
      user.name = randomName;
    }

    localStorage.setItem('grid_user', JSON.stringify(user));
  }

  return user;
};
