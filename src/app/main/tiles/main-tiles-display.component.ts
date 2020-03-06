import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Tile, TileList } from '../models/tile';
import { MainTilesService } from './main-tiles.service'
import { Set, SetType } from '../models/set';
import { NaiveRecognizerService } from '../calculator/recognizer/naiveRecognizer.service';
import { LanguageService } from '../language/language-service';


import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, PropertyChangeData } from 'tns-core-modules/data/observable';
import { ScrollViewControllerService } from '../../ui-control/scrollViewManager.service';
 
import { CameraService } from '../../image/camera.service';

@Component({
  selector: 'main-tiles-display', 
  template: `
	<ScrollView width="100%" height="100%"#tileSectionScroll>
		<Button text="{{this.languageService.strings.cameraText}}" (tap)="this.cameraService.takePicture()" 
		width="50%" height="50%"
		horizontalAlignment="center" class="camera" *ngIf="this.mainTilesService.totalTiles == 0"
		textTransform="none"> </Button>
		<tiles-section
			*ngIf="this.mainTilesService.totalTiles != 0"
			[sets]="this.mainTilesService.user_sets"  
			[tiles]="this.mainTilesService.user_tiles"
			(clickedTile)="remove($event)" 
			(clickedSet)="removeSet($event)"></tiles-section> 
	</ScrollView>`,
  styleUrls: ['./dumb_components/tiles-section.component.css']
})
//<button (click)="forcePredict()">ForcePredict </button>
export class MainTilesDisplayComponent {
	
	//reference for html code
	setType = SetType;
	imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	user_tiles: Tile[];
	user_sets: Set[];
	
	@ViewChild("tileSectionScroll", { static: true }) scrollerRef: ElementRef;
	public scroller: ScrollView;
	
	constructor(public mainTilesService: MainTilesService, public naiveRecognizerService: NaiveRecognizerService, public languageService: LanguageService, public scrollViewControllerService: ScrollViewControllerService, public cameraService: CameraService) {
		this.user_tiles = mainTilesService.user_tiles;
		this.user_sets = mainTilesService.user_sets;
	}
	
	
	ngAfterViewInit() {
		this.scroller = <ScrollView> this.scrollerRef.nativeElement;
		this.scrollViewControllerService.setScroller(this.scroller);
	}
	
	remove(tile: Tile): void {
		this.mainTilesService.remove(tile);
	}
	 
	removeSet(set: Set): void {
		this.mainTilesService.removeSet(set);
	}
	
	trashTiles() {
		this.mainTilesService.clearAll();
	}
	
}