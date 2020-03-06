import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Tile, TileList } from '../../models/tile';
import { Set, SetType } from '../../models/set';
import { MainTilesService } from '../main-tiles.service';

import { UISizeControllerService } from '../../../ui-control/uiSizeController.service'

@Component({
  selector: 'tiles-section', 
  templateUrl: './tiles-section.component.html',
  styleUrls: ['./tiles-section.component.css']
})

export class TilesSectionComponent {
	
	//reference for html code
	setType = SetType;
	imgFolder = "~/assets/img/tiles/Export/Regular/";
	@Input()tiles: Tile[];
	@Input()sets: Set[];
	@Output() clickedTile: EventEmitter<Tile> = new EventEmitter<Tile>();
	@Output() clickedSet: EventEmitter<Set> = new EventEmitter<Set>();
	
	
	
	constructor(public mainTilesService: MainTilesService, public uiSizeController: UISizeControllerService) {
		
	}
	
	
	tileClicked(tile: Tile): void {
		this.clickedTile.emit(tile);
	}
	
	setClicked(set: Set): void {
		this.clickedSet.emit(set);
	}
	
	shouldCenterTopRowTwo(num: number): boolean {
		//chitoitsu
		if(num >= 2 && num <= 4) {
			return false;
		}
		if( this.sets.length > 2 || (this.sets.length == 2  && this.tiles.length > 2)) {
			return true;
		}
		return false;
	}
	
	//chitoitsu
	shouldCenterMidRowThree(num: number): boolean {
		if(num < 2 && num > 4) {
			return false;
		}
		if( this.sets.length > 5) {
			return true;
		}
	}
	shouldCenterTopRowOne(): boolean {
		if(this.sets.length == 1  && this.tiles.length > 5) {
			return true;
		}
		return false;
	}
}