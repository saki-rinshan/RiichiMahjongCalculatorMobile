import { LanguageService } from './language-service';
import { Hand } from '../models/hand';

export class Strings {
	
	//calculator
	yakuTexts: String[];
	fuTexts: String[];
	yakumanTexts: String[];
	hanTexts: String[];
	kazoeYakumanTexts: String[];
	
	yakuText: String;
	fuText: String;
	yakumanText: String;
	hanText: String;
	kazoeYakumanText: String;
	//score
	basePointsText: String;
	basePointsTexts: String[];
	
	//extra-info
	addDoraTexts: String[];
	prevailingWindTexts: String[];
	seatWindTexts: String[];
	renchanTexts: String[];
	
	addDoraText: String;
	prevailingWindText: String;
	seatWindText: String;
	renchanText: String; 
	
	
	//main
	titleTexts:String[];
	resetAllTexts: String[];
	
	titleText: String;
	resetAllText: String;
	
	//sidebar
	infoTexts: String[];
	closeTexts: String[];
	licenseTexts: String[];
	contactMeTexts:String[];
	
	infoText: String;
	closeText: String;
	licenseText: String;
	contactMeText: String;
	
	//buttonCheckboxes
	containsAkaTexts: String[];
	isOpenTexts: String[];
	
	containsAkaText: String;
	isOpenText: String;
	
	//clearButton
	clearTilesTexts: String[];
	clearTilesText: String;
	
	hanNamesEN:String[];
	hanNamesJP:String[];
	hanNames:String[];
	
	
	tilesTabTexts: String[];
	extraInfoTabTexts: String[];
	
	tilesTabText: String;
	extraInfoTabText: String;
	
	calculateTabTexts: String[];
	calculateTabText: String; 
	
    titles =  ['Saki-san kawaii',
			'Pinfu and Tanyao are...',
			'Sonna occult arimasen',
			'Magical sands',
			'Do not test the... BETAORI!',
			'Kannya!',
			'Connect Kan',
			'Mahjong tte, tanoshii yo ne?',
			'東南西北 わーいわーい',
			'売人の運',];
	currentTitle: String;
	
	predictedHandTexts: String[];
	predictedHandText: String;
	
	cameraTexts: String[];
	cameraText: String;
	
	privacyTexts: String[];
	privacyText: String;
	
	constructor(public languageService: LanguageService) {
		
		this.changeTitle();
		
		this.yakuTexts = [ "Yaku", "役" ];
		this.yakumanTexts = [ "Yakuman", "役満" ];
		this.fuTexts = [ "Fu", "符" ];
		this.hanTexts =  [ "Han", "飜" ];
		this.kazoeYakumanTexts = [ "Kazoe Yakuman", "数え役満" ];
		
		this.addDoraTexts = [ "Add Dora Indicator", "ドラ標を増やす"];
		this.prevailingWindTexts = [ "Round wind", "場風"];
		this.seatWindTexts = [ "Seat wind", "自風"];
		this.renchanTexts = [ "Renchan", "連荘"];
		this.titleTexts = [ 'Riichi Mahjong Calculator', '麻雀計算機'];
		this.resetAllTexts = [ 'Reset', 'リセット'];
		this.infoTexts = [ 'Info', '計算機について'];
		this.closeTexts = [ 'Close', '閉じる'];
		this.licenseTexts = [ 'References', '參考資料'];
		this.contactMeTexts = [ 'Contact Me', '連絡先'];
		this.containsAkaTexts = [ 'Contains Aka', '赤牌がある'];
		this.isOpenTexts = [ 'Is Open', '副露'];
		this.clearTilesTexts = [ 'Clear', '消す'];
		this.basePointsTexts = [ 'Base points', '基本点'];
		this.hanNamesEN = [ 'Mangan', 'Haneman', 'Baiman', 'Sanbaiman', 'Yakuman'];
		this.hanNamesJP = ['満貫', '跳満', '倍満', '三倍満', '役満'];
		
		this.tilesTabTexts = ['Tiles', '牌'];
		this.extraInfoTabTexts = ['Extra Info', '設定'];
		this.calculateTabTexts = ['Calculate', '計算'];
		
		this.predictedHandTexts = ['Predicted Hand', '予測'];
		this.cameraTexts = ['Camera', 'カメラ'];
		this.privacyTexts = ['Privacy Policy', "プライバシー・ポリシー"];
		 
		this.yakuText = this.yakuTexts[this.languageService.currentLanguage];
		this.yakumanText = this.yakumanTexts[this.languageService.currentLanguage];
		this.fuText = this.fuTexts[this.languageService.currentLanguage];
		this.hanText = this.hanTexts[this.languageService.currentLanguage];
		this.kazoeYakumanText = this.kazoeYakumanTexts[this.languageService.currentLanguage];
		
		this.addDoraText = this.addDoraTexts[this.languageService.currentLanguage];
		this.prevailingWindText = this.prevailingWindTexts[this.languageService.currentLanguage];
		this.seatWindText = this.seatWindTexts[this.languageService.currentLanguage];
		this.renchanText = this.renchanTexts[this.languageService.currentLanguage];
		this.titleText = this.titleTexts[this.languageService.currentLanguage]; 
		this.resetAllText = this.resetAllTexts[this.languageService.currentLanguage];
		
		this.infoText = this.infoTexts[this.languageService.currentLanguage];
		this.closeText = this.closeTexts[this.languageService.currentLanguage];
		this.licenseText = this.licenseTexts[this.languageService.currentLanguage];
		this.contactMeText = this.contactMeTexts[this.languageService.currentLanguage];
		
		
		this.isOpenText = this.isOpenTexts[this.languageService.currentLanguage];
		this.containsAkaText = this.containsAkaTexts[this.languageService.currentLanguage];
		this.clearTilesText = this.clearTilesTexts[this.languageService.currentLanguage];
		this.basePointsText = this.basePointsTexts[this.languageService.currentLanguage];
		
		this.tilesTabText = this.tilesTabTexts[this.languageService.currentLanguage];
		this.extraInfoTabText = this.extraInfoTabTexts[this.languageService.currentLanguage];
		this.calculateTabText = this.calculateTabTexts[this.languageService.currentLanguage];
		this.predictedHandText = this.predictedHandTexts[this.languageService.currentLanguage];
		this.cameraText = this.cameraTexts[this.languageService.currentLanguage];
		this.privacyText = this.privacyTexts[this.languageService.currentLanguage];
		
		if(this.languageService.currentLanguage == 0) {
			this.hanNames = this.hanNamesEN;
		} else {
			this.hanNames = this.hanNamesJP;
		}
	}
	 
