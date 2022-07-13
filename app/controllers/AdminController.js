"use strict";

const adminService = require("../services/AdminService");
const response = require("../utils/responses");

exports.createAsync = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await adminService.CreateAsync(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};