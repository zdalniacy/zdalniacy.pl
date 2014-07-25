"use strict";

var emailService = require('../infrastructure/emailService');
var views = require('co-views');
var rootPath = require('../../config/config').getConfig().rootPath;
var render = views(rootPath + '/server/views/emailViews', { ext: 'ejs' });

var cancelOffer = "/offer/cancel/";

function getCancelOfferUrl(options) {
    return options.context.getApplicationUrl() + cancelOffer + options.cancellationToken;
}

function getSendApprovedOfferEmailToAuthor(email, offerTitle, content) {
    return {
        to: email,
        subject: 'Oferta ' + offerTitle + ' została zatwierdzona',
        html: content
    };
}
/*
 title,
 email,
 cancellationToken
 */
function * sendApprovedOfferEmailToAuthor(options) {
    var content = yield render('approvedOfferEmailToAuthor', {
        title: options.title,
        cancellationUrl: getCancelOfferUrl(options)
    });
    var emailOptions = getSendApprovedOfferEmailToAuthor(options.email, options.title, content);
    yield emailService.sendNoReplyEmail(emailOptions);
}

function getNotifyModeratorsOfferWasApprovedOptions(offerTitle, content) {
    return {
        subject: 'Oferta ' + offerTitle + ' została zatwierdzona',
        html: content
    };
}

/*
 title
 */

function * notifyModeratorsOfferWasApproved(options) {
    var content = yield render('notifyOfferWasApproved', {
        title: options.title
    });
    var emailOptions = getNotifyModeratorsOfferWasApprovedOptions(options.title, content);
    yield emailService.sendEmailToModerators(emailOptions);
}

module.exports.sendApprovedOfferEmailToAuthor = sendApprovedOfferEmailToAuthor;
module.exports.notifyModeratorsOfferWasApproved = notifyModeratorsOfferWasApproved;