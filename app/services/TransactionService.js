"use strict";
require("dotenv").config();
const transactionRepository = require("../repositories/TransactionRepository");
const productService = require("../services/ProductService");
const userService = require("../services/UserService");
const rateService = require("../services/ExchangeRateService");
const transactionValidator = require("../validators/TransactionValidator");
const Constants = require("../utils/Constants");
const utils = require("../utils/Helpers");
const response = require("../utils/Constants");

exports.CreateAsync = async (payload) => {
   const validator = transactionValidator.validateSchema(payload);
        if (validator) return {
            error: validator,
            statusCode: 422
        };
   let transaction = {
    product : {},
    manager : {}
   };
   transaction.unit = payload.unit
   transaction.dateCreated  = new Date()
   transaction.transactionType = payload.transactionType
   transaction.status = Constants.TransactionStatus.SUBMITTED
   const rate = await rateService.getExchangeRate(payload.exchangeRateId)
   if(rate.data == null){
    return{
        error: `Rate ${response.Messages.RECORDNOTFOUND}`,
        statusCode: 404
    }
   }
   const requester = await userService.getUser(payload.userId)
   if(requester.data == null){
    return{
        error:  `User ${response.Messages.RECORDNOTFOUND}`,
        statusCode: 404
    }
   }
    const product = await productService.getProduct(payload.productId);
   if(product.data == null) {
    return{
        error: `Product ${response.Messages.RECORDNOTFOUND}`,
        statusCode: 404
    }
   }
    const user = await userService.getUser(payload.managerId)
    
    if(user.data == null){
        return{
            error: `${response.Messages.NOTFOUND}(Invalid Manager)`,
            statusCode: 404
        }
    }
    if(user?.data?.role[0]?.toLowerCase() != process.env.MANAGER || user.data.role[0] === undefined){
        return{
            error: `${response.Messages.NOTFOUND}(Invalid Manager)`,
            statusCode: 404
        } 
    }
    transaction.userId = payload.userId
     transaction.exchangeRate = rate.data.conversionRate
     transaction.product.productName = product.data.productName
     transaction.product.unitPrice = product.data.unitPrice
      transaction.manager.id = user.data._id
      transaction.manager.lastName = user.data.lastname 
     transaction.manager.firstName = user.data.firstname
     transaction.currency = rate.data.toCurrency
     transaction.amount = product.data.unitPrice * payload.unit * rate.data.conversionRate
      let data = await transactionRepository.create(transaction);
    return {
        data: data,
        statusCode: 201
    };
};

// exports.getActiveProducts = async () => {
//     const products = await productRepository.Model.find({isActive : true});
//     return {
//         data: products,
//         statusCode:200
//     };
// };
// exports.getProducts = async () => {
//     const products = await productRepository.Model.find();
//     return {
//         data: products,
//         statusCode:200
//     };
// };
// exports.getProduct = async (id) => {
//  const product = await productRepository.findById(id);
//  return{
//     data:product,
//     statusCode: 201
//  };
// };
// exports.updateProduct = async (payload) => {
//     const validator = productValidator.validateProductUpdate(payload);
//     if(validator){
//         return{
//             error: validator,
//             statusCode: 422
//         }
//     }
//     const product = await productRepository.findById( payload.id);
//     if(!product){
//         return{
//             error: response.Messages.NOTFOUND,
//             statusCode: 404
//         }
//     }
//     if(payload.productName != product.productName){
//     const duplicateProduct = await productRepository.findOne({productName:payload.productName});

//     if (duplicateProduct) {
//         return {error: Constants.Messages.DUPLICATE};
//     }
//     }
//    product.productName = payload.productName
//    product.unitPrice = payload.unitPrice
//    product.isActive = payload.isActive

//     await productRepository.upsert({_id:product._id}, product);

//     return {
//         data: true,
//         statusCode: 201
//     }
//}
