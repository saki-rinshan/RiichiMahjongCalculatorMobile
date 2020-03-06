import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainTilesService } from './main-tiles.service'
import { Tile, TileList} from '../models/tile';
import { Set, SetType } from '../models/set';
import { TilesComponent } from './dumb_components/tiles.component';
import { TilesButtonComponent } from './tiles-buttons.component';
import { Button, SetButtonType } from '../button/button';

import { OnInit  } from '@angular/core';
import { ScrollViewControllerService } from '../../ui-control/scrollViewManager.service';
import { SetButtonList } from '../button/buttonList';

@Component({
  selector: 'main-tiles-selection', 
  template: ` <StackLayout height="100%" width="100%" 
				[ngClass]="{'fourTiles': this.mainTilesService.totalTiles==14}">
				<tiles-buttons></tiles-buttons> 
				<tiles (clicked)="add($event)" ></tiles> 
			  </StackLayout>`,
  styleUrls: ['./dumb_components/tiles.component.css', './tiles-buttons.component.css',]
})
 
export class MainTilesSelectionComponent {
	
	public setButtons: Button[];
	setButtonList: SetButtonList;
	public tileList: TileList;
	public shouldDisableParent: boolean = false;
	
	constructor(public mainTilesService: MainTilesService, public scrollViewControllerService: ScrollViewControllerService) {
			this.setButtons = this.mainTilesService.setButtonList.buttons;
			this.setButtonList = this.mainTilesService.setButtonList;
			this.tileList = this.mainTilesService.tileList;
	} 

	ngOnInit() {
	}
	
	add(tile: Tile): void {
		var toggledButton = this.setButtons.find(button => button.isToggled);
		if(toggledButton != undefined) {
			this.mainTilesService.addSet(tile, toggledButton);
		} else {
			this.mainTilesService.add(tile);
		}
		this.scrollViewControllerService.notify();
	}
}
