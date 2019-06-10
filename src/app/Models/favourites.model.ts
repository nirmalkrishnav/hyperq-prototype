export class Favourites {
    Doctors: Doctor[];
    Hospitals: Hospitals[];
}
export class Doctor {
    id: number;
    name: string;
    rating: number;
    address: string;
    phone: string;
}

export class Hospitals {
    id: number;
    name: string;
    rating: number;
    address: string;
    phone: string;
}
