export class User {
    constructor(
      public id: number,
      public nome: string,
      public sobrenome: string,
      public email: string,
      public dataNascimento: Date,
      public esolaridadeId: number,
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