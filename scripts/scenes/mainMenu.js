export default class MainMenu extends Phaser.Scene
{
    preload()
    {
        
    }

    create()
    {
        //create start button and add event listeners
        var StartButtonStyle = {
            fill: '#000000',
            fontSize: '50px',
            align: 'center'
        };
        this.StartButton = this.add.text(500, 400, 'Start', StartButtonStyle).setOrigin(0.5).setInteractive()
        .on('pointerdown', () => this.startButtonPressed())
        .on('pointerover', () => this.startButtonOver())
        .on('pointerout', () => this.startButtonOut());

    }

    startButtonPressed()
    {
        this.StartButton.setStyle({ fill: '#27ff00'})
        this.StartButton.setText("I've been clicked.")
    }

    startButtonOver()
    {
        this.StartButton.setStyle({ fill: '#fff700'});
    }

    startButtonOut()
    {
        this.StartButton.setStyle({ fill: '#000000'});
    }
}
