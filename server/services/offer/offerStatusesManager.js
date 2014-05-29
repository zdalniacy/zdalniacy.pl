"use strict";

var statuses = ["WAITING_FOR_APPROVAL", "APPROVED", "WAITING_FOR_PAYMENT", "PAID", "CANCELED", "EXPIRED"];

function getStatuses() {
  return statuses;
}

var statusesWorkflow = {
  "WAITING_FOR_APPROVAL": "APPROVED"
};

function getNextStatus(currentStatus) {
  return statusesWorkflow[currentStatus];
}

module.exports.getStatuses = getStatuses;
module.exports.getNextStatus = getNextStatus;