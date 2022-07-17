export class User {
    constructor(
      public id: number,
      public nome: string,
      public sobrenome: string,
      public dataNascimento: Date,
      public esolaridade: number,
      SchoolRecords
    ) { }
}
export class SchoolRecords  {
    constructor(
        public id: number,
        public nome: string,
        public formato: string,
        public caminho: string
    ) {}
}