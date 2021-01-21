const orm = require("../config/orm");

const burger = {
    select: function (cb) {
        orm.select("burgers", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("burgers", condition, (res) => {
            cb(res);
        });
    }
}

module.exports = burger
