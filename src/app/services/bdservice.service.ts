import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './class/rol/rol';
import { Sede } from './class/sede/sede';
import { Comuna } from './class/comuna/comuna';
import { Usuario } from './class/usuario/usuario';
import { Vehiculo } from './class/vehiculo/vehiculo';
import { Recorrido } from './class/recorrido/recorrido';
import { Detalle } from './class/detalle/detalle';
import { Pregunta } from './class/pregunta/pregunta';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!: SQLiteObject;

  //                        TABLAS BD   -> FALTA TABLA HISTORIAL -> 


  //Variable de la creacion de la tabla Rol
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY, nombrerol VARCHAR(70) NOT NULL);";

  //Variable de la creacion de la tabla sede
  tablaSede: string = "CREATE TABLE IF NOT EXISTS sede(idsede INTEGER PRIMARY KEY autoincrement, nombresede VARCHAR(70) NOT NULL);";

  //Variable de la creacion de la tabla comuna 
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(idcomuna INTEGER PRIMARY KEY autoincrement, nombrecomuna VARCHAR(70) NOT NULL);";

  //Variable de la creacon de la tabla pregunta
  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta(idpregunta INTEGER PRIMARY KEY, pregunta VARCHAR(60) NOT NULL);";

  //Variable de la creacion de la tabla Usuario   Crear en el usuario un dato status en el cual sea tipo integer para que se pueda bloquear y desbloquear
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY autoincrement, rutusuario VARCHAR(50), nombreusuario VARCHAR(70) NOT NULL, apellidousuario VARCHAR(70) NOT NULL, correoUsuario VARCHAR(70) NOT NULL, telefono VARCHAR(15) NOT NULL, fotousuario BLOB, idtablarol INTEGER NOT NULL, contra VARCHAR(30) NOT NULL, status INTEGER NOT NULL, respuesta VARCHAR(60) NOT NULL, auto INTEGER NOT NULL, preguntaselect INTEGER NOT NULL, FOREIGN KEY (idtablarol) REFERENCES tablaRol(idrol), FOREIGN KEY (preguntaselect) REFERENCES tablaPregunta(idpregunta));";

  //Variable de la creacion de la tabla Vehiculo
  tablaVehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo(idv INTEGER PRIMARY KEY autoincrement, modelovehiculo VARCHAR(50) NOT NULL, patente VARCHAR(50) NOT NULL, fotov BLOB, estadovehiculo INTEGER NOT NULL, idu INTEGER NOT NULL, asientos INTEGER NOT NULL, FOREIGN KEY (idu) REFERENCES tablaUsuario(idusuario));";

  //Variable de la creacion de la tabla Recorrido
  tablaRecorrido: string = "CREATE TABLE IF NOT EXISTS recorrido (idrecorrido INTEGER PRIMARY KEY AUTOINCREMENT, descripcionr VARCHAR(300) NOT NULL, idtsede INTEGER NOT NULL, idtcomuna INTEGER NOT NULL, valor INTEGER NOT NULL,  asientos INTEGER NOT NULL, idusuario INTEGER NOT NULL, rutusuario VARCHAR(50),hora VARCHAR(50) NOT NULL,  FOREIGN KEY (idtsede) REFERENCES tablaSede(idsede), FOREIGN KEY (idtcomuna) REFERENCES tablaComuna(idcomuna), FOREIGN KEY (idusuario) REFERENCES tablaUsuario(idusuario), FOREIGN KEY (rutusuario) REFERENCES tablaUsuario(rutusuario));";

  


  
  //Variable de la creacion de la tabla Detalle
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY autoincrement, calificaciond VARCHAR(300) NOT NULL, idtablau INTEGER NOT NULL, idtrecorrido INTEGER NOT NULL, nombreCliente VARCHAR(100) NOT NULL, apellidoCliente VARCHAR(100), FOREIGN KEY (idtablau) REFERENCES tablaUsuario(idusuario), FOREIGN KEY (idtrecorrido) REFERENCES tablaRecorrido(idrecorrido));";


  //Detalles - Boletas
  registroDetalle: string = "INSERT or IGNORE INTO detalle(iddetalle, calificaciond, idtablau, idtrecorrido) VALUES (1, 'cinco extrellitas', 1, 1);";
  
  registroSede: string = "INSERT or IGNORE INTO sede(idsede, nombresede) VALUES (1,'plaza norte');";
  registroSede2: string = "INSERT or IGNORE INTO sede(idsede, nombresede) VALUES (2,'San joaquin');";
  registroSede3: string = "INSERT or IGNORE INTO sede(idsede, nombresede) VALUES (3,'plaza oeste');";

  registroComuna: string = "INSERT or IGNORE INTO comuna(idcomuna, nombrecomuna) VALUES (1, 'quilicura');";
  registroComuna2: string = "INSERT or IGNORE INTO comuna(idcomuna, nombrecomuna) VALUES (2, 'Colina');";
  registroComuna3: string = "INSERT or IGNORE INTO comuna(idcomuna, nombrecomuna) VALUES (3, 'Huechuraba');";
  
  //                                          INSERTS Funcionales
  //Roles
  registroRolAdm: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES (1,'Admin');";
  registroRolUs: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES (2,'Usuario');";
  registroRolCon: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES (3,'conductor');";


  //preguntas
  registroPregunta: string = "INSERT or IGNORE INTO pregunta(idpregunta, pregunta) VALUES (1, '¿Cual es el nombre de tu Madre?');";
  registroPreguntaDos: string = "INSERT or IGNORE INTO pregunta(idpregunta, pregunta) VALUES (2, '¿Cual es el nombre de tu Hermano?');";
  registroPreguntaTres: string = "INSERT or IGNORE INTO pregunta(idpregunta, pregunta) VALUES (3, '¿Cual es el nombre de tu mascota?');";

  //Usuarios
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idusuario, rutusuario, nombreusuario, apellidousuario, correoUsuario, telefono, idtablarol, contra, status, respuesta, auto, preguntaselect) VALUES (1, '15975369-1', 'Sr wenas', 'asdd', 'adminuno@gmail.com', '123123', 1, 'admin1', 1, 'mascota', 1, 3);";

 

  //                observables para las tablas que se consultaran

  listaRol = new BehaviorSubject([]);
  listaSede = new BehaviorSubject([]);
  listaComuna = new BehaviorSubject([]);
  listaPregunta = new BehaviorSubject([]);
  listaUsuario = new BehaviorSubject([]);
  listaVehiculo = new BehaviorSubject([]);
  listaRecorrido = new BehaviorSubject([]);
  listaDetalle = new BehaviorSubject([]);
  rolSeleccionado = new BehaviorSubject([]);

  listaConductores = new BehaviorSubject([]);
  listarUserUsuario = new BehaviorSubject([]);
  listarDatos = new BehaviorSubject([]);
  listaVehiculoUno = new BehaviorSubject([]);

  listaDetalleFiltrado = new BehaviorSubject([]);
  //                observable para manipular el status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.crearDB();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  //                      FETCH (obtener o devolver un observable de los select mediante una funcion)
  
  fetchDetalleFiltrado(){
    return this.listaDetalleFiltrado.asObservable();
  }

  fetchRolSeleccionado(): Observable<Rol[]> {
    return this.rolSeleccionado.asObservable();
  }

  fetchUserUsuario():Observable<Usuario[]> {
    return this.listarUserUsuario.asObservable();
  }

  fetchVehiculoUno(): Observable<Vehiculo[]> {
    return this.listaVehiculoUno.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }
  fetchSede(): Observable<Sede[]> {
    return this.listaSede.asObservable();
  }
  fetchComuna(): Observable<Comuna[]> {
    return this.listaComuna.asObservable();
  }
  fetchPregunta() : Observable<Pregunta[]> {
    return this.listaPregunta.asObservable();
  }
  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }
  fetchVehiculo(): Observable<Vehiculo[]> {
    return this.listaVehiculo.asObservable();
  }
  fetchRecorrido(): Observable<Recorrido[]> {
    return this.listaRecorrido.asObservable();
  }
  fetchDetalle(): Observable<Detalle[]> {
    return this.listaDetalle.asObservable();
  }

  //                      Funciones

  buscarRol() {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      let items: Rol[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idrol: res.rows.item(i).idrol,
            nombrerol: res.rows.item(i).nombrerol
          })
        }
      }
      this.listaRol.next(items as any);
    })
  }

  buscarSede() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      let items: Sede[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idsede: res.rows.item(i).idsede,
            nombresede: res.rows.item(i).nombresede
          })
        }
      }
      this.listaSede.next(items as any);
    })
  }
  buscarComuna() {
    return this.database.executeSql('SELECT * FROM comuna', []).then(res => {
      let items: Comuna[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idcomuna: res.rows.item(i).idcomuna,
            nombrecomuna: res.rows.item(i).nombrecomuna
          })
        }
      }
      this.listaComuna.next(items as any);
    })
  }

  buscarPregunta(){
    return this.database.executeSql('SELECT * FROM pregunta', []).then(res => {
      let items: Pregunta[] = [];
      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idpregunta : res.rows.item(i).idpregunta,
            pregunta : res.rows.item(i).pregunta
          })
        }
      }
      this.listaPregunta.next(items as any);
    })
  }

  buscarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idusuario: res.rows.item(i).idusuario,
            rutusuario: res.rows.item(i).rutusuario,
            nombreusuario: res.rows.item(i).nombreusuario,
            apellidousuario: res.rows.item(i).apellidousuario,
            correoUsuario: res.rows.item(i).correoUsuario,
            telefono: res.rows.item(i).telefono,
            fotousuario: res.rows.item(i).fotousuario,
            idtablarol: res.rows.item(i).idtablarol,
            contra: res.rows.item(i).contra,
            status : res.rows.item(i).status,
            respuesta : res.rows.item(i).respuesta,
            auto : res.rows.item(i).auto,
            preguntaselect: res.rows.item(i).preguntaselect
          })
        }
      }
      this.listaUsuario.next(items as any);
    })
  }

  buscarVehiculo() {
    return this.database.executeSql('SELECT * FROM vehiculo', []).then(res => {
      let items: Vehiculo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idv: res.rows.item(i).idv,
            modelovehiculo: res.rows.item(i).modelovehiculo,
            patente : res.rows.item(i).patente,
            fotov: res.rows.item(i).fotov,
            estadovehiculo : res.rows.item(i).estadovehiculo,
            idu: res.rows.item(i).idu,
            asientos: res.rows.item(i).asientos

          })
        }
      }
      this.listaVehiculo.next(items as any);
    })
  }
  
  buscarRecorrido() {
    return this.database.executeSql('SELECT * FROM recorrido', []).then(res => {
      let items: Recorrido[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idrecorrido: res.rows.item(i).idrecorrido,
            descripcionr: res.rows.item(i).descripcionr,
            idtsede: res.rows.item(i).idtsede,
            idtcomuna: res.rows.item(i).idtcomuna,
            valor: res.rows.item(i).valor,
            asientos: res.rows.item(i).asientos,
            rutusuario: res.rows.item(i).rutusuario,
            hora: res.rows.item(i).hora
          })
        }
      }
      this.listaRecorrido.next(items as any);
    })
  }

  buscarDetalle() {
    return this.database.executeSql('SELECT * FROM detalle', []).then(res => {
      let items: Detalle[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            iddetalle: res.rows.item(i).iddetalle,
            calificaciond: res.rows.item(i).calificaciond,
            idtablau: res.rows.item(i).idtablau,
            idtrecorrido: res.rows.item(i).idtrecorrido,
            nombreCliente: res.rows.item(i).nombreCliente,
            apellidoCliente: res.rows.item(i).nombreCliente,
          })
        }
      }
      this.listaDetalle.next(items as any);
    })
  }

  checkCorreoExists(correo: string): Promise<boolean> {
    return this.database.executeSql('SELECT COUNT(*) as count FROM usuario WHERE correousuario = ?', [correo]).then((result) => {
      const count = result.rows.item(0).count;
      return count > 0;
    });
  }
  checkRutExists(rut: string): Promise<boolean> {
    return this.database.executeSql('SELECT COUNT(*) as count FROM usuario WHERE rutusuario = ?', [rut]).then((result) => {
      const count = result.rows.item(0).count;
      return count > 0;
    });
  }
  
  FormRegistro(rutusuario: any, nombreusuario: any, apellidousuario: any, correoUsuario: any, telefono: any, foto : any, contra: any, respuesta : any, preguntaselect: any) {
    const status = 1;
    const idtablarol = 2; 
    const auto = 1;
    return this.database.executeSql(
      'SELECT COUNT(*) as count FROM usuario WHERE correousuario = ? OR rutusuario = ?',
      [correoUsuario, rutusuario]
    )
    .then((result) => {
      const count = result.rows.item(0).count;
      if (count > 0) {
        // Ya existe un usuario con el mismo correo o RUT
        return { success: false, message: 'El correo o RUT ya están registrados.' };
      } else {
        // Si el correo y el RUT no existen, proceder con la inserción en la base de datos
        return this.database.executeSql('INSERT or IGNORE INTO usuario(rutusuario, nombreusuario, apellidousuario, correousuario, telefono, fotousuario, idtablarol, contra, status, respuesta, auto, preguntaselect) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[rutusuario, nombreusuario, apellidousuario, correoUsuario, telefono, foto, idtablarol, contra, status, respuesta, auto, preguntaselect]
        )
        .then(() => {
          this.buscarUsuario();
          return { success: true, message: 'Usuario registrado con éxito.' };
        })
        .catch((error) => {
          return { success: false, message: 'Hubo un problema al registrar el usuario.' };
        });
      }
    });
  }
  InicioSesion(correoUsuario: any, contra: any): Promise<Usuario | null> {
    return this.database
      .executeSql('SELECT * FROM usuario WHERE correousuario = ? AND contra = ?', [correoUsuario, contra])
      .then((res) => {
        if (res.rows.length > 0) {
          // Se encontró un usuario con las credenciales ingresadas
          // Devuelve la información del usuario, incluido su idtablarol
          const usuario = res.rows.item(0);
          return {
            idusuario: usuario.idusuario,
            rutusuario: usuario.rutusuario,
            nombreusuario: usuario.nombreusuario,
            apellidousuario: usuario.apellidousuario,
            correoUsuario: usuario.correoUsuario,
            telefono: usuario.telefono,
            fotousuario: usuario.fotousuario,
            idtablarol: usuario.idtablarol,
            contra: usuario.contra,
            status : usuario.status,
            respuesta : usuario.respuesta,
            auto : usuario.auto,
            preguntaselect: usuario.preguntaselect
          } as Usuario;
        } else {
          // Las credenciales son incorrectas, no se encontró ningún usuario
          return null;
        }
      })
      .catch((error) => {
        console.error('Error en la consulta de inicio de sesión:', error);
        return null;
      });
  }

  forgetPassword(correo : any, respuesta : any, preguntaselect: any): Promise<Usuario | null>{
    return this.database.executeSql('SELECT * FROM usuario WHERE correousuario = ? AND respuesta = ? AND preguntaselect = ?', [correo, respuesta, preguntaselect]).then(res => {
      if (res.rows.length > 0) {
        // Se encontró un usuario con las credenciales ingresadas
        // Devuelve la información del usuario, incluido su idtablarol
        const usuario = res.rows.item(0);
        return {
          idusuario: usuario.idusuario,
          rutusuario: usuario.rutusuario,
          nombreusuario: usuario.nombreusuario,
          apellidousuario: usuario.apellidousuario,
          correoUsuario: usuario.correoUsuario,
          telefono: usuario.telefono,
          fotousuario: usuario.fotousuario,
          idtablarol: usuario.idtablarol,
          contra: usuario.contra,
          status : usuario.status,
          respuesta : usuario.respuesta,
          auto : usuario.auto,
          preguntaselect: usuario.preguntaselect
        } as Usuario;
      } else {
        // Las credenciales son incorrectas, no se encontró ningún usuario
        return null;
      }
    })
  }

  //                   USUARIO

  modificarPerfil(nombreusuario: any, apellidousuario: any, correoUsuario: any, telefono: any, fotousuario: any, idusuario: any) {
    return this.database.executeSql('UPDATE usuario SET nombreusuario=?, apellidousuario=?, correoUsuario=?, telefono=?, fotousuario=? WHERE idusuario=?', [nombreusuario, apellidousuario, correoUsuario, telefono, fotousuario, idusuario]).then(res => {
      this.buscarUsuario();
    });
  }

  modificarPass(contra : any, idusuario : any){
    return this.database.executeSql('UPDATE usuario SET contra = ? WHERE idusuario = ?', [contra, idusuario]).then(res=>{
      this.buscarUsuario();
    })
  }

  serConductor(modelo : any, patente : any, fotov : any, idu : any, asientos : any){
    const estadovehiculo = 2;
    return this.database.executeSql('INSERT or IGNORE INTO vehiculo(modelovehiculo, patente, fotov,estadovehiculo, idu, asientos) VALUES (?,?,?,?,?,?)',[modelo, patente, fotov, estadovehiculo, idu, asientos]).then(res=>{
      this.buscarVehiculo();
    })
  }

  updateConduc(auto : any, idusuario : any){
    return this.database.executeSql('UPDATE usuario SET auto = ? WHERE idusuario = ?', [auto, idusuario]).then(res => {
      this.buscarUsuario();
    })
  }

  detalleFiltradoUsuario(idtrecorrido: any){
    return this.database.executeSql('SELECT * FROM detalle WHERE idtrecorrido= ?', [idtrecorrido]).then(res => {
      let items: Detalle[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            iddetalle: res.rows.item(i).iddetalle,
            calificaciond: res.rows.item(i).calificaciond,
            idtablau: res.rows.item(i).idtablau,
            idtrecorrido: res.rows.item(i).idtrecorrido,
            nombreCliente: res.rows.item(i).nombreCliente,
            apellidoCliente: res.rows.item(i).apellidoCliente
          })
        }
      }
      this.listaDetalleFiltrado.next(items as any);
    })
  }

   detalleUsuario(idtrecorrido: any){
    return this.database.executeSql('SELECT * FROM detalle WHERE idtablau= ?', [idtrecorrido]).then(res => {
      let items: Detalle[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            iddetalle: res.rows.item(i).iddetalle,
            calificaciond: res.rows.item(i).calificaciond,
            idtablau: res.rows.item(i).idtablau,
            idtrecorrido: res.rows.item(i).idtrecorrido,
            nombreCliente: res.rows.item(i).nombreCliente,
            apellidoCliente: res.rows.item(i).apellidoCliente
          })
        }
      }
      this.listaDetalleFiltrado.next(items as any);
    })
  }
  //  Obtiene datos del usuario al iniciar sesion -> storage
  datosUsuario(idUsuario: number): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE idusuario = ?', [idUsuario])
      .then((res) => {
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0);
          return {
            idusuario: usuario.idusuario,
            rutusuario: usuario.rutusuario,
            nombreusuario: usuario.nombreusuario,
            apellidousuario: usuario.apellidousuario,
            correoUsuario: usuario.correoUsuario,
            telefono: usuario.telefono,
            fotousuario: usuario.fotousuario,
            idtablarol: usuario.idtablarol,
            contra: usuario.contra,
            status: usuario.status,
            respuesta : usuario.respuesta,
            auto : usuario.auto,
            preguntaselect: usuario.preguntaselect
          } as Usuario;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        return null;
      });
  }
  //    datos del usuario mediante un fetch

  datoV(idu : any){
    return this.database.executeSql('SELECT * FROM vehiculo WHERE idu = ?', [idu]).then(res => {
      let items: Vehiculo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idv: res.rows.item(i).idv,
            modelovehiculo: res.rows.item(i).modelovehiculo,
            patente : res.rows.item(i).patente,
            fotov: res.rows.item(i).fotov,
            estadovehiculo : res.rows.item(i).estadovehiculo,
            idu: res.rows.item(i).idu,
            asientos: res.rows.item(i).asientos
          })
        }
      }
      this.listaVehiculoUno.next(items as any);
    })
  }

  //                    ADMIN

  deleteUsuario(idusuario : any){
    return this.database.executeSql('DELETE FROM usuario WHERE idusuario = ?',[idusuario]).then(res =>{
      this.buscarUsuario();
    })
  }

  bloquearUsuario(status : any, idusuario: any){
    return this.database.executeSql('UPDATE usuario SET status = ? WHERE idusuario = ?',[status, idusuario]).then(res=>{
      this.buscarUsuario();
    })
  }

  editarStatus(idtablarol : any, idusuario : any){
    return this.database.executeSql('UPDATE usuario SET idtablarol = ? WHERE idusuario = ?',[idtablarol, idusuario]).then(res=>{
      this.buscarUsuario();
    })
  }

  desbloquearStatus(status : any, idusuario : any){
    return this.database.executeSql('UPDATE usuario SET status=? WHERE idusuario = ?',[status, idusuario]).then(res=>{
      this.buscarUsuario();
    })
  }

  listUsers(idtablarol : any) {
    return this.database.executeSql('SELECT * FROM usuario WHERE idtablarol = ?', [idtablarol]).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idusuario: res.rows.item(i).idusuario,
            rutusuario: res.rows.item(i).rutusuario,
            nombreusuario: res.rows.item(i).nombreusuario,
            apellidousuario: res.rows.item(i).apellidousuario,
            correoUsuario: res.rows.item(i).correoUsuario,
            telefono: res.rows.item(i).telefono,
            fotousuario: res.rows.item(i).fotousuario,
            idtablarol: res.rows.item(i).idtablarol,
            contra: res.rows.item(i).contra,
            status : res.rows.item(i).status,
            respuesta : res.rows.item(i).respuesta,
            auto : res.rows.item(i).auto,
            preguntaselect: res.rows.item(i).preguntaselect
          })
        }
      }
      this.listarUserUsuario.next(items as any);
    })
  }

  buscarRolSeleccionado(id:any) {
    return this.database.executeSql('SELECT * FROM rol WHERE idrol = ?', [id]).then(res => {
      let items: Rol[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idrol: res.rows.item(i).idrol,
            nombrerol: res.rows.item(i).nombrerol
          })
        }
      }
      this.rolSeleccionado.next(items as any);
    })
  }



  //                      LOGICA DE LA BD Y CREACION JUNTO A LOS INSERTS

  crearDB() {
    //Verificar si la plataforma esta lista
    this.platform.ready().then(() => {
      //crear la DB
      this.sqlite.create({
        name: 'bdgtripTrec3y43ss3.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardo la conexion a db en la variablet
        this.database = db;
        //llamo a la creacion de la tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert("Error en crear DB: " + e);

      })
    })
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: '',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async crearTablas() {
    try {
      //creamos las tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaSede, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaPregunta, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaVehiculo, []);
      await this.database.executeSql(this.tablaRecorrido, []);
      await this.database.executeSql(this.tablaDetalle, []);

      //creamos los registros iniciales
      await this.database.executeSql(this.registroRolAdm, []);//Rol ADMIN
      await this.database.executeSql(this.registroRolUs, []);// ROL Usuario
      await this.database.executeSql(this.registroRolCon, []);//ROL USUARIO
      await this.database.executeSql(this.registroComuna, []);
      await this.database.executeSql(this.registroComuna2, []);
      await this.database.executeSql(this.registroComuna3, []);
      await this.database.executeSql(this.registroSede, []);
      await this.database.executeSql(this.registroSede, []);
      await this.database.executeSql(this.registroSede2, []);
      await this.database.executeSql(this.registroSede3, []);

      await this.database.executeSql(this.registroPregunta, []);
      await this.database.executeSql(this.registroPreguntaDos, []);
      await this.database.executeSql(this.registroPreguntaTres, []);
   
 
      await this.database.executeSql(this.registroUsuario, []);
      //await this.database.executeSql(this.registroVehiculo, []);
      //await this.database.executeSql(this.registroDetalle, []);
      

      //actualizamos el observable de la db
      this.isDBReady.next(true);

      this.buscarRol();
      this.buscarComuna();
      this.buscarSede();
      this.buscarPregunta();
      this.buscarUsuario();
      this.buscarVehiculo();
      this.buscarRecorrido();
      this.buscarDetalle();

    } catch (e) {
      this.presentAlert("Error en crear tablas:" + e);
    }
  }

  crearViaje(descripcionr: any, idtsede: any, idtcomuna: any, valor: any, asientos: any, rutusuario: any, hora: any) {
    return this.database
      .executeSql('SELECT idusuario FROM usuario WHERE rutusuario = ?', [rutusuario])
      .then(userData => {
        if (userData.rows.length > 0) {
          const idusuario = userData.rows.item(0).idusuario;
  
          return this.database.executeSql(
            'INSERT INTO recorrido (descripcionr, idtsede, idtcomuna, valor, asientos, idusuario, rutusuario, hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [descripcionr, idtsede, idtcomuna, valor, asientos, idusuario, rutusuario, hora]
          ).then(res => {
            this.buscarRecorrido();
          });
        } else {
          console.error('No se encontró el usuario con el rut proporcionado.');
          return Promise.resolve(null); // Devolver una promesa resuelta con valor nulo.
        }
      })
      .catch(error => {
        console.error('Error al crear el viaje:', error);
        return Promise.reject(error); // Devolver una promesa rechazada en caso de error.
      });
  }
  
  
  buscarSedePorNombre(nombreSede: string) {
    // Implementa la consulta SQL para buscar la sede por nombre y devuelve la sede.
    return this.database.executeSql('SELECT * FROM sede WHERE nombresede  = ?', [nombreSede]).then((result) => {
      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    });
  }

  buscarComunaPorNombre(nombreComuna: string) {
    // Implementa la consulta SQL para buscar la comuna por nombre y devuelve la comuna.
    return this.database.executeSql('SELECT * FROM comuna WHERE nombrecomuna = ?', [nombreComuna]).then((result) => {
      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    });
  }
  
  obtenerUsuarioPorRut(rutusuario: string): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE rutusuario = ?', [rutusuario])
      .then((res) => {
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0);
          return {
            idusuario: usuario.idusuario,
            rutusuario: usuario.rutusuario,
            nombreusuario: usuario.nombreusuario,
            apellidousuario: usuario.apellidousuario,
            correoUsuario: usuario.correoUsuario,
            telefono: usuario.telefono,
            fotousuario: usuario.fotousuario,
            idtablarol: usuario.idtablarol,
            contra: usuario.contra,
          } as Usuario;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por rut:', error);
        return null;
      });
  }
 // Función para obtener los recorridos filtrados por sede y comuna
  getRecorridosFiltrados(idSede: number, idComuna: number): Promise<Recorrido[]> {
    let sql = 'SELECT * FROM recorrido WHERE 1';

    if (idSede) {
      sql += ' AND idtsede = ?'; // Filtra por la sede si se selecciona una.
    }

    if (idComuna) {
      sql += ' AND idtcomuna = ?'; // Filtra por la comuna si se selecciona una.
    }

    const params = [idSede, idComuna].filter(param => param !== undefined); 

    return this.database
      .executeSql(sql, params)
      .then(res => {
        const recorridos: Recorrido[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          const recorrido = res.rows.item(i);
          recorridos.push({
            idrecorrido: recorrido.idrecorrido,
            descripcionr: recorrido.descripcionr,
            idtsede: recorrido.idtsede,
            idtcomuna: recorrido.idtcomuna,
            valor: recorrido.valor,
            asientos: recorrido.asientos,
            rutusuario: recorrido.rutusuario,
            hora: recorrido.hora
          });
        }
        return recorridos;
      })
      .catch(error => {
        console.error('Error al obtener los recorridos:', error);
        return [];
      });
  }

  eliminarRecorrido(idRecorrido: number): Promise<void> {
    return this.database.executeSql('DELETE FROM recorrido WHERE idrecorrido = ?', [idRecorrido])
      .then(() => {
        this.buscarRecorrido(); // Actualiza la lista de recorridos después de la eliminación.
      })
      .catch(error => {
        console.error('Error al eliminar el recorrido:', error);
        return Promise.reject(error); // Devuelve una promesa rechazada en caso de error.
      });
  }

  cancelarViaje(idRecorrido: number): Promise<void> {
    return this.database.executeSql('UPDATE recorrido SET asientos = asientos + 1 WHERE idrecorrido = ?', [idRecorrido])
      .then(() => {
        this.buscarRecorrido(); // Actualizar la lista de viajes después de tomar uno.
      });
  }

  tomarViaje(idRecorrido: number): Promise<void> {
    return this.database.executeSql('UPDATE recorrido SET asientos = asientos - 1 WHERE idrecorrido = ?', [idRecorrido])
      .then(() => {
        this.buscarRecorrido(); // Actualizar la lista de viajes después de tomar uno.
      });
  }

  CrearDetalle(calificaciond: any, idtablau: any, idtrecorrido: any, nombreCliente: any, apellidoCliente: any ){
  return this.database.executeSql('INSERT or IGNORE INTO detalle (calificaciond, idtablau, idtrecorrido, nombreCliente, apellidoCliente) VALUES  (?,?,?,?,?)', [calificaciond,idtablau, idtrecorrido, nombreCliente, apellidoCliente]).then(res=>{
    this.buscarDetalle();
    this.buscarUsuario();
    this.buscarRecorrido();
  })
  }
  //Funcion de modificar contra
  modificarContrasena(idUsuario: number, nuevaContrasena: string): Promise<boolean> {
    return this.database
      .executeSql('UPDATE usuario SET contra = ? WHERE idusuario = ?', [nuevaContrasena, idUsuario])
      .then(() => {
        // Contraseña modificada con éxito
        return true;
      })
      .catch((error) => {
        console.error('Error al modificar la contraseña:', error);
        return false; // Hubo un error al modificar la contraseña
      });
  }
  obtenerUsuarioPorId(idUsuario: number): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE idusuario = ?', [idUsuario])
      .then((res) => {
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0);
          return {
            idusuario: usuario.idusuario,
            rutusuario: usuario.rutusuario,
            nombreusuario: usuario.nombreusuario,
            apellidousuario: usuario.apellidousuario,
            correoUsuario: usuario.correoUsuario,
            telefono: usuario.telefono,
            fotousuario: usuario.fotousuario,
          } as Usuario;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        return null;
      });
  }

  // Cambia el tipo de retorno de la función
getCantidadAsientos(idUsuario: any): Promise<number | null> {
  return this.database.executeSql('SELECT asientos FROM vehiculo WHERE idu = ?', [idUsuario])
    .then((res) => {
      if (res.rows.length > 0) {
        const vehiculo = res.rows.item(0);
        const asientos = vehiculo.asientos;

        return asientos; // Devuelve directamente el número de asientos
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error('Error al obtener los asientos por ID:', error);
      return null;
    });
}





}