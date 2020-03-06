import { Component } from '@angular/core';
import { LanguageService } from '../../main/language/language-service';
import { InteractabilityManager } from '../../ui-control/interactabilityManager.service'

	
@Component({
    selector: "menu-info",
	styleUrls: ['./info.component.css'],
    templateUrl: "./info.component.html",
})

export class InfoComponent {

 
	constructor(public languageService: LanguageService, public interactabilityManager: InteractabilityManager) {

		 
	}
	
	
}