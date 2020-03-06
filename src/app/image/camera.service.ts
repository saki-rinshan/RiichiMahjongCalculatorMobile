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
		var width = 1000;
		var height = 1000;
		var options = { width: width, height: height,
				keepAspectRatio: true, saveToGallery: this.mainTilesService.settingsManager.getBoolean("saveToGallery"),
		allowsEditing: true };
		var length = 0;
		
		camera.takePicture(options). 
			then((imageAsset) => {
				const imageSource = new ImageSource();
				imageSource.fromAsset(imageAsset).then(res => { 
					var emitted: boolean = false;
					var entered: boolean = false;
					
					var defaultQuality: number = this.mainTilesService.settingsManager.getNumber("defaultQuality");
					for(var i = 100; i >= 30; i-= 10) {
						//console.log("converting ::" + i);
						var base64 = res.toBase64String("jpeg", i);
						//console.log(imageSource.width + " :: " + imageSource.height + ":: " + base64.length);
						if(base64) {
							if(base64.length >= 100000000) {
								entered = true;
								continue;
							}
							
							this.socket.emit("Img", { Name: i, Data: base64});
							this.awaitServer = true;
							setTimeout(() => {
							if(this.awaitServer) {
									this.displayServerNotice();
									this.awaitServer = false;
								}
							}, 45000);
							if(!entered) {
								i+=5; 
							}
							length = base64.length;
							emitted = true;
							this.mainTilesService.settingsManager.setNumber("defaultQuality", i);
							this.displayNotice();
							break;
							}
						}
				}).catch((err) => {
					dialog.alert(err.message);
				});
			}).catch((err) => {
				dialog.alert(err.message);
		});
	}
	
	
    displayNotice(): void {
		if(this.mainTilesService.settingsManager.getBoolean("firstCamera")) {
				this.mainTilesService.settingsManager.setBoolean("firstCamera", false);
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
