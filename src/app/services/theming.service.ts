import {ApplicationRef, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ThemModel} from '../models/Them.model';


@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  themes = [ThemModel.LIGHT_THEME, ThemModel.DARK_THEME];
  theme = new BehaviorSubject(ThemModel.LIGHT_THEME);

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkModeOn) {
      this.theme.next(ThemModel.DARK_THEME);
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? ThemModel.DARK_THEME : ThemModel.LIGHT_THEME);

      // trigger refresh of UI
      this.ref.tick();
    });
  }
}
