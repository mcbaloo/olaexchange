"use strict";

class BaseDbRepository{
    constructor(Model){
        this.Model = Model;
    }

    getModel(){
        return this.Model;
    }

    create(payload) {
        return this.Model.create(payload);
    }

    findById(id) {
        return this.Model.findOne({_id: id});
    }

    findOne(condition, sort = {}, options = {}) {
        const query =  this.Model.findOne(condition).sort(sort);

        if(options.lean) return query.lean();

        return query;
    }

    deleteMany(condition = {}){
        return this.Model.deleteMany(condition);
    }

    insertMany(data = []) {
        if (data.length === 0)
            return [];

        return this.Model.insertMany(data);
    }

    updateMany(query = {}, newData = {}) {
        return this.Model.updateMany(query, newData);
    }

    upsert(query = {}, newData = {}) {
        return this.Model.update(query, newData, {
            upsert: true,
            setDefaultsOnInsert: true
        });
    }

    findOneAndUpdate(filter, update, options = {}){
        return this.Model.findOneAndUpdate(filter, update, {
            new: true
        });
    }

    countDocuments(condition = {}){
        return this.Model.countDocuments(condition);
    }

}

module.exports =  BaseDbRepository;