export class User{
    constructor(
        public userId?:number,
        public name?: string,
        public email?: string,
        public password?: string,
        public DOB?: Date,
        public currentCompany?: string,
        public address?: string,
        public domain?: string,
        public profilePhoto?:string,
        public skills?: string[]
    ) {}
}