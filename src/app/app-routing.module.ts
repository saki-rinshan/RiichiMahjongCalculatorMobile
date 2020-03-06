import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MainComponent } from "./main/main.component";
import { MenuComponent } from "./menu/menu.component";
import { InfoComponent } from './menu/items/info.component';
import { ReferenceComponent } from './menu/items/reference.component';
import { PrivacyComponent } from './menu/items/privacy.component';

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main", component: MainComponent }, 
	{ path: "menu", component: MenuComponent },
	/*
	 * Lazy route these
	 */
	{ path: "menu-info", component: InfoComponent },
	{ path: "reference", component: ReferenceComponent },
		{ path: "privacy-info", component: PrivacyComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
