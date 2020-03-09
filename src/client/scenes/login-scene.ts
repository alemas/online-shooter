import Phaser from "phaser";
import { ShooterGame } from "../shooter-game";
import { ClientSocketManager } from "../../socket/client-socket-manager";
import { User } from "../user";

export class LoginScene extends Phaser.Scene {

    constructor() {
        let config = {
            key: "LoginScene",
            active: true,
        };
        super(config);
    }

    public preload() {
        this.load.html("loginWindow", "../assets/html/login-window.html");
    }

    public create() {
        const maxWidth = (this.game as ShooterGame).canvasSize.width;
        // const maxHeight = (this.game as ShooterGame).canvasSize.height;

        // let width = 300;
        // let height = 130;
        // let x = (maxWidth/2) - (width/2);
        // let y = (maxHeight/2)  - (width/2);
        // this.add.rectangle(x, y, width, height, 0x96d9ff);

        let welcomeText = this.add.text(0, 20, "WELCOME TO HERE", { color: "black", fontSize: "40px" });
        welcomeText.setX(maxWidth / 2 - welcomeText.width / 2);

        let element = this.add.dom(maxWidth / 2, 400).createFromCache("loginWindow");
        element.addListener("click");
        let dom = element.node;
        element.on("click", (event: any) => {
            if (event.target.name == "playButton") {
                let inputText = element.getChildByName("usernameField") as HTMLInputElement;
                if (inputText.value !== '') {
                    ClientSocketManager.sendValidateUsername(inputText.value as string).then(data => {
                        if (data.valid) {
                            element.removeListener("click")
                            element.setVisible(false);
                            User.username = (inputText.value as string);
                            ClientSocketManager.sendNewUser();
                            this.scene.start("GameScene");
                        } else {
                            console.log(data.error);
                        }
                    });
                }
            }
        });
    }

}