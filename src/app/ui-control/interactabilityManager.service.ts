export class InteractabilityManager {
	touch(args: any): void {
		var obj = args.object;
		var action: String = args.action;
		if(action == "down") {
			obj.scaleX = 0.9;
			obj.scaleY = 0.9;
		} else if(action == "up" || action == "cancel") {
			obj.scaleX = 1;
			obj.scaleY = 1;
		}
	}
	
	touchOpacity(args: any): void {
		var obj = args.object;
		var action: String = args.action;
		if(action == "down") {
			obj.opacity = 0.3;
		} else if(action == "up" || action == "cancel") {
			obj.opacity = 1;
		}
	} 
	touchNoBack(args: any): void {
		var obj = args.object;
		var action: String = args.action;
		if(action == "down") {
			obj.scaleX = 0.9;
			obj.scaleY = 0.9;
		} else if(action == "up" || action == "cancel") {
			obj.scaleX = 1;
			obj.scaleY = 1;
		}
	} 
	
	touchMin(args: any): void {
		var obj = args.object;
		var action: String = args.action;
		var oldColor = obj.borderColor;
		if(action == "down") {
			obj.borderColor ="purple"
			obj.borderWidth = 2;
		} else if(action == "up" || action == "cancel") {
			obj.borderColor = oldColor;
			obj.borderWidth = 0;
		}
	}
}