import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoginFormQuery } from 'src/app/login/+state/login.selector';

import { UnsubscribeOnDestroyBaseComponent } from '../UnSubOnDestroy';

@Directive({
  selector: '[auth]',
})
export class AuthDirective extends UnsubscribeOnDestroyBaseComponent implements AfterViewInit {
  @Input() auth: string;

  constructor(
    // tslint:disable-next-line: no-any
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(LoginFormQuery.getRole)).subscribe((role) => {
        setTimeout(() => {
          if (role === this.auth) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        });
      })
    );
  }
}
