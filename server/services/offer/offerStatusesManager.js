"use strict";
var _ = require('lodash');

var statusesEnum = {
    WAITING_FOR_APPROVAL: "WAITING_FOR_APPROVAL",
    APPROVED: "APPROVED",
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
    PAID: "PAID",
    CANCELED: "CANCELED",
    EXPIRED: "EXPIRED"
};

function getStatuses() {
    return _.map(statusesEnum, function (e) {
        return e;
    });
}

var statusesWorkflow = {
    "WAITING_FOR_APPROVAL": "APPROVED"
};

function getNextStatus(currentStatus) {
    return statusesWorkflow[currentStatus];
}

function isApproved(status) {
    return status == statusesEnum.APPROVED;
}

module.exports.getStatuses = getStatuses;
module.exports.getNextStatus = getNextStatus;
module.exports.isApproved = isApproved;