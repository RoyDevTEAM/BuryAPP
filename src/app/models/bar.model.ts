export class Bar {
  ID: number;
  Nombre: string;
  Descripcion?: string;
  Ubicacion?: string;
  Telefono?: string;
  LogoURL?: string; // Nuevo campo para la URL del logo
  Categoria_ID?: number; // Nuevo campo para la relación con la categoría

  constructor(
    ID: number,
    Nombre: string,
    Descripcion?: string,
    Ubicacion?: string,
    Telefono?: string,
    LogoURL?: string, // Incluyendo el nuevo campo en el constructor
    Categoria_ID?: number // Incluyendo el nuevo campo en el constructor
  ) {
    this.ID = ID;
    this.Nombre = Nombre;
    this.Descripcion = Descripcion;
    this.Ubicacion = Ubicacion;
    this.Telefono = Telefono;
    this.LogoURL = LogoURL; // Asignando el nuevo campo
    this.Categoria_ID = Categoria_ID; // Asignando el nuevo campo
  }
}
