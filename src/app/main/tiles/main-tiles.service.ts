import { Component, Input, Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tile, TileValue, TileSuit, TileList } from '../models/tile';
import { Hand } from '../models/hand';
import { Set, SetType } from '../models/set';
import { Button } from '../button/button';
import { SetButtonList } from '../button/buttonList';

import { ExtraInfoService } from '../extra-info/extra-info.service'
import { ResultDisplayService } from '../calculator/result-display.service'
import { CalculatorService } from '../calculator/calculator.service';
import { LanguageService } from '../language/language-service'

import { SettingsManager } from '../language/settingsManager';
//oh my fucking god
import { MainComponent } from '../main.component';

@Injectable()
export class MainTilesService {
	
	public user_tiles: Tile[];
	public user_sets: Set[];
	public setButtonList: SetButtonList;
	
	public totalTiles = 0;
	public tileList: TileList;
	agari: Tile;
	agariIndex: number = -1;

	
	akaToggled: boolean;
	openToggled: boolean;
	
	mainComponent: MainComponent;
	
	
	constructor(public settingsManager: SettingsManager, public calculatorService: CalculatorService, public extraInfoService: ExtraInfoService, public resultDisplayService: ResultDisplayService, public languageService: LanguageService) {
		this.user_tiles = [];
		this.user_sets = [];
		this.setButtonList = languageService.setButtonList;
		this.tileList = extraInfoService.tileList;
		this.openToggled = true; 
	} 
	
	spagehttiMe(mainComponent: MainComponent) {
		this.mainComponent = mainComponent;
	}
	
	
	add(tile: Tile, fromSet?: boolean): boolean {
		this.agari = tile;
		if (this.totalTiles < 14) {
			//Get position to insert
			var pos = -1;
			
			while (++pos < this.user_tiles.length) {
				if (tile.compare(this.user_tiles[pos]) < 0) {
					break;
				}
			}
			if(pos != -1) {
				this.agariIndex = pos;
			} else {
				this.agariIndex++;
			}
			//Add the tile
			//this.user_tiles.push(tile);
			if(tile.instances == 4) {
				return false;
			}
			if(tile.isAka) {
				if(tile.instances >= 2) {
					return false;
				}
			}
			
			this.user_tiles.splice(pos, 0, tile);
			if(!fromSet) {
				this.totalTiles++;
				tile.instances++;
				if(tile.instances > 4) {
					tile.instances--;
					return false;
				}
			} 
			
			//call calculatorComponent
			if(this.totalTiles == 14) {
				this.resultDisplayService.updateResults(this.user_tiles, this.user_sets, this.agari);

			}
		}				
		return true;
	}
	
	addSet(tile: Tile, toggledSetButton: Button): void {
		
		var tiles = new Array<Tile>();
		//cant add if 4 sets already
		if(this.user_sets.length == 4) {
			return;
		}
		
		//can't chi if it is honor tile or greater than 7
		//returns NaN/undefined for honor/winds
		var value = Number(tile.name.charAt(3));
		if(toggledSetButton.defaultName === "Chi" && (value > 7 || tile.isHonor())) {
			return;
		} 

		//Get position to insert
		var pos = -1;
		while (++pos < this.user_sets.length) {
			if (tile.compare(this.user_sets[pos].tile) < 0) {
				break;
			}
		}
		
		//increment instances
		var name = toggledSetButton.defaultName;
		var is_open = this.openToggled;
		if(name != undefined) {
			switch(name) {
				case "Chi": {
					this.totalTiles+=3;
					var tile1 = this.tileList.findTile(tile.getNextTile(1).name.valueOf());
					var tile2 = this.tileList.findTile(tile.getNextTile(2).name.valueOf());
					tile.instances++;
					tile1.instances++;
					tile2.instances++;
					tiles.push(tile);
					tiles.push(tile1);
					tiles.push(tile2);
					is_open = this.openToggled;
					break;
				}
				case "Pon": {
					this.totalTiles+=3;
					tile.instances+=3;
					for(var i = 0; i < 3; i++) {
						tiles.push(tile);
					}
					is_open = this.openToggled;
					break;
				}
				case "Open Kan": {
					this.totalTiles+=3;
					tile.instances+=4;
					
					for(var i = 0; i < 4; i++) {
						tiles.push(tile);
					}
					
					is_open = true;
					break;
				}
				case "Closed Kan": {
					this.totalTiles+=3;
					tile.instances+=4;
					is_open = false;
					for(var i = 0; i < 4; i++) {
						tiles.push(tile);
					}
					break;
				}
			}
		}
		/*
		if(!this.openToggled) {
			for(let tile of tiles) {
				this.add(tile, true); 
			}
			return;
		}
		*/
		//Add the set to the list
		var createdSet = new Set(tile, -1, is_open, toggledSetButton.defaultName, -1, tiles);
		this.user_sets.splice(pos, 0, createdSet);
		if(this.totalTiles == 14) {
			this.resultDisplayService.updateResults(this.user_tiles, this.user_sets, this.agari);
		}
	}
	
	removeSet(set: Set): void {
		var index = this.user_sets.indexOf(set, 0);
		if (index > -1) {
			this.user_sets.splice(index, 1);
		}
		
		//decrement instances
		this.totalTiles-=3;
		for(let tile of set.tiles) {
			tile.instances--;
		}
		
		//remove the calculator results
		//this.calculatorService.clearHands();
		this.resultDisplayService.clear();
	}
	
	remove(tile: Tile): void {
		this.totalTiles--;
		var index = this.user_tiles.indexOf(tile, 0);
		if (index > -1) {
			this.user_tiles.splice(index, 1);
			tile.instances--;
			if(index < this.agariIndex) {
				this.agariIndex--;
			} else if(index == this.agariIndex) {
				this.agariIndex = -1;
			}
		}
		
		//remove the calculator results
		//this.calculatorService.clearHands();
		this.resultDisplayService.clear();
	}
	
	clearAll(): void {
		var tiles = this.user_tiles.slice(0);
		for(let tile of tiles) {
			this.remove(tile);
		}
		var sets = this.user_sets.slice(0);
		for(let set of sets) {
			this.removeSet(set);
		}
		this.totalTiles = 0;
		this.agariIndex = -1;
	}
	
	isHandFull(): boolean {
		var count:number = 0;
		count+= this.user_tiles.length;
		count+= 3*this.user_sets.length;
		return count == 14;
	}
	
	findTileIndex(tileArr: Tile[], tile: Tile): number {
		for(var i = 0; i < tileArr.length; i++) {
			if(tile.equals(tileArr[i])) {
				return i;
			}
		}
		return -1;
	}
}
