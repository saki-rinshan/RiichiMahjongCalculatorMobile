import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { CalculatorComponent } from './main/calculator/calculator.component';
import  { ViewContainerRef } from "@angular/core";

import { LanguageService } from './main/language/language-service';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
	
	constructor(public modal: ModalDialogService, public vcRef: ViewContainerRef, public languageService: LanguageService,) {
		
	}
	
	public showModal() {
		let options = {
			context: {},
			fullscreen: true,
			viewContainerRef: this.vcRef
		}
		this.modal.showModal(CalculatorComponent, options).then(response => {
		});
	}
}
