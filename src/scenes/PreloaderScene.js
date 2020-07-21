import 'phaser';
import RedButton1 from '../assets/ui/buttonStock1.png';
import RedButton2 from '../assets/ui/buttonStock1h.png';
import BoxSelect from '../assets/ui/boxNormal.png';
import BoxNormal from '../assets/ui/boxSelect.png'
import MusicTheme from '../assets/TownTheme.mp3';
import Grass from '../assets/map/map.jpg';
import Tree from '../assets/map/tree.png';
import LRRH from '../assets/lrrd.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  preload () {
    // add logo image
    this.logo = this.add.image(400, 200, 'logo').setOrigin(0.5, 1);
    this.logo.scale = 0.7;
  
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
  
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
  
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
  
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
  
    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
  
    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  
    // load assets needed in our game
    this.load.image('redButton1', RedButton1);
    this.load.image('redButton2', RedButton2);

    this.load.image('box', BoxNormal);
    this.load.image('checkedBox', BoxSelect);
    this.load.audio('bgMusic', [MusicTheme]);


    // map
    this.load.image('grass', Grass);
    this.load.image('tree', Tree);

    // player
    // this.load.spritesheet('player', LRRH);

  }

  create () {
  }

  init () {
    this.readyCount = 0;
  }
  
  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};