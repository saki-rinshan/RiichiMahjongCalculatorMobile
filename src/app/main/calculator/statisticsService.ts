
//import io from "socket.io-client";
import { LanguageService } from '../language/language-service';

export class StatisticsService {
	
	public url: String = '138.68.20.187:80';
	public socket;
	
	constructor(public languageService: LanguageService) {
		//this.socket = io.connect(this.url);
	}
	
	
	emitCalculatorTriggered(): void {
		//this.socket.emit('a', this.languageService.currentLanguage);
	}
}