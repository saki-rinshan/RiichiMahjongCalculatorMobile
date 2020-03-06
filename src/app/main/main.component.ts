import { Component, OnInit, ViewChild } from '@angular/core';
import { MainTilesService } from './tiles/main-tiles.service'
import { ExtraInfoService } from './extra-info/extra-info.service'
import { ResultDisplayService } from './calculator/result-display.service';
import { LanguageService } from './language/language-service';
import { TilesButtonComponent } from './tiles/tiles-buttons.component';


import { Tile } from './models/tile';


import { UISizeControllerService } from "../ui-control/uiSizeController.service";
import { Button } from 'tns-core-modules/ui/button'
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { CalculatorComponent } from './calculator/calculator.component';
import { ViewContainerRef } from "@angular/core";
import { InteractabilityManager } from '../ui-control/interactabilityManager.service'
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import * as dialog from  'tns-core-modules/ui/dialogs';

@Component({
    selector: "main",
    moduleId: module.id,
	styleUrls: ['./main.component.css'],
    templateUrl: "./main.component.html",
})

export class MainComponent { 
	
	public sidebarOpened: boolean;
	public state: boolean;
  
    public selectedIndex: number = 0;
	public testModal: string = "../sidebars/calculateReadySideBar.component";
	

	constructor(public extraInfoService: ExtraInfoService, public mainTilesService: MainTilesService, public resultDisplayService: ResultDisplayService, public tilesButtonComponent: TilesButtonComponent, public languageService: LanguageService, public uiSizeControllerService: UISizeControllerService,
	public modal: ModalDialogService, public vcRef: ViewContainerRef, public interactabilityManager: InteractabilityManager, public router: Router) {
		
		this.mainTilesService.spagehttiMe(this);
		
		 router.events.pipe(filter(e => e instanceof NavigationEnd)
			).subscribe(e => {
				this.languageService.strings.changeTitle();
			});
		
	}
	
	
	
	public showModal() {
		let options = {
			context: {},
			fullscreen: true,
			animated: true,
			stretched: true,
			viewContainerRef: this.vcRef
		}
		this.modal.showModal(CalculatorComponent, options).then(response => {
			this.displayNotice();
		});
	}
  
	tabViewIndexChange(index: number): void {
		var oldNumber = this.selectedIndex;
		this.selectedIndex = index;
		if(oldNumber == 0 && index === 1) {
			this.displayNotice2();
		}
	}
	
	deleteTapped(): void {
		if(this.selectedIndex == 0) {
			this.mainTilesService.clearAll();
			this.tilesButtonComponent.disableAllSetButtons();
		} else if(this.selectedIndex == 1) {
			this.extraInfoService.clearAll();
		}
		this.resultDisplayService.clearAll();
	}
	
	ngOnInit() {
	}
  
  
	clear() {
		this.tilesButtonComponent.disableAllSetButtons();
		this.mainTilesService.clearAll();
		this.extraInfoService.clearAll();
		this.resultDisplayService.clearAll();
	}
	
	
	displayNotice(): void {
		if(this.mainTilesService.settingsManager.getBoolean("firstCalc")) {
				this.mainTilesService.settingsManager.setBoolean("firstCalc", false);
				var language: number = this.mainTilesService.languageService.currentLanguage;
				var title: string =  "Did you know?";
				var message: string = "You can long press on the various Yaku, Fu, and Payout texts to learn more."
				if(language == 1) {
					title = "知っていますか？";
					message = "様々な役や符や計算得点をホバーと、そのふりがなと記述は見る事ができる。";
				}
				const options: dialog.AlertOptions =  {
				title: title,
				message: message,
				okButtonText: "Ok", 
			}
			dialog.alert(options);
		}
	}
	
	displayNotice2(): void {
		if(this.mainTilesService.settingsManager.getBoolean("firstExtra")) {
				this.mainTilesService.settingsManager.setBoolean("firstExtra", false);
				var language: number = this.mainTilesService.languageService.currentLanguage;
				var title: string =  "Did you know?";
				var message: string = "You can long press on the various buttons to learn more."
				if(language == 1) {
					title = "知っていますか？";
					message = "様々なボタンをホバーと、そのふりがなと記述は見る事ができる。";
				}
				const options: dialog.AlertOptions =  {
				title: title,
				message: message,
				okButtonText: "Ok", 
			}
			dialog.alert(options);
		}
	}
} 
