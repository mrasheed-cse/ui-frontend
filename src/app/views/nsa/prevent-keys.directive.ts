import { Directive, Input } from '@angular/core';

/*@Directive({
  selector: '[appPreventKeys]'
})
export class PreventKeysDirective {

  constructor() { }

}*/



@Directive( {
    selector: '[prevent-keys]',
    host: {
        '(keydown)': 'onKeyUp($event)'
    },
    standalone: false
} )
export class PreventKeysDirective {
  @Input( 'prevent-keys' ) preventKeys;
  onKeyUp ( $event ) {
      console.log($event);
      console.log($event.keyCode);
      console.log(this.preventKeys);
      if ( this.preventKeys && this.preventKeys.includes( $event.keyCode ) ) {
          $event.preventDefault();
      }
  }
}