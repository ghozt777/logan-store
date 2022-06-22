import { Field, InputType } from "@nestjs/graphql";

@InputType()
class VariantPropsDTO {
    @Field(() => String)
    variantName: string;

    @Field(() => Number)
    priceIncrement: number;
};

@InputType()
export class VariantsDTO {
    @Field(() => String)
    property: string;

    @Field(() => [VariantPropsDTO])
    variants: VariantPropsDTO[]
};