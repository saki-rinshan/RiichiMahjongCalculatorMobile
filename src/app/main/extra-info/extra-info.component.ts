import { Component } from '@angular/core';
import { Button } from '../button/button'
import { ButtonList } from '../button/buttonList'
import { Tile, TileValue } from '../models/tile'
import { TilesComponent } from '../tiles/dumb_components/tiles.component'
import { ResultDisplayService } from '../calculator/result-display.service'
import { ExtraInfoService } from './extra-info.service'
import { LanguageService } from '../language/language-service'

import { UISizeControllerService } from '../../ui-control/uiSizeController.service'
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { DoraModalComponent } from './doraModal/doraModal.component';
import { ViewContainerRef } from "@angular/core";
import { ToolTipAlertService } from '../../ui-control/toolTipAlert.service';


import { InteractabilityManager } from '../../ui-control/interactabilityManager.service'

@Component({
  selector: 'extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.css', ]
})     

export class ExtraInfoComponent {
	public imgFolder = "~/assets/img/tiles/Export/Regular/";
	doraTiles: Tile[] = [];
	buttons: Button[];
	
	TileValue = TileValue;
	
	tileHeight: number;
	tileWidth: number;
	tileResize: number = 0.75;
	
	windHeight: number;
	windWidth: number;
	windResize: number = 0.85;
	
	buttonRows: Button[][];
	
	constructor(public extraInfoService: ExtraInfoService, public resultDisplayService: ResultDisplayService, public languageService: LanguageService, public uiSizeControllerService: UISizeControllerService, public modal: ModalDialogService, public vcRef: ViewContainerRef, public toolTipAlertService: ToolTipAlertService, public interactabilityManager: InteractabilityManager) {
		this.buttons = extraInfoService.get_buttons().filter(button => button.shouldDisplay == true);
		this.doraTiles = this.extraInfoService.doraTiles;
		this.tileHeight = this.uiSizeControllerService.mainTilesSectionTilesTileHeight * this.tileResize;
		this.tileWidth = this.uiSizeControllerService.mainTilesSectionTilesTileWidth * this.tileResize;
		
		this.windHeight = this.tileHeight * this.windResize;
		this.windWidth = this.uiSizeControllerService.mainTilesSectionTilesTileWidth * 0.75;
		
		this.buttonRows = [];
		for(var i =0; i < 3; i++) {
			this.buttonRows.push(new Array<Button>());
		}
		
		this.buttonRows[0].push(this.buttons[0]);
		this.buttonRows[0].push(this.buttons[1]);
		this.buttonRows[0].push(this.buttons[2]);
		
		this.buttonRows[1].push(this.buttons[3]);
		this.buttonRows[1].push(this.buttons[4]);
		
		
		this.buttonRows[2].push(this.buttons[5]);
		this.buttonRows[2].push(this.buttons[6]);
		this.buttonRows[2].push(this.buttons[7]);
	}
	
	onClickMe(button: Button): void {
		button.toggle();
		this.resultDisplayService.onChange();
	}
	
	addDora(tile: Tile): void {
		if(this.doraTiles.length >= 4) {
			return;
		}
		this.extraInfoService.addDora(tile);
		this.resultDisplayService.onChange();
		//this.modalService.close('dora-selector'); 
	}
	
	removeDora(tileIndex: number): void {
		this.extraInfoService.removeDora(tileIndex);
		this.resultDisplayService.onChange();
	}
	
	toggleWind(isSeat: boolean, wind: number):void {
		this.extraInfoService.toggleWind(isSeat, wind);
		this.resultDisplayService.onChange();
	}
	
	getDoraFile(intX: number): String {
		if(intX == -1) {
			return this.imgFolder+"front"+".png";
		} else {
			return this.imgFolder+this.doraTiles[intX].name+".png";
		}
	}
	
	incrementRenchan():void {
		this.extraInfoService.incrementRenchan();
		this.resultDisplayService.onChange();
	}
	
	decrementRenchan():void  {
		this.extraInfoService.decrementRenchan();
		this.resultDisplayService.onChange();
	}
	
	showModal(): void {
		let options = {
			context: {},
			fullscreen: false,
			//animated: true,
			viewContainerRef: this.vcRef
		}
		this.modal.showModal(DoraModalComponent, options).then(tile => {
			if(tile) {
				this.addDora(tile);
			}
		});
	}
}