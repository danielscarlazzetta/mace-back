import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nameProduct: string;

    @Column({ length: 100 })
    descriptionProduct: string;

    @Column({ type: 'bigint', nullable: false })
    priceSellProduct: number;

    @Column({ type: 'bigint', nullable: false })
    amountProduct: number;
    
    @Column({ length: 50 })
    dateCreateProduct: string;

    @Column("simple-array", { nullable: true })
    imageUrl: string[];

}
