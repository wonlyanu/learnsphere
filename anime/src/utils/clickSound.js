export const playClickSound = () => {
  const audio = new Audio(process.env.PUBLIC_URL + "/click.mp3");
  audio.volume = 0.5;
  audio.play();
};
