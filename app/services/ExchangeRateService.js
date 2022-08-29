"use strict";

const exchangeRateRepository = require("../repositories/ExchangeRateRepository");
const exchangeValidator = require("../validators/ExchangeValidator");
const Constants = require("../utils/Constants");
const response = require("../utils/Constants");

exports.CreateAsync = async (payload) => {
   const validator = exchangeValidator.validateSchema(payload);
        if (validator) return {
            error: validator,
            statusCode: 422
        };
    
    payload.dateCreated =  new Date();
    const exchangeRate = await exchangeRateRepository.
          findOne({$and:[{fromCurrency:payload.fromCurrency},{toCurrency:payload.toCurrency}]});

    if (exchangeRate) {
        return {error: Constants.Messages.DUPLICATE};
    }
    await exchangeRateRepository.create(payload);
    return {
        data: true,
        statusCode: 201
    };
};
exports.getExchangeRates = async () => {
    const rates = await exchangeRateRepository.Model.find();
    return {
        data: rates,
        statusCode:200
    };
};
exports.getExchangeRate = async (id) => {
 const rate = await exchangeRateRepository.findById(id);
 return{
    data:rate,
    statusCode: 201
 };
};
exports.updateRate = async (payload) => {
    const validator = exchangeValidator.validateUpdateSchema(payload);
    if(validator){
        return{
            error: validator,
            statusCode: 422
        }
    }
    const rate = await exchangeRateRepository.findById( payload.id);
    if(!rate){
        return{
            error: response.Messages.NOTFOUND,
            statusCode: 404
        }
    }
    if(payload.fromCurrency != rate.fromCurrency && payload.toCurrency != rate.toCurrency){
    const duplicaterate = await exchangeRateRepository.
    findOne({$and:[{fromCurrency:payload.fromCurrency},{toCurrency:payload.toCurrency}]});

    if (duplicaterate) {
        return {error: Constants.Messages.DUPLICATE};
    }
    }
    rate.toCurrency = payload.toCurrency
    rate.fromCurrency = payload.fromCurrency
    rate.conversionRate = payload.conversionRate
    await exchangeRateRepository.upsert({_id:rate._id}, rate);

    return {
        data: true,
        statusCode: 201
    }
}
