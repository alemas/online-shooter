import io from "socket.io-client";
import Phaser from "phaser";

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    backgroundColor: 0xf0f0f0,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    } 
  };
     
  let game = new Phaser.Game(config);
  let socket: SocketIOClient.Socket;
    
  function preload() {
  }
    
  function create() {
    console.log("create");
    socket = io();
  }
    
  function update() {
  }
  