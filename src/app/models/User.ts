export class User {
    constructor(
      public id: number,
      public name: string,
      public lastname: string,
      public email: string,
      public birthDate: Date,
      public scholarityId: number,
      public file: any,
      public schoolRecords?: SchoolRecords
    ) { }
}
export class SchoolRecords  {
    constructor(
        public id: number,
        public name: string,
        public format: string,
        public path: string
    ) {}
}