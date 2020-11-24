import { AfterViewInit, Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoginFormQuery } from 'src/app/login/+state/login.selector';

import { UnsubscribeOnDestroyBaseComponent } from '../UnSubOnDestroy';

@Directive({
  selector: '[auth]',
})
export class AuthDirective extends UnsubscribeOnDestroyBaseComponent implements AfterViewInit {
  @Input() auth: string;

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private store: Store
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(LoginFormQuery.getRole)).subscribe((role) => {
        console.log(role, this.auth);

        console.log(1, role, this.auth);
        setTimeout(() => {
          if (role === this.auth) {
            this._viewContainer.createEmbeddedView(this._templateRef);
          } else {
            this._viewContainer.clear();
          }
        });
      })
    );
  }
}
