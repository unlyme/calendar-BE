import {
  IsEmail,
  IsString,
  NotContains,
  MinLength,
  MaxLength,
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for creating users
 */
class CreateUserDto {
  @IsString()
  public name: string;
  
  @IsEmail()
  public email: string;
  
  @IsString()
  @MinLength(8)
  @MaxLength(48)
  @NotContains(" ", { message: "No spaces allowed" } )
  public password: string;
}

export default CreateUserDto;
