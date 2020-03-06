import { Component } from '@angular/core';
import { LanguageService } from '../../main/language/language-service';
import { InteractabilityManager } from '../../ui-control/interactabilityManager.service'
	
@Component({
    selector: "privacy-info",
	styleUrls: ['./privacy.component.css'],
    templateUrl: "./privacy.component.html",
})

export class PrivacyComponent {

 
	constructor(public languageService: LanguageService, public interactabilityManager: InteractabilityManager) {

		 
	}
	
	
}