	updateText(language: number) {
		this.yakuText = this.yakuTexts[language];
		this.yakumanText = this.yakumanTexts[language];
		this.fuText = this.fuTexts[language];
		this.hanText = this.hanTexts[language];
		this.kazoeYakumanText = this.kazoeYakumanTexts[language];
		
		this.addDoraText = this.addDoraTexts[language];
		this.prevailingWindText = this.prevailingWindTexts[language];
		this.seatWindText = this.seatWindTexts[language];
		this.renchanText = this.renchanTexts[language];
		this.titleText = this.titleTexts[language];
		this.resetAllText = this.resetAllTexts[language];
		this.infoText = this.infoTexts[language];
		this.closeText = this.closeTexts[language];
		this.licenseText = this.licenseTexts[language]; 
		this.isOpenText = this.isOpenTexts[language];
		this.containsAkaText = this.containsAkaTexts[language]; 
		this.clearTilesText = this.clearTilesTexts[language];
		this.basePointsText = this.basePointsTexts[language];
		this.contactMeText = this.contactMeTexts[language];
		
		this.tilesTabText = this.tilesTabTexts[language];
		this.extraInfoTabText = this.extraInfoTabTexts[language];
		this.calculateTabText = this.calculateTabTexts[language];
		
		this.predictedHandText = this.predictedHandTexts[language];
		this.cameraText = this.cameraTexts[language];
		this.privacyText = this.privacyTexts[language];
		
		if(language == 0) {
			this.hanNames = this.hanNamesEN;
		} else {
			this.hanNames = this.hanNamesJP;
		}
	}
	getHanName(hand: Hand): String {
		
		
		if(hand.han >= 13) {
			return this.hanNames[4];
		} else if(hand.han >= 11) {
			return this.hanNames[3];
		} else if(hand.han >= 8) {
			return this.hanNames[2];
		} else if(hand.han >= 6) {
			return this.hanNames[1];
		} else if(hand.han >= 5) {
			return this.hanNames[0];
		}  else if(hand.han == 4 && hand.fu >= 50) {
			return this.hanNames[0]; 
		} else if(hand.han == 3 && hand.fu >= 70) {
			return this.hanNames[0];
		} else {
			return hand.han + " " + this.languageService.strings.hanText;
		}
	}
	
	
	
	
	changeTitle():void {
		var rand: number =  Math.floor(Math.random() * this.titles.length);
		this.currentTitle = this.titles[rand];
	}
}