export const playClickSound = () => {
  const audio = new Audio('/click.wav');
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play failed:', e));
};
