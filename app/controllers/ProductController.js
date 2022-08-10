"use strict";

const productService = require("../services/ProductService");
const response = require("../utils/responses");

exports.createAsync = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await productService.CreateAsync(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getActiveProducts = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await productService.getActiveProducts();

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
exports.getProducts = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await productService.getProducts();

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getProduct = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await productService.getProduct(req.params.id);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
exports.updateProduct = async (req, res) => {
    const {
       error,
       data,
       statusCode
    } = await productService.updateProduct(req.body);
    
    if(error) return response.error(res, error, statusCode);
 
  return response.success(res, data, statusCode);
 };