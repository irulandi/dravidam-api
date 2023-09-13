
const jwtToken = require("../authorization/verifyToken");

module.exports = router => {
    router.use('/api/adminMaster', require('./admin/admin'));
    router.use('/api/reg_otp', require('./register/register'));
    router.use('/api/visitorCount', require('./register/visitor'));
    router.use('/api/scorSummary', [jwtToken.verifyToken] , require('./score/scoreSummary'));
    router.use('/api/questionBank', [jwtToken.verifyToken] , require('./question/question'));
    router.use('/api/partner', [jwtToken.verifyToken] , require('./partner/partner'));
    router.use('/api/district', [jwtToken.verifyToken] , require('./district/district'));
    router.use('/api/preRegister', require('./preregister/preregister'));
    return router;
}