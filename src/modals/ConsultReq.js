const mongoose = require('mongoose');

const ConsultReq = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    help: {
        type: String,
    }
})

module.exports = mongoose.model("consult", ConsultReq);