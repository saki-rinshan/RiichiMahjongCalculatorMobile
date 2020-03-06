import { Component } from '@angular/core';
import { LanguageService } from '../main/language/language-service';
import { InteractabilityManager } from '../ui-control/interactabilityManager.service'

	
@Component({
    selector: "menu",
	styleUrls: ['./menu.component.css'],
    templateUrl: "./menu.component.html",
})

export class MenuComponent {

 
	constructor(public languageService: LanguageService, public interactabilityManager: InteractabilityManager) {

		 
	}
	
	
}