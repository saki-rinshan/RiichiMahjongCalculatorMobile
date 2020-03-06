
import { ScrollView } from 'tns-core-modules/ui/scroll-view';

export class ScrollViewControllerService {
	
	scroller: ScrollView;
	
	notify():void {
		var y: number = this.scroller.getActualSize().height;
		this.scroller.scrollToVerticalOffset(y, true);
		this.scroller.scrollBarIndicatorVisible = true;
	}
	
	setScroller(scroller: ScrollView) {
		this.scroller = scroller;
	}
	
}