export class Usuario {
    id: number;
    name: string;  // Cambiado de nombre a name
    email: string;
    password: string;  // Cambiado de contraseña a password
  
    constructor(id: number, name: string, email: string, password: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }
  