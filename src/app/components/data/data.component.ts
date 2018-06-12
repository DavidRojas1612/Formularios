import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  forma:any;
  margin:boolean = false;
  
  constructor(private fb:FormBuilder) { 
    this.forma = this.fb.group({
      'nombrecompleto': this.fb.group({
        'nombre':   ['',[Validators.required, Validators.minLength(4)]],
        'apellido': ['',[Validators.required]],
        }),
      'correo':   ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      'pasatiempos': this.fb.array([['',Validators.required]]),
      'contraseña': ['',[Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")]],
      'confcontraseña': [''],
      'username': ['', Validators.required, this.existuser]
    });
    
    
    // para cargar data por defecto
    // this.forma.setValue(); y recice un objeto con la data o se arma ahí mismo el objeto

    //también se pueden editar las validacionesd de forma individual
    this.forma.controls['confcontraseña'].setValidators([
      Validators.required, 
      this.confirmpasswd.bind(this.forma)
    ]);
  }

  ngOnInit() {
  }

//metodo para agregar un elemto, en el arrayform del formulario
  nuevo(){
    this.margin=true;
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  //"metodo"(validador) para confirmar contraseña, se añade a la validacion del campo en el formgroup
  confirmpasswd(control: FormControl):{[s:string]:boolean} {

    let forma:any = this;
    if(control.value !== forma.controls['contraseña'].value){
      return {
        notconfirm:true 
      }
    }
    return null;
  }

  //validaciones asíncoras
  existuser(control: FormControl): Promise<any>|Observable<any> {
      let promise = new Promise((resolve, reject)=>{
          setTimeout(()=>{
            //donde está petro debe ir la variable sacada de la DB que se va a comparar
            if(control.value==="petro"){
              resolve({existe:true})
            }else{
              resolve(null)
            }
          },1500);
      });

     return promise; 
  }

  guardar(){
    console.log(this.forma);
    
    console.log(this.forma.value);  
    this.forma.reset();
  }
}
