import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemingService} from '../../services/theming.service';
import {Subscription} from 'rxjs';
import {ThemModel} from '../../models/Them.model';


@Component({
  selector: 'app-them',
  templateUrl: './them.component.html',
  styleUrls: ['./them.component.scss']
})
export class ThemComponent implements OnInit, OnDestroy {
  public cssClass: string;

  private themes: string[];
  private themingSubscription: Subscription = new Subscription();

  readonly DARK_THEME = ThemModel.DARK_THEME;
  readonly LIGHT_THEME = ThemModel.LIGHT_THEME;

  constructor(private themingService: ThemingService) {
  }

  ngOnInit(): void {
    this.themes = this.themingService.themes;
    this.themingSubscription.add(this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
    }));
  }


  changeTheme(): void {
    this.cssClass === this.LIGHT_THEME ?
      this.themingService.theme.next(this.DARK_THEME) :
      this.themingService.theme.next(this.LIGHT_THEME);
  }

  ngOnDestroy(): void {
    this.themingSubscription.unsubscribe();
  }

}
