import { IsInt, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 50 })
    apePaterno: string;

    @Column({ length: 50 })
    apeMaterno: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 12 })
    telefono: string;

    @Column({ length: 100 })
    region: string;

    @Column({ length: 100 })
    comuna: string;

    @Column({ length: 100 })
    calle: string;

    @Column({ length: 50 })
    departamento: string;

    @Column()
    @IsInt()
    @Min(0)
    @Max(99999)
    numero: number;
    
    @Column({ length: 50 })
    dateCreateProduct: string;
}
