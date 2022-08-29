"use strict";

const rateService = require("../services/ExchangeRateService");
const response = require("../utils/responses");

exports.createAsync = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await rateService.CreateAsync(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getRates = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await rateService.getExchangeRates()

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getRate = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await rateService.getExchangeRate(req.params.id);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
exports.updateRate = async (req, res) => {
    const {
       error,
       data,
       statusCode
    } = await rateService.updateRate(req.body);
    
    if(error) return response.error(res, error, statusCode);
 
  return response.success(res, data, statusCode);
 };