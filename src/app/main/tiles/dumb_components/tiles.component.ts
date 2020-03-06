import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FormsModule } from '@angular/forms';
import { Tile, TileList} from '../../models/tile';
import { MainTilesService } from '../main-tiles.service'
import { Button, SetButtonType } from '../../button/button';
import { Set, SetType } from '../../models/set';

import { UISizeControllerService } from '../../../ui-control/uiSizeController.service';
import { InteractabilityManager } from '../../../ui-control/interactabilityManager.service'
import { CameraService } from '../../../image/camera.service'

@Component({
  selector: 'tiles', 
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css', '../tiles-buttons.component.css',]
})

export class TilesComponent {
	
	public imgFolder = "~/assets/img/tiles/Export/Regular/";
	
	public setButtons: Button[];
	public tileList: TileList;
	@Output() clicked: EventEmitter<Tile> = new EventEmitter<Tile>();
	@Input() shouldDisableFromParent;
	 heightX = 50;
	@Input() isDoraSelection: boolean = false;
	
	tileHeight: number;
	tileWidth: number;
	
	constructor(public mainTilesService: MainTilesService, public uiSizeControllerService: UISizeControllerService, public interactabilityManager: InteractabilityManager, public cameraService: CameraService) {
			this.setButtons = this.mainTilesService.setButtonList.buttons;
			this.tileList = this.mainTilesService.tileList;
			this.tileHeight = this.uiSizeControllerService.mainTilesSectionTilesTileHeight / 1.23;
			this.tileWidth = this.uiSizeControllerService.mainTilesSectionTilesTileWidth;
	}
	
	 
	
	shouldDisableTile(tile: Tile): boolean {
		if(this.cameraService.awaitServer) {
			return true;
		}
		
		if(tile.instances == 4) {
			return true;
		}
		
		if(this.isDoraSelection) {
			return false;
		}
		if(tile.instances >= 1 && (this.setButtons[SetButtonType.OpenKan].isToggled 
		|| this.setButtons[SetButtonType.ClosedKan].isToggled)) {
			return true;
		}
		if(tile.isAka) {
			if(tile.instances >= 2) {
				return true;
			}
			
			if(this.setButtons[SetButtonType.OpenKan].isToggled 
			|| this.setButtons[SetButtonType.ClosedKan].isToggled 
			|| this.setButtons[SetButtonType.Pon].isToggled
			|| this.setButtons[SetButtonType.Chi].isToggled) {
				return true;
			}
		}
		
		if(tile.instances >= 2 && (this.setButtons[SetButtonType.Pon].isToggled)) {
			return true;
		}
		if(this.setButtons[SetButtonType.Chi].isToggled) {
			//can't chi if it is honor tile or greater than 7
			var value = tile.value;
			if(value > 7 || tile.isHonor()) {
				return true;
			}
			if(tile.isAka) {
				return true;
			}
			
			var tile1 = this.tileList.findTile(tile.getNextTile(1).name.valueOf());
			var tile2 = this.tileList.findTile(tile.getNextTile(2).name.valueOf());
			
			var tilesAround = [tile1, tile2];
			for(let tileAround of tilesAround) {
				if(tileAround == undefined) {
					continue;
				}
				if(!tileAround.isHonor() && tileAround.instances == 4 ) {
					return true;
				}
			}
		}
		return false;
	}
	
	tileClicked(tile: Tile): void {
		this.clicked.emit(tile);
	}
	
}
