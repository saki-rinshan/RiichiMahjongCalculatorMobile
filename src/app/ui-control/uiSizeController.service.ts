import { screen } from 'tns-core-modules/platform';

export class UISizeControllerService {
	
	screenWidth: number;
	screenHeight: number;
	
	mainTilesSectionPercent: number = 0.73;
	mainTilesSectionTilesPercent: number = 0.87;
	mainTilesSectionTilesTilePercent: number = 0.33;
	
	
	mainTilesSectionTilesTileBorder: number = 5;
	
	mainTilesSectionTilesTileHeight: number;
	mainTilesSectionTilesTileWidth: number;
	
	tilesSectionTileWidthPercent: number = 0.1111111111;
	tilesSectionTileWidth: number;
	
	constructor() {
		this.screenHeight = screen.mainScreen.heightDIPs;
		this.screenWidth = screen.mainScreen.widthDIPs;
		
		
		this.mainTilesSectionTilesTileHeight = (this.screenHeight * this.mainTilesSectionPercent * this.mainTilesSectionTilesPercent * this.mainTilesSectionTilesTilePercent) - this.mainTilesSectionTilesTileBorder;
		
		this.mainTilesSectionTilesTileWidth = this.mainTilesSectionTilesTileHeight / 1.61;
		
		this.tilesSectionTileWidth = Math.ceil(this.screenWidth * this.tilesSectionTileWidthPercent);
	}
	
}