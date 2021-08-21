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


        //connect to server
        this.socket = io('http://localhost:3000');
        var clientSocket = this.socket;

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });
        
        this.socket.on('responseUUIDValidation', function(accepted, acceptedUUID) {
            if (accepted) {
                //new uuid was accepted
                localStorage.setItem('playerUUID', acceptedUUID);
                clientSocket.emit('connectWithUUID', acceptedUUID);
            } else {
                //new uuid was rejected. generate new uuid and resend validation request
                var playerUUID = uuidv4();
                clientSocket.emit('validateNewUUID', playerUUID);
            }
        });

    }

    startButtonPressed()
    {
        this.StartButton.setStyle({ fill: '#27ff00'})

        //gets playerUUID from local storage. if not found, generates new UUID and sends to server to check if new UUID is not already taken.
        var playerUUID = localStorage.getItem('playerUUID');
        if (playerUUID != null) {
            this.socket.emit('connectWithUUID', playerUUID);
        } else {
            playerUUID = uuidv4();
            this.socket.emit('validateNewUUID', playerUUID);
        }

        //DELETE ME- this is just for test purposes. 
        this.StartButton.setText(playerUUID);
        //TODO- disable start button while client attempts to connect to server. re-enable if something went horribly wrong :D
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
