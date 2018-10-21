// export interface Players {
//     country: string;
//     id: number;
//     name: string;
//     photo: string;
//     role: string;
// }

export class Players {
    country: string;
    index: number;
    name: string;
    photo: string;
    role: string;

    constructor(country: string, index: number, name: string, photo: string, role: string) {
        this.name = name;
        this.index = index;
        this.country = country;
        this.photo = photo;
        this.role = role;
      }
}