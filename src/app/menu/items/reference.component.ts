import { Component } from '@angular/core';
import { LanguageService } from '../../main/language/language-service';
import { InteractabilityManager } from '../../ui-control/interactabilityManager.service'
import * as utils from "tns-core-modules/utils/utils";

	
@Component({
    selector: "reference",
	styleUrls: ['./reference.component.css'],
    templateUrl: "./reference.component.html",
})

export class ReferenceComponent {

 
	constructor(public languageService: LanguageService, public interactabilityManager: InteractabilityManager) {

		 
	}
	
	openX(url: string): void {
		utils.openUrl(url);
	}
	
}