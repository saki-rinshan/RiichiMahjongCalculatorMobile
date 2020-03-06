import * as appSettings from "tns-core-modules/application-settings";

export class SettingsManager {
	
	constructor() {
		if(!appSettings.hasKey("language")) {
			this.setNumber("language",0);
		}
		
		//first time
		if(!appSettings.hasKey("firstCamera")) {
			this.setBoolean("firstCamera", true);
		}
		if(!appSettings.hasKey("firstCalc")) {
			this.setBoolean("firstCalc", true);
		}
		if(!appSettings.hasKey("firstExtra")) {
			this.setBoolean("firstExtra", true);
		}
		
		//delete
		if(!appSettings.hasKey("defaultCameraWidth")) {
			this.setNumber("defaultCameraWidth", 412);
		}
		if(!appSettings.hasKey("defaultCameraHeight")) {
			this.setNumber("defaultCameraHeight", 412);
		}
		if(!appSettings.hasKey("defaultQuality")) {
			this.setNumber("defaultQuality", 80);
		}
		
		//camera Options
		//60kb-6mb
		if(!appSettings.hasKey("maxSize")) {
			this.setNumber("maxSize", 3000000);
		}
		if(!appSettings.hasKey("saveToGallery")) {
			this.setBoolean("saveToGallery", false);
		}
	}
	
	setNumber(name: string, num: number): void {
		appSettings.setNumber(name, num);
	}
	
	getNumber(name: string): number {
		return appSettings.getNumber(name);
	}
	
	
	setBoolean(name: string, bool: boolean): void {
		appSettings.setBoolean(name, bool);
	}
	
	getBoolean(name: string): boolean {
		return appSettings.getBoolean(name);
	}
	
	
	
}