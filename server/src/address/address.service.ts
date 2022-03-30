import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "./address.entity";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ) { }
    async addAddress(addressLine1: string, addressLine2: string | null, city: string, country: string, zipcode: string, mobile: number) {
        try {
            const response = await this.addressRepository.insert({
                addressLine1,
                addressLine2,
                city,
                country,
                zipcode,
                mobile,
                user: null
            })
            return true;
        } catch (err) {
            console.log('error adding in address with message: ', err.message);
            return false;
        }
    }
}   