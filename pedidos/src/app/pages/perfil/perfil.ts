import { Component , inject} from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
    HeaderService = inject(HeaderService);
  ngOnInit(): void{
    this.HeaderService.titulo.set("perfil")
  }


}
