import { NgModule } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [MonacoEditorModule.forRoot()],
  exports: [MonacoEditorModule]
})
export class CarrierProfileMonacoModule {}
