"use strict";

exports.success = (res, data, code = 200) => {
    return res.status(code).json({data});
};

exports.error = (res, error = "Oops. An Error Occurred", code = 500) => {
    res.response = error;

    return res.status(code).json({
        error
    });
};