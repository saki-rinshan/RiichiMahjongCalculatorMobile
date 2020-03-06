import { Injectable } from '@angular/core';
import { Tile } from '../models/tile';
import { Set } from '../models/set';
import { RecognizerService } from './recognizer/recognizer.service'
import { NaiveRecognizerService } from './recognizer/naiveRecognizer.service'



import { Hand } from '../models/hand';

@Injectable()
export class ResultDisplayService {
	
	previousTiles: Tile[] = [];
	previousSets: Set[];
	previousAgari: Tile;
	possibleHands: Hand[] = [];
	
	constructor(public recognizerService: RecognizerService, public naiveRecognizerService: NaiveRecognizerService, ) {
		
	}
	
	clearAll(): void {
		this.possibleHands = [];
		this.previousTiles = [];
		this.previousSets = [];
		this.previousAgari = undefined;
		this.recognizerService.resetAll();
		this.naiveRecognizerService.resetAll();
	}
	
	updateResults(tiles?: Tile[], sets?: Set[], agari?: Tile): void {
		this.clearAll();
		this.previousTiles = tiles;
		this.previousSets = sets;
		this.previousAgari = agari;
		var recognizedHands: Hand[] = this.recognizerService.recognize(tiles, sets, agari);
		for(let hand of recognizedHands) {
			this.possibleHands.push(hand);
		}
		if(this.possibleHands.length == 0) {
			console.log("entered");
			var predictedHands: Hand[] = this.naiveRecognizerService.recognizeNaive(tiles, sets);
			console.log("exited");
			predictedHands.sort((a,b) => {
				if(a.han < b.han) {
					return -1;
				} 
				if(a.han > b.han) {
					return 1;
				}
				return 0;
			});
			var maxPredicted: number = 3;
			var count: number = 0;
			for(let hand of predictedHands) {
				count++;
				this.possibleHands.push(hand);
				if(count >= 3) {
					break;
				}
			}
		}
	}
	
	onChange(): void {
		if(this.previousTiles.length != 0) {
			this.clear();
			this.updateResults(this.previousTiles, this.previousSets, this.previousAgari);
		}
	}
	
	clear(): void { 
		this.recognizerService.possibleHands = [];
		this.naiveRecognizerService.resetAll();
	}
}