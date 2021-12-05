const mongoose = require('mongoose');

const MasterDataSchema = mongoose.Schema({
    row_hash: {
        type: String,
        required: true,
    },
    agency_name: {
        type: String,
        required: true,
    },
    occurred_date: {
        type: String,
        required: true,
    },
    offense_category: {
        type: String,
        required: true,
    }, 
    top_local_classification: {
        type: String,
        required: true,
    },
    case_status: {
        type: String,
        required: true,
    }
})



MasterDataSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

MasterDataSchema.set('toJSON', {
    virtuals: true,
});

exports.MasterData = mongoose.model('Users', MasterDataSchema);
