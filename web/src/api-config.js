// API Configuration
// Updated: 2026-03-04

export const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://kiyafet-magazasi-backend.vercel.app';

console.log('API_URL configured:', API_URL);
