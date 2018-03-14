import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

private maxX: number;
private maxY: number;
private maxZ: number;


private movX: number;
private movY: number;
private movZ: number;

private posX: number;
private posY: number;
private posZ: number;

private posObj: object;

  constructor(public navCtrl: NavController, private motion: DeviceMotion, platform: Platform) {


  	platform.ready().then( () => {

  		this.maxX = platform.width();
  		this.maxY = platform.height();

  		var subs = motion.watchAcceleration( { frequency: 200 } ).subscribe( res => {

  			this.movX = -1*res.x;
  			this.movY = res.y;
  			this.movZ = res.z;

  			function calc( max, mov ){
  				return ( ( ( ((max*50)/100) / max  )*100 )+ ( mov*4 ) );
  			}

  			this.posX = calc(this.maxX, this.movX);
  			this.posY = calc(this.maxY, this.movY);

  			this.posObj = { 'left.%': this.posX, 'top.%': this.posY };

  		}); // subs

  	}); //platform

  }





}
