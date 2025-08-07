import { Pipe, PipeTransform } from '@angular/core';
import 'prismjs';
import 'prismjs/components/prism-json';
declare let Prism: any;

@Pipe({ name: 'prism' })
export class PrismPipe implements PipeTransform {
  transform(code: string, lang: string = 'json'): string {
    if (typeof Prism !== 'undefined' && Prism.highlight) {
      return Prism.highlight(code, Prism.languages[lang] || Prism.languages.json, lang);
    }
    return code;
  }
}
