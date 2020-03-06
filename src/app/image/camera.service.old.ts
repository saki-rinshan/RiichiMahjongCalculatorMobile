import * as camera from "nativescript-camera";
import * as dialog from  'tns-core-modules/ui/dialogs';
import { Image } from "tns-core-modules/ui/image";
import { SocketIO } from 'nativescript-socketio';
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import { Tile, TileList} from '../main/models/tile';
import { Set } from '../main/models/set';
import { MainTilesService } from '../main/tiles/main-tiles.service';
import { Injectable } from '@angular/core';
import { ResultDisplayService } from '../main/calculator/result-display.service'
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { CalculatorComponent } from '../main/calculator/calculator.component';
import { ViewContainerRef, NgZone } from "@angular/core";

import * as appSettings from "tns-core-modules/application-settings";
declare let android: any;
declare let java: any;


import { displayedEvent, exitEvent, launchEvent, lowMemoryEvent, 
        orientationChangedEvent, resumeEvent, suspendEvent, uncaughtErrorEvent, 
        ApplicationEventData, LaunchEventData, OrientationChangedEventData, UnhandledErrorEventData,
        on as applicationOn, run as applicationRun } from "tns-core-modules/application";


@Injectable()
export class CameraService {
	public url: string = "https://rinshan.org:4001/";
	public socket: SocketIO;  
	public mainTilesService: MainTilesService;
	
	public awaitServer: boolean = false;
	
	constructor(public modal: ModalDialogService, mainTilesService: MainTilesService, public resultDisplayService: ResultDisplayService, public zone: NgZone) {
		this.mainTilesService = mainTilesService;
		
		
		camera.requestPermissions().then(
			function success() {
			}, 
			function failure() {
			}
		);
		
		this.socket = new SocketIO(this.url);
		this.socket.connect();
		
		this.socket.on("message", (data) => {
			
			this.awaitServer = false;
			
			this.preProcessClosedKan(data);
			this.preProcessOpenKan(data);
			
			for(let tileString of data) {
				var tile = this.mainTilesService.tileList.findTile(tileString);
				if(tile) {
					this.mainTilesService.add(tile);
				}
			}
			
			this.resultDisplayService.updateResults(this.mainTilesService.user_tiles, this.mainTilesService.user_sets);
			//spagehttiMeUp
			this.zone.run(() => {
				this.mainTilesService.mainComponent.showModal();
			});
			return;
		});
		
		applicationOn(exitEvent, (args: LaunchEventData) => {
			this.socket.disconnect();
		});

	}
	
	public showModal() {
		let options = {
			context: { hi: "xx" },
			fullscreen: true,
			animated: true,
			stretched: true,
			viewContainerRef: this.mainTilesService.mainComponent.vcRef
		}
		this.modal.showModal(CalculatorComponent, options).then(response => {
		});
	}
	
  
  
	preProcessOpenKan(tileStrings: string[]): void {
		var acc = tileStrings.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
		let vals = Array.from(acc.values());
		var maxVal: number = Math.max(...vals);
		var kanTile: string;
		for(let key of Array.from(acc.keys())) {
			if(acc.get(key) == maxVal) {
				kanTile = key;
			}
		}
		if(maxVal >= 4 && !(kanTile === 'xxxclosed')) {
			this.removeFromArray(kanTile, tileStrings, 4);
			this.mainTilesService.addSet(this.mainTilesService.tileList.findTile(kanTile), this.mainTilesService.setButtonList.getButton("Open Kan"));
		}
		
	}
	
	
	preProcessClosedKan(tileStrings: string[]): void {
		var numKans:number = Math.floor(this.removeFromArray('xxxclosed', tileStrings)/2);
		for(var j = 0; j < numKans; j++) {
			var acc = tileStrings.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
			let vals = Array.from(acc.values());
			var maxVal: number = Math.max(...vals);
			var kanTile: string;
			for(let key of Array.from(acc.keys())) {
				if(acc.get(key) == maxVal) {
					kanTile = key;
				}
			}
			this.removeFromArray(kanTile, tileStrings, 2);
			this.mainTilesService.addSet(this.mainTilesService.tileList.findTile(kanTile), this.mainTilesService.setButtonList.getButton("Closed Kan"));
		}
	}
	
	
	
