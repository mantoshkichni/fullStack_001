export class User{
    constructor(
        public userId?:number,
        public name?: string,
        public email?: string,
        public password?: string,
        public DOB?: Date,
        public address?: string,
        public currentCompany?: string,
        public domain?: string,
        public skills?: string[]
    ) {}
}