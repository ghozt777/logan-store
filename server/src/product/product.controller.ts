import { Controller, Get } from "@nestjs/common";

@Controller('/products')
export class ProductController {
    constructor() { }

    @Get('/')
    helloFromProducts() {
        return {
            success: true,
            message: "Hello From Products Route"
        }
    }
}