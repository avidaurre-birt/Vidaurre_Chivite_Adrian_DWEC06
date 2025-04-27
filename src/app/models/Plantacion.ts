import { Arbol } from "./Arbol";

export class Plantacion{

    constructor(
        public ubicacion : string,
        public fecha : string,
        public participantes : number,
        public id? : string,
        public trees: Arbol[] = []
    ){}

    clone(): Plantacion {
        return new Plantacion(
          this.ubicacion,
          this.fecha,
          this.participantes,
          this.id,
          this.trees.map(a => a.clone())
        );
      }
}