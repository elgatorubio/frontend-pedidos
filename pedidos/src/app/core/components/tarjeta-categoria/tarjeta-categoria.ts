import { Component , Input} from '@angular/core';
import { Categorias } from '../../interfaces/categorias';


@Component({
  selector: 'app-tarjeta-categoria',
  imports: [],
  templateUrl: './tarjeta-categoria.html',
  styleUrl: './tarjeta-categoria.css',
  standalone :true
})
export class TarjetaCategoria {

  @Input({required:true}) categoria!:Categorias;

}
