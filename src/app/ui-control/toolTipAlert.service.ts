import { Injectable } from '@angular/core';
import { Hand } from '../main/models/hand';
import { Fu } from '../main/models/fu';
import { Yaku } from '../main/models/yaku';
import { Button } from '../main/button/button'
import { LanguageService } from '../main/language/language-service'
import * as dialog from  'tns-core-modules/ui/dialogs';


@Injectable()
export class ToolTipAlertService {
	
	
	constructor(public languageService: LanguageService) {
		
	}
	
	showGeneric(obj: any): void {
		const options: dialog.AlertOptions =  {
			title: obj.name.valueOf() + " - " + obj.pronounciation.valueOf(),
			message: obj.tooltip.valueOf(),
			okButtonText: "Ok", 
		}
		dialog.alert(options);
		
	}
	
	showScore(hand: Hand): void {
		var addOn: string = "Base points are rounded up to the nearest hundred. Each renchan adds 300 to the total payout amount."
		var bodyText: string = hand.payout.generatePayoutDistributionString().valueOf();
		var formula: String = this.languageService.strings.basePointsText + " = 2^(2 + " + this.languageService.strings.hanText + ") * " + this.languageService.strings.fuText;
		const options: dialog.AlertOptions =  {
			title: hand.payout.title.valueOf() + " - " + hand.payout.generatePayoutString().valueOf(),
			message: formula.valueOf() + "\n \n" + 
					hand.payout.generatePayoutCalculationString().valueOf()  + "\n \n" +  
					bodyText + "\n \n" +
					addOn,
			okButtonText: "I'll remember this for next time",
		}
		dialog.alert(options);
	}
	
	showHanInfo(han: number): void {
		var textBody: string;
		if(this.languageService.currentLanguage == 0) {
			textBody= "Mangan: 3* 4** 5 Han" + "\n" + 
					"Haneman: 6-7 Han" + "\n" + 
					"Baiman: 8-10 Han" + "\n" + 
					"Sanbaiman: 11-12 Han" + "\n" + 
					"Yakuman: 13+ Han" + "\n" + 
					"*3 han + minimun of 70 fu" + "\n" + 
					"**4 han + minimun of 50 fu" + "\n";
		} else {
			textBody = "満貫: 3* 4** 5 飜" + "\n" + 
					"跳満: 6-7 飜" + "\n" + 
					"倍満: 8-10 飜" + "\n" + 
					"三倍満: 11-12 飜" + "\n" + 
					"役満: 13+ 飜" + "\n" + 
					"*3飜 + 70符以上" + "\n" + 
					"**4飜 + 50符以上" + "\n";
					
		}
		const options: dialog.AlertOptions =  {
			title: han + " " + this.languageService.strings.hanText.valueOf(),
			message: textBody,
			okButtonText: "I'll remember this for next time",
		}
		dialog.alert(options);
	}
}