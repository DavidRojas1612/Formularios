import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent  {
  
  nombre:string;
  usuario ={
    nombre:null,
    apellido:null,
    correo:null,
    pais:"",
    sexo:"Hombre",
    acepta: false
  }
  
  constructor() { }

  paises:any =[{
    codigo:"CO",
    nombre:"Colombia"
  },
  {
    codigo:"ESP",
    nombre:"España"
  },
  {
    codigo:"CRI",
    nombre:"Costarica"
  }
]

sexos:string[]=["Hombre","Mujer","Sin definir"]

  guardar(forma:NgForm){
  
    console.log(forma);
    console.log(forma.value);
    console.log(this.usuario);
    
    forma.reset();
    
    
    
  }
}
