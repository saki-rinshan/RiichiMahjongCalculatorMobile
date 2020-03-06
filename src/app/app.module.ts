import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
 
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";

import { CalculatorComponent } from './main/calculator/calculator.component';
import { MainTilesSelectionComponent } from './main/tiles/main-tiles-selection.component';

import { TilesComponent } from './main/tiles/dumb_components/tiles.component';
import { ExtraInfoComponent } from './main/extra-info/extra-info.component';
import { TilesSectionComponent } from './main/tiles/dumb_components/tiles-section.component';
import { TilesButtonComponent } from './main/tiles/tiles-buttons.component';

import { MainTilesDisplayComponent } from './main/tiles/main-tiles-display.component';
import { YakuComponent } from './main/models/components/yaku.component'
import { FuComponent } from './main/models/components/fu.component'


import { CalculatorService } from './main/calculator/calculator.service';
import { ExtraInfoService } from './main/extra-info/extra-info.service';
import { MainTilesService } from './main/tiles/main-tiles.service';
import { RecognizerService } from './main/calculator/recognizer/recognizer.service';
import { NaiveRecognizerService } from './main/calculator/recognizer/naiveRecognizer.service'
import { ResultDisplayService } from './main/calculator/result-display.service'
import { LanguageService } from './main/language/language-service';
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";


import { UISizeControllerService } from './ui-control/uiSizeController.service';
import { ScrollViewControllerService } from './ui-control/scrollViewManager.service';
import { ToolTipAlertService } from './ui-control/toolTipAlert.service';
import { InteractabilityManager } from './ui-control/interactabilityManager.service';

import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DoraModalComponent } from './main/extra-info/doraModal/doraModal.component';
import { MenuComponent } from './menu/menu.component';
import { InfoComponent } from './menu/items/info.component';
import { ReferenceComponent } from './menu/items/reference.component';
import { SettingsManager } from './main/language/settingsManager';

import { CameraService } from './image/camera.service'
import { PrivacyComponent } from './menu/items/privacy.component';

@NgModule({
    imports: [
        NativeScriptModule,
        AppRoutingModule,
		FormsModule,
		
    ],
    declarations: [
        AppComponent,
		MainComponent,
		TilesComponent,    
		TilesSectionComponent,
		CalculatorComponent,
		ExtraInfoComponent,
		TilesButtonComponent,MainTilesSelectionComponent,
		MainTilesDisplayComponent,
		YakuComponent,
		FuComponent,
		
		DoraModalComponent,
		MenuComponent,
		InfoComponent,
		ReferenceComponent,
		PrivacyComponent,
    ],
	entryComponents: [ CalculatorComponent,  DoraModalComponent ],
    providers: [ SettingsManager, InteractabilityManager, ModalDialogService, ScrollViewControllerService, UISizeControllerService, LanguageService, ExtraInfoService, ToolTipAlertService, CalculatorService,  RecognizerService,  NaiveRecognizerService, MainTilesService,  ResultDisplayService, CalculatorComponent, TilesButtonComponent, CameraService],
    bootstrap: [
        AppComponent
    ], 
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
