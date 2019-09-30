import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { LayoutService } from '../../../@core/utils';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Escuro',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Sair' }];

  constructor(
    private sessionService: SessionService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.user = this.sessionService.get('user');

    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    })
    //this.userService.getUsers()
    //  .pipe(takeUntil(this.destroy$))
    //  .subscribe((users: any) => this.user = this.sessionService.get('user'));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);


    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    setTimeout(() => {
      this.toggleSidebar();
    }, 500);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection(title) {
    if (title === 'Sair') {
      this.sair()
    }
  }

  sair() {
    this.sessionService.clean();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);

  }

}
