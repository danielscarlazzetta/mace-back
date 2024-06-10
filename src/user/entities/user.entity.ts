import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 100 })
    apePaterno: string;

    @Column({ length: 100 })
    apeMaterno: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100 })
    telefono: string;

    @Column({ length: 100 })
    calle: string;

    @Column({ length: 100 })
    departamento: string;

    @Column({ length: 100 })
    numero: string;
    
}
