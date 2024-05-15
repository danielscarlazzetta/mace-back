import { IsNotEmpty, IsString, Length } from "@nestjs/class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nameTags: string;
}
