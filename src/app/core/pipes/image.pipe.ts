import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  transform(value: unknown, size: string = 'original'): string{
    return `https://image.tmdb.org/t/p/${size}/${value}`;
  }

}
