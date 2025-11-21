export const playSelectSound = () => {
  const audio = new Audio('/select.mp3');
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play failed:', e));
};
