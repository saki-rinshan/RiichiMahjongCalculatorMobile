import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Tile } from '../../models/tile';
import { TilesComponent } from '../../tiles/dumb_components/tiles.component';

import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { LanguageService } from '../../language/language-service';

@Component({
  selector: 'doraModal',
  templateUrl: './doraModal.component.html',
  styleUrls: ['./doraModal.component.css']
})

export class DoraModalComponent {
	
	constructor(public params: ModalDialogParams, public languageService: LanguageService) {
		
	}
	
	
	close(tile: Tile):void {
		this.params.closeCallback(tile);
	}
	
	
}