import { IsEmail, IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(1, 50)
    nombre: string;

    @IsString()
    @Length(1, 50)
    apePaterno: string;

    @IsString()
    @Length(1, 50)
    apeMaterno: string;

    @IsEmail()
    @Length(1, 100)
    email: string;

    @IsString()
    @Length(1, 12)
    telefono: string;

    @IsString()
    @Length(1, 100)
    region: string;

    @IsString()
    @Length(1, 100)
    comuna: string;

    @IsString()
    @Length(1, 100)
    calle: string;

    @IsString()
    @Length(1, 50)
    departamento: string;

    @IsInt()
    @Min(0)
    @Max(99999)
    numero: number;
}