	removeFromArray(val: any, arr: any[], limit?: number): number {
		var instances = 0;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] === val) {
				arr.splice(i, 1);
				instances++;
				i--;
			}
			if(limit) {
				if(instances >= limit) {
					return instances;
				}
			}
		}
		return instances
	}
	
	
	takePicture(): void { 
		//157440
		var width = 400;
		var height = 400;
		var options = { width: width, height: height,
				keepAspectRatio: true, saveToGallery: appSettings.getBoolean("saveToGallery"),
		allowsEditing: true };
		
		camera.takePicture(options). 
			then((imageAsset) => {
				
				const imageSourceModule = new ImageSource();
				console.log(this.getFileSize(imageAsset.android));
				imageSourceModule.fromAsset(imageAsset).then(imageSource => {
					var ratio = 400 / imageSource.width;
					var newheight = imageSource.height * ratio;
					var newwidth = imageSource.width * ratio;
					console.log(
						"Resizing original image dimentions from : " +
						imageSource.height +
						" x " +
						imageSource.width +
						" to " +
						newheight +
						" x " +
						newwidth
					);
					
                    var downsampleOptions = new android.graphics.BitmapFactory.Options();
                    /*downsampleOptions.inSampleSize = this.getSampleSize(
                      imageAsset.android, 
                      { maxWidth: newwidth, maxHeight: newheight }
                    );
					*/
					downsampleOptions.inSampleSize = 2;
                    var bitmap = android.graphics.BitmapFactory.decodeFile(
                      imageAsset.android,
                      downsampleOptions
                    );
					
                    imageSource.setNativeSource(bitmap);
					console.log(
                        "Resized image imensions: " +
                          imageSource.height +
                          " x " +
                          imageSource.width
                      );
					
					console.log(this.getFileSize(imageSource.android));  
					//this.socket.emit("Img", { Name: i, Data: base64});
					this.awaitServer = true;
					setTimeout(() => {
						if(this.awaitServer) {
								this.displayServerNotice();
								this.awaitServer = false;
							}
						}, 45000);
						this.displayNotice();
					}).catch((err) => {
						dialog.alert(err.message);
				});
			}).catch((err) => {
				dialog.alert(err.message);
		});
	}
	
	getFileSize(path): number { 
		var file = new java.io.File(path);
        var length = file.length();
		return length / 1024;
	}
	getSampleSize(uri, options) {
      var scale = 1;
      if (true) {
        var boundsOptions = new android.graphics.BitmapFactory.Options();
        boundsOptions.inJustDecodeBounds = true;
        android.graphics.BitmapFactory.decodeFile(uri, boundsOptions);
        // Find the correct scale value. It should be the power of 2.
        var outWidth = boundsOptions.outWidth;
        var outHeight = boundsOptions.outHeight;
        if (options) {
          var targetSize =
            options.maxWidth < options.maxHeight
              ? options.maxWidth
              : options.maxHeight;
          while (
            !(
              this.matchesSize(targetSize, outWidth) ||
              this.matchesSize(targetSize, outHeight)
            )
          ) {
            outWidth /= 2;
            outHeight /= 2;
            scale *= 2;
          }
        }
      }
      return scale;
    }
	
	matchesSize(targetSize, actualSize) {
      return targetSize && actualSize / 2 < targetSize;
    }
	/*
	findActualSize(bitmap: android.graphics.bitmap): number {
		return 0;
	}
	*/
	calculateDimensions(maxSize: number): number[] {
		var dimensions: number[];
		//
		return dimensions;
	}
	
    displayNotice(): void {
		if(appSettings.getBoolean("firstCamera")) {
				appSettings.setBoolean("firstCamera", false);
				var language: number = this.mainTilesService.languageService.currentLanguage;
				var title: string =  "Disclaimer";
				var message: string = "The tile recognition service is still in the experimental phase. Please do not expect pinpoint accuracy. The first few pictures may be a bit slow because the app is resizing the image to the most efficient size."
				if(language == 1) {
					title = "お知らせ";
					message = "牌の認識サービスはまだ試験的です。　確度をあまり期待しないでください。　最初の写真は時間がかかるかもしれません。　アプリは写真の最も効率的なサイズをリサイしている。";
				}
				const options: dialog.AlertOptions =  {
				title: title,
				message: message,
				okButtonText: "Ok", 
			}
			dialog.alert(options);
		}
	}
	
	displayServerNotice(): void {
		var language: number = this.mainTilesService.languageService.currentLanguage;
		var title: string =  "Server error";
		var message: string = "The server took too long to respond. This is either because no tiles were recognized or the latency is too high."
		if(language == 1) {
			title = "サーバーエラー";
			message = "サーバの反応が遅すぎて。　写真の牌は認識されていないかもしれません。";
		}
		const options: dialog.AlertOptions =  {
			title: title,
			message: message,
			okButtonText: "Ok", 
		}
		dialog.alert(options);
	}
}
