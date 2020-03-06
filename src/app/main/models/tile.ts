export enum TileValue {
	//10 & 11 left blank to ensure getHands doesn't place honors in sequences
	East = 12,
	South,
	West,
	North,
	Haku = 16,
	Hatsu,
	Chun
};

export enum TileSuit {
	Manzu = 0,
	Pinzu,
	Souzu,
	Wind,
	Dragon,
};
export class TileList {
	
	honorTiles: Tile[];
	manzuTiles: Tile[];
	pinzuTiles: Tile[];
	souzuTiles: Tile[];
	
	suitTiles: Tile[][];
	
	
	
	row1Names: string[] = [
		"man1", "man2", "man3", "pin1", "pin2", "pin3", "sou1", "sou2", "sou3", "chun", "haku", "hatsu", "sou5 Aka"
	]; 
	
	row2Names: string[] = ["man4", "man5", "man6", "pin4", "pin5", "pin6", "sou4", "sou5", "sou6", "ton", "nan",
	"man5 Aka"];
	
	row3Names: string[] = ["man7", "man8", "man9","pin7", "pin8", "pin9", "sou7", "sou8", "sou9", "xi" , "pei",
	"pin5 Aka"];
	
	row1: Tile[];
	row2: Tile[];
	row3: Tile[]; 
	
	rows: Tile[][];
	
	constructor() {
		
		this.honorTiles = [];
		this.manzuTiles = [];
		this.pinzuTiles = [];
		this.souzuTiles = [];
		this.suitTiles = [];
		
		this.row1 = [];
		this.row2 = [];
		this.row3 = [];
		
		
		for(let tileName of this.row1Names) {
			this.row1.push(new Tile(-1, -1, tileName));
		}
		
		for(let tileName of this.row2Names) {
			this.row2.push(new Tile(-1, -1, tileName));
		}
		
		for(let tileName of this.row3Names) {
			this.row3.push(new Tile(-1, -1, tileName));
		}
		
		this.rows = [];
		
		this.rows.push(this.row1);
		this.rows.push(this.row2);
		this.rows.push(this.row3);
		
		this.suitTiles.push(this.manzuTiles);
		this.suitTiles.push(this.pinzuTiles);
		this.suitTiles.push(this.souzuTiles);
	
		this.suitTiles.push(this.honorTiles);
	}
	
	//pin3
	findTile(name: string) : Tile {
		if(name.substring(0,2) === 'xx') {
			return undefined;
		}
		if(name.charAt(5) == 'A') {
			for(let row of this.rows) {
				var tile:Tile  = this.searchArr(name, row);
				if(tile) {
					return tile;
				}
			}
		}
		else if(name.charAt(0) != 'x') {
			var num: number = parseInt(name.charAt(3));
			if(num <= 3) {
				return this.searchArr(name, this.row1);
			}	
			else if(num <= 6) {
				return this.searchArr(name, this.row2);
			}
			else if(num <= 9) {
				return this.searchArr(name, this.row3);
			}	
		} else {
			var realName: string = name.substring(2,name.length);
			for(let row of this.rows) {
				var tile:Tile  = this.searchArr(realName, row);
				if(tile) {
					return tile;
				}
			}
		}
	}
	
	searchArr(name: string, tileArr: Tile[]): Tile {
		for(let tile of tileArr) {
			if(tile.name === name) {
				return tile
			}
		}
		return undefined;
	}
}

export class Tile {
	value: number = -1;
	suit: number = -1;
	name: String  = "";
	instances: number = 0;
	isAka = false;
	isDora = false;
	
	constructor(v?: number, s?: number, name?: String) {
		if(v != -1 && s != -1) {
			this.value = v;
			this.suit = s;
			if(name) {
				this.name = name;
			} else {
				//no honor tile Support yet
				if(s == TileSuit.Manzu) {
					this.name = "Man"+v;
				} else if(s == TileSuit.Pinzu) {
					this.name = "Pin"+v;
				} else if(s == TileSuit.Souzu) {
					this.name = "Sou"+v;
				} 
			}
			return;
		}
		this.name = name;
		if(name) {
			if(name.indexOf('Aka') >= 0) {
				this.isAka = true;
			}
			switch(name.substring(0, 3)) {
				case "man": { //Manzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Manzu;
					break;
				}
				case "pin": { // Pinzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Pinzu;
					break;
				}
				case "sou": { // Souzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Souzu;
					break;
				}
				case "chu": { // Chun Tile
					this.value = TileValue.Chun;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "hak": { // Haku Tile
					this.value = TileValue.Haku;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "hat": { // Hatsu Tile
					this.value = TileValue.Hatsu;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "nan": { // South Tile
					this.value = TileValue.South;
					this.suit = TileSuit.Wind;
					break;
				}
				case "pei": { // North Tile
					this.value = TileValue.North;
					this.suit = TileSuit.Wind;
					break;
				}
				case "xi": { // West Tile
					this.value = TileValue.West;
					this.suit = TileSuit.Wind;
					break;
				}
				case "ton": { // East Tile
					this.value = TileValue.East;
					this.suit = TileSuit.Wind;
					break;
				}
			}
		}
	}

	equals(t:Tile): boolean {
		if(t) {
			return (this.value == t.value && this.suit == t.suit);
		} else {
			return false;
		}
	}
	
	
	compare(t:Tile): number {
		if (this.suit == t.suit) {
			return (this.value - t.value);
		} else if (this.suit < t.suit) {
			return (this.suit - t.suit);
		}
	}
	
	isNextInSequence(t:Tile, index?: number): boolean {
		if(index != undefined) {
			if((this.value+index) == t.value && this.suit == t.suit) {
				return true;
			}
		} else {
			if((this.value+1) == t.value && this.suit == t.suit) {
				return true;
			}
		}
		return false;
	}
	
	isSimple(): boolean {
		var value = Number(this.name.charAt(3));
		if(Number.isNaN(value) || value == 0 || value == 1 || value == 9) {
			return false;
		}
		return true;
	}
	
	isHonor(): boolean {
		var value = Number(this.name.charAt(3));
		if(Number.isNaN(value) || value == 0) {
			return true;
		}
		return false;
	}
	
	//naive
	getNextTile(position: number): Tile {
		//console.log(this.value + position);
		if(position == undefined) {
			position = 1;
		}
		if((this.value + position) < 1) {
			return undefined;
		}
		if((this.value + position) > 9) {
			return undefined;
		}
		//console.log( this.name.replace(/[0-9]/g, '') + ""+ (this.value + position));
		var replacedName = (this.name.replace(/[0-9]/g, '') + (this.value + position)).replace("-Dora", "");
		return new Tile((this.value + position), this.suit, replacedName);
	}
	
	isAkaTile(): boolean {
		return this.name.indexOf("Dora") !== -1;
	}
	
	toString(): String {
		return this.name;
	}
	
	toggleAka(): void {
		if(this.value != 5) {
			return;
		}
		if(!this.isAka) {
			this.name += "-Dora";
			this.isAka = true;
		} else {
			this.name = this.name.replace("-Dora", "");
			this.isAka = false;
		}
	}
}


