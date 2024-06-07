import { Injectable } from '@nestjs/common';

@Injectable()
export class UpperOneLetterService {
    transformText(text: string): string {
        // Dividir la cadena en palabras
        const words = text.toLowerCase().split(' ');
    
        // Transformar la primera letra de cada palabra a mayúsculas
        const transformedWords = words.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
    
        // Unir las palabras transformadas en una sola cadena
        return transformedWords.join(' ');
      }
}
