import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { LayoutService } from '../../../@core/utils';
import { SessionService } from '../../../services/session.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Location } from '@angular/common';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarModalComponent } from './progressbar-modal.component';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private idleOnTimeout$: Subscription;
  private onIdleStart$: Subscription;
  private onTimeoutWarning$: Subscription;
  private onIdleEnd$: Subscription;
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

  idleState = 'NOT_STARTED';
  timedOut = false;
  lastPing?: Date = null;
  progressBarPopup: NgbModalRef;

  constructor(
    private sessionService: SessionService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private idle: Idle, private keepalive: Keepalive, location: Location, private ngbModal: NgbModal
  ) {
    // sets an idle timeout of 15 minutes.
    idle.setIdle(10 * 60);
    // sets a timeout period of 5 minutes.
    idle.setTimeout(60);
    // sets the interrupts like Keydown, scroll, mouse wheel, mouse down, and etc
    // idle.setInterrupts([
    // new EventTargetInterruptSource(
    // this.element.nativeElement, 'keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll')]);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.onIdleEnd$ = idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NO_LONGER_IDLE';
    });

    this.idleOnTimeout$ = this.idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.timedOut = true;
      this.closeProgressForm();
    });

    this.onIdleStart$ = idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE_START', this.openProgressForm(1);
    });

    //this.onTimeoutWarning$ = 
    idle.onTimeoutWarning.subscribe((countdown: any) => {
      this.idleState = 'IDLE_TIME_IN_PROGRESS';
      this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
      this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
      this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
      this.progressBarPopup.componentInstance.countSeconds = countdown % 60;
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);
    /**
     *  // Keepalive can ping request to an HTTP location to keep server session alive
     * keepalive.request('<String URL>' or HTTP Request);
     * // Keepalive ping response can be read using below option
     * keepalive.onPing.subscribe(response => {
     * // Redirect user to logout screen stating session is timeout out if if response.status != 200
     * });
     */

    this.reset();
  }

  //ngOnDestroy() {
  //  this.resetTimeOut();
  //}

  reverseNumber(countdown: number) {
    return (300 - (countdown - 1));
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  openProgressForm(count: number) {
    this.progressBarPopup = this.ngbModal.open(ProgressBarModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
    this.progressBarPopup.componentInstance.count = count;
    this.progressBarPopup.result.then((result: any) => {
      if (result !== '' && 'logout' === result) {
        this.logout();
      } else if ('continue' === result) {
        this.reset();
      } else { }
    });
  }

  logout() {
    this.resetTimeOut();
    sessionStorage.setItem('sessionExpired', 'true');
    this.sair();
  }

  closeProgressForm() {
    this.progressBarPopup.close();
    sessionStorage.setItem('sessionExpired', 'true');
    this.sair();
  }

  resetTimeOut() {
    this.idle.stop();
    this.idleOnTimeout$.unsubscribe();
    this.onIdleStart$.unsubscribe();
    this.onIdleEnd$.unsubscribe();
    this.onTimeoutWarning$.unsubscribe();
    //this.sair();
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
