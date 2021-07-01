# ModRocketPatrol
https://thesalted.github.io/ModRocketPatrol/

https://github.com/theSalted/ModRocketPatrol

Here is my point breakdown:

- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
- Add your own (copyright-free) background music to the Play scene (5)
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Create a new animated sprite for the Spaceship enemies (10)
- Implement parallax scrolling (10)
- Allow the player to control the Rocket after it's fired (5)
- Track a high score that persists across scenes and display it in the UI (5)
- Randomize each spaceship's movement direction at the start of each play (5)
- Implement mouse control for player movement and mouse click to fire (20)
- Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
- Display the time remaining (in seconds) on the screen (10)
- Implement the speed increase that happens after 30 seconds in the original game (5)
- Implement the 'FIRE' UI text from the original game (5)
- Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
- Create a new scrolling tile sprite for the background (5)
- Implement a simultaneous two-player mode (30)
- Some of the implementation might not be obvious right away, here is few examples:

The game will show both 'FIRE UI' and a timer at the top of the gameplay. However, they won't be displayed at the same time. Instead, the game will show player a timer during the first five seconds of gameplay after player start the game . Then it will hide the timer, and display 'FIRE UI' instead. And in the last ten seconds of a game the timer will reappear. This is not a bug, it's a feature.

I also implemented the bonus time mechanism, but I don't want player to play indefinitely. So, what I did is this: during a normal game session each 'bear' the player hits will grant them certain amount bonus time (the amount of time added is determined by the hidden score value). The bonus time will not be added to right away. Instead the time will be add to a special bonus session (bonus time is only available to single player mode).

I also implement mouse control. But it's not enable for the single player mode. Instead it is reserved for player two in multiplayer mode.

Also, player can control their RainBall in mid air if the choose the novice mode. They can't if they choose the export mode.

