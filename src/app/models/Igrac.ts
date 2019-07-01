import { Tim } from './tim';
import { Nacionalnost } from './nacionalnost';

export class Igrac {
    id: number;
    ime: string;
    prezime: string;
    broj_reg: string;
    datum_rodjenja: Date;
    nacionalnost: Nacionalnost;
    tim: Tim;
}