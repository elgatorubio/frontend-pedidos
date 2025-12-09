import { Component , inject} from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-buscar',
  imports: [],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css',
})
export class Buscar {
    HeaderService = inject(HeaderService);
  ngOnInit(): void{
    this.HeaderService.titulo.set("buscar")
  }

}
