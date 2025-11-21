let backgroundAudio = null;

export const playBackgroundMusic = (musicFile) => {
  try {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    backgroundAudio = new Audio(`/${musicFile}`);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.9; // Set volume to 80% to not be too loud
    backgroundAudio.muted = false; // Ensure audio is not muted

    const playPromise = backgroundAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Background music play failed:', error);
      });
    }
  } catch (error) {
    console.log('Error playing background music:', error);
  }
};

export const playBackgroundMusicNoFile = () => {
  try {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    backgroundAudio = new Audio('/games.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3;

    const playPromise = backgroundAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Background music play failed:', error);
      });
    }
  } catch (error) {
    console.log('Error playing background music:', error);
  }
};

export const playSuccessSound = () => {
  try {
    const successAudio = new Audio('/success.wav');
    successAudio.volume = 0.7; // Set volume to 70% for success sound
    successAudio.muted = false;

    const playPromise = successAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Success sound play failed:', error);
      });
    }
  } catch (error) {
    console.log('Error playing success sound:', error);
  }
};

export const stopBackgroundMusic = () => {
  if (backgroundAudio) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio = null;
  }
};

export const pauseBackgroundMusic = () => {
  if (backgroundAudio) {
    backgroundAudio.pause();
  }
};

export const resumeBackgroundMusic = () => {
  if (backgroundAudio) {
    backgroundAudio.muted = false; // Ensure audio is not muted
    const playPromise = backgroundAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Background music resume failed:', error);
        // If resume fails, restart the music
        playBackgroundMusicNoFile();
      });
    }
  }
};
