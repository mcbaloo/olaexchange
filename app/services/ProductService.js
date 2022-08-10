"use strict";

const productRepository = require("../repositories/ProductRepository");
const productValidator = require("../validators/ProductValidator");
const Constants = require("../utils/Constants");
const utils = require("../utils/Helpers");
const response = require("../utils/Constants");

exports.CreateAsync = async (payload) => {
   const validator = productValidator.validateSchema(payload);
        if (validator) return {
            error: validator,
            statusCode: 422
        };
    
    payload.dateCreated =  new Date();
    payload.isActive = 1
    payload.currency = Constants.Config.DEFAULTCURRENCY
    const product = await productRepository.findOne({productName:payload.productName});

    if (product) {
        return {error: Constants.Messages.DUPLICATE};
    }
    await productRepository.create(payload);
    return {
        data: true,
        statusCode: 201
    };
};

exports.getActiveProducts = async () => {
    const products = await productRepository.Model.find({isActive : true});
    return {
        data: products,
        statusCode:200
    };
};
exports.getProducts = async () => {
    const products = await productRepository.Model.find();
    return {
        data: products,
        statusCode:200
    };
};
exports.getProduct = async (id) => {
 const product = await productRepository.findById(id);
 return{
    data:product,
    statusCode: 201
 };
};
exports.updateProduct = async (payload) => {
    const validator = productValidator.validateProductUpdate(payload);
    if(validator){
        return{
            error: validator,
            statusCode: 422
        }
    }
    const product = await productRepository.findById( payload.id);
    if(!product){
        return{
            error: response.Messages.NOTFOUND,
            statusCode: 404
        }
    }
    if(payload.productName != product.productName){
    const duplicateProduct = await productRepository.findOne({productName:payload.productName});

    if (duplicateProduct) {
        return {error: Constants.Messages.DUPLICATE};
    }
    }
   product.productName = payload.productName
   product.unitPrice = payload.unitPrice
   product.isActive = payload.isActive

    await productRepository.upsert({_id:product._id}, product);

    return {
        data: true,
        statusCode: 201
    }
}
