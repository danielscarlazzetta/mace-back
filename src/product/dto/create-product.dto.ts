import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, Length, isString } from "@nestjs/class-validator";


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nameProduct: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descriptionProduct: string;

    @IsNumber()
    @IsNotEmpty()
    priceSellProduct: number;

    @IsNumber()
    @IsNotEmpty()
    amountProduct: number;

/*    @IsString()
    dateCreateProduct?: string;*/

    @IsArray()
    @IsString({ each: true }) // Para validar que cada elemento del array sea una string
    imageUrls?: string[];

}
