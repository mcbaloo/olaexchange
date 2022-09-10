"use strict";

const transactionService = require("../services/TransactionService");
const response = require("../utils/responses");

exports.createAsync = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await transactionService.CreateAsync(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};