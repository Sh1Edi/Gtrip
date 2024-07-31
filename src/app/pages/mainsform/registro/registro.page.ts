import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  mostrarContrasena: boolean = false;

  imageSource : any;
  image2 : any;

  arreglosPreguntas : any = [
    {
      idpregunta : '',
      pregunta : ''
    }
  ]

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router, private dbService: BdserviceService) {
    this.registroForm = this.formBuilder.group({
      
      rutusuario: ['', [Validators.required, this.validateRut]],
      nombreusuario: ['', [Validators.required, this.validateNombre]],
      apellidousuario: ['', [Validators.required, this.validateApellido]],
      correoUsuario: ['', [Validators.required, this.validateCorreo]],
      telefono: ['', [Validators.required, this.validateTelefono]],
      contra: ['', [Validators.required, this.validateContrasena]],
      confirmContra: ['', [Validators.required, this.validateConfirmContrasena.bind(this)]],
      respuesta: ['', [Validators.required, this.validateRespuesta]],
      eleccionPregunta: ['', [Validators.required]],
      });
   }

  ngOnInit() {
    this.dbService.dbState().subscribe(res => {
      if(res){
        this.dbService.fetchPregunta().subscribe(item => {
          this.arreglosPreguntas = item;
        });
      }
    }) 
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,    // se puede cambiar del 0 al 100 
      allowEditing: false,   // si se permite editar la foto es true si no se quiere permitir al usuario editar la foto es con un false
      resultType: CameraResultType.DataUrl,   //es una url con la info de la imagen
      source: CameraSource.Prompt    
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //var imageUrl = image.webPath;

    //this.imageSource =  image.dataUrl;
    //this.base64.readAsDataURL(image.dataUrl);
    //this.imageSource = this.base64;
    this.imageSource = image.dataUrl;

    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };


  //funcion para validar la respuesta
  validateRespuesta(control : FormControl) {
    const respuesta = control.value
    const respuestaRegex = /^[A-Za-z]{2,30}$/;
    return respuestaRegex.test(respuesta) ? null : { invalidrespuesta: true };
  }

  // Función para validar el correo
  validateCorreo(control: FormControl) {
    const correoUsuario = control.value;
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return correoRegex.test(correoUsuario) ? null : { invalidCorreo: true };
  }

  // Función de validación de RUT
  validateRut(control: FormControl) {
    const rut = control.value;
    const rutRegex = /^(\d{1,8})-?([\dkK])$/;
    const match = rut.match(rutRegex);
    if (!match) {
      return { invalidRut: true };
    }

    const [, rutDigits, dv] = match;

    const reversedRut = rutDigits.split('').reverse();
    let sum = 0;
    let multiplier = 2;
    for (const digit of reversedRut) {
      sum += parseInt(digit, 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDv = (11 - (sum % 11)) % 11;
    const actualDv = dv === 'k' ? 10 : parseInt(dv, 10);

    return expectedDv === actualDv ? null : { invalidRut: true };
  }

  // Función de validación para el nombre
  validateNombre(control: FormControl) {
    const nombre = control.value;
    return /^[A-Z][a-z]*$/.test(nombre) ? null : { invalidNombre: true };
  }

  // Función de validación para el apellido
  validateApellido(control: FormControl) {
    const apellido = control.value;
    return /^[A-Z][a-z]*$/.test(apellido) ? null : { invalidApellido: true };
  }

  // Función de validación para el teléfono
  validateTelefono(control: FormControl) {
    const telefono = control.value;
    const telefonoRegex = /^[0-9]{9}$/; // Asume 9 dígitos para un número válido.
    return telefonoRegex.test(telefono) ? null : { invalidTelefono: true };
  }

  // Función de validación para la contraseña
  validateContrasena(control: FormControl) {
    const contrasena = control.value;
    // Utiliza la expresión regular para validar la contraseña
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return contrasenaRegex.test(contrasena) ? null : { invalidContrasena: true };
  }

  // Función de validación para la confirmación de contraseña
  validateConfirmContrasena(control: FormControl) {
    if (!this.registroForm) {
      return null; // No hagas nada si el formulario no está definido aún.
    }

    const confirmContrasena = control.value;
    const contrasenaControl = this.registroForm.get('contra');

    if (!contrasenaControl || !contrasenaControl.value) {
      return { notMatched: true };
    }

    const contrasena = contrasenaControl.value;
    return confirmContrasena === contrasena ? null : { notMatched: true };
  }


  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }


  // Enviar Formulario con los datos
  onSubmit() {
    if (this.registroForm.valid) {
      if (!this.imageSource) {
        this.presentAlert('Error', 'Debes seleccionar una imagen antes de enviar el formulario.');
        return; // Evita que el formulario se envíe si no hay imagen seleccionada.
      }
  
      const { rutusuario, nombreusuario, apellidousuario, correoUsuario, telefono, contra, respuesta, eleccionPregunta } = this.registroForm.value;
  
      // Realiza la verificación antes de registrar al usuario
      this.dbService.checkCorreoExists(correoUsuario).then((correoExists) => {
        if (correoExists) {
          this.presentAlert('Error', 'El correo ya está registrado en la base de datos.');
        } else {
          // Comprueba si el RUT existe
          this.dbService.checkRutExists(rutusuario).then((rutExists) => {
            if (rutExists) {
              this.presentAlert('Error', 'El RUT ya está registrado en la base de datos.');
            } else {
              // Si no hay errores, registra al usuario
              this.dbService.FormRegistro(rutusuario, nombreusuario, apellidousuario, correoUsuario, telefono, this.imageSource, contra, respuesta, eleccionPregunta).then(() => {
                console.log('Usuario registrado con éxito');
                this.presentAlert('Éxito', 'Registro exitoso');
                this.router.navigate(['/login']);
              }).catch((error) => {
                console.error('Error al registrar usuario:', error);
              });
            }
          });
        }
      });
    }
  }

  // Icono donde muestra un mensaje de ayuda
  async mostrarInfo(campo: string) {
    let infoMessage = '';
    switch (campo) {
      case 'nombre':
        infoMessage = 'Debe iniciar en Mayúscula, no se permite números o caracteres especiales ni espacios en blanco, sin tildes.';
        break;
      case 'apellido':
        infoMessage = 'Debe iniciar en Mayúscula, no se permite números o caracteres especiales ni espacios en blanco, sin tildes.';
        break;
      case 'rut':
        infoMessage = 'Ingresa tu RUT sin puntos y con guión (Ej: 12345678-9).';
        break;
      case 'correo':
        infoMessage = 'Ingresa un correo válido (Ej: ejemplo@correo.com).';
        break;
      case 'contrasena':
        infoMessage = 'Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un dígito y un carácter especial. No debe incluir espacios.';
        break;
      case 'respuesta':
        infoMessage = 'La respuesta debe contener al menos 2  caracteres y puede tener un maximo de 30 caracteres.';
        break;
      default:
        infoMessage = 'Información no disponible.';
        break;
    }
    const alert = await this.alertController.create({
      header: 'Ayuda',
      message: infoMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title= 'Mensaje',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  irMenu() {
    this.router.navigate(['/login']);
  }
}
