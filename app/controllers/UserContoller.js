"use strict";

const userService = require("../services/UserService");
const response = require("../utils/responses");

exports.createAsync = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await userService.CreateAsync(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getUsers = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await userService.getUsers();

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getUser = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await userService.getUser(req.params.id);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};