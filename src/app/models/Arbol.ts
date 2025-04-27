export class Arbol{

    //Atributos

    
    //Constructor
    constructor(
    public especie : string,
    public cantidad : number,
    public idPlantacion?: string
    ){
    }

    //Metodos
    public getCantidadArboles() : number {
        return this.cantidad;
    }

    clone(): Arbol {
        return new Arbol(this.especie, this.cantidad, this.idPlantacion);
      }
}