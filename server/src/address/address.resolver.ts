import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { Float } from "type-graphql";
import { Address } from "./address.entity";
import { AddressService } from "./address.service";

@Resolver(() => Address)
export class AddressResolver {
    constructor(
        private addressService: AddressService
    ) { }

    @Mutation(() => Boolean)
    async addAddress(
        @Args({ type: () => String, name: 'addressLine1' }) addressLine1: string,
        @Args({ type: () => String, name: 'addressLine2', nullable: true }) addressLine2: string | null,
        @Args({ type: () => String, name: 'city' }) city: string,
        @Args({ type: () => String, name: 'zipcode' }) zipcode: string,
        @Args({ type: () => String, name: 'country' }) country: string,
        @Args({ type: () => Float, name: 'mobile' }) mobile: number,
    ): Promise<Boolean> {
        const response = await this.addressService.addAddress(addressLine1, addressLine2, city, country, zipcode, mobile);
        return response;
    }
}