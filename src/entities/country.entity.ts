import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Country {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  emoji: string;

  @Column()
  @Field()
  continentCode: string;
}

@InputType()
export class CountryCreateInput {
   @Field()
   name: string;

   @Field()
   code: string;

   @Field()
   emoji: string;

   @Field()
   continentCode: string;
}
