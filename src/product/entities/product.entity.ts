import { IsInt, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nameProduct: string;

    @Column({ length: 100 })
    descriptionProduct: string;

    @Column({ type: 'bigint', nullable: false })
    @IsInt()
    @Min(0)
    @Max(99999999)
    priceSellProduct: number;

    @Column({ type: 'bigint', nullable: false })
    @IsInt()
    @Min(0)
    @Max(99999999)
    amountProduct: number;
    
    @Column({ length: 50 })
    dateCreateProduct: string;

    @Column("simple-array", { nullable: true })
    imageUrl: string[];

}
