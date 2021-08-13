import MainMenu from './scenes/mainMenu.js';

//config for game object
const config = {
    scale: {
        parent: 'mygame',
        autoCenter: Phaser.Scale.FIT,
        width: 1000,
        height: 600
        
    },
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
}

const game = new Phaser.Game(config);
game.scene.add('mainmenu', MainMenu);
game.scene.start('mainmenu');

