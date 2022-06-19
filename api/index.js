const web = "/api/v1/web"
const api = {

    // -------------------------站点接口
    getSystemInfo: web + "/system/info",
    getSystemHome: web + "/system/home",
    getVipAndGrade: web + "/system/vipAndGrade",
    getSystemHotTag: web + "/system/hotTag",
    getSystemHotGroup: web + "/system/hotGroup",
    getSystemCate: web + "/system/cate",
    getSystemFilter: web + "/system/filter",
    getSystemHotSearch: web + "/system/hotSearch",
    getSystemHotUser: web + "/system/hotUser",
    getSystemSearch: web + "/system/search",
    getSystemEmoji: web + "/system/emoji",

    // -------------------------页面接口
    getPageInfo: web + "/page/info",


    // -------------------------autn 接口
    getImageCaptcha: web + "/auth/image/captcha",
    getOption: web + "/auth/option",
    sendCaptcha: web + '/auth/send/captcha',// 发送邮箱验证码
    postRegister: web + '/auth/register',// 用户注册
    postLogin: web + '/auth/login',// 用户登录
    postLogout: web + '/auth/logout',// 用户登出

    // -------------------------媒体 接口
    postuploadFile: web + "/upload",
    UploadChunk:  web +"/upload/chunk",
    mergeChunk:  web +"/upload/mergeChunk",

    // -------------------------用户账户 接口
    getAccountGroup: web + "/account/group", //获取认证信息
    getAccountFavorites: web + "/account/favorites", //获取用户收藏内容
    getAccountJoinEdu: web + "/account/join/edu", //获取用户加入的课程
    getAccountBuyPosts: web + "/account/buy/posts", //获取用户加入的课程
    getAccountInfo: web + "/account/info", //获取用户账户信息
    postAccountEdit: web +  "/account/edit", //设置用户账户基础信息
    getAccountSecurity: web + "/account/security", //获取用户账户绑定信息
    postAccountUpdatePassWord: web + "/account/update/password", //修改用户账户密码
    postAccountUpdateEmail: web + "/account/update/email", //修改用户邮箱
    getAccountBalance: web + "/account/balance", //获取用户账户余额
    getAccountVerifyStatusIsPayPrice: web + "/account/verify/statusAndIsPayAndPrice", //获取认证信息
    getAccountVerify: web + "/account/verify", //获取认证信息
    postAccountVerify: web + "/account/verify", //提交认证信息
    postAccountSign: web + "/account/sign", //获取用户是否签到
    // -------------------------用户账户 接口
    postUserFollow: web + "/user/follow", // 关注接口
    getUserInfo: web + "/user/info", //获取用户账户信息
    getUserPosts: web + "/user/posts", //获取内容列表
    getUserFansOrFollows: web + "/user/fansOrFollows", //获取用户粉丝列表
    getUserSign: web + "/user/sign", //用户签到
    getUserReward: web + "/user/reward", //获取用户关注列表
    

    // -------------------------通知接口
    getNoticeCount: web + "/notice/count",
    getNoticeList: web + "/notice/list",


    // -------------------------充值 接口
    getRechargeList: web + "/recharge/list",
    postRechargeCreate: web + "/recharge/create", //
    postRechargePay: web + "/recharge/pay",
    postRechargeCheckStatus: web + "/recharge/status", //创建订单 token

    // -------------------------订单 接口
    getOrderList: web + "/order/list",
    postOrderCreate: web + "/order/create", //
    postOrderPay: web + "/order/pay",
    postOrderCheckStatus: web + "/order/status", //创建订单 token


    // -------------------------提现 接口
    getCashList: web + "/cash/list", //获取列表
    postCashCreate: web + "/cash/create", //提交
    

    // -------------------------圈子 接口
    getGroupInfo: web + "/group/info",
    PostGroupJoin: web + "/group/join",
    getGroupList: web + "/group/list",
    getGroupPosts: web + "/group/posts",
    getGroupMeta: web + "/group/create/meta", //获取圈子分类列表信息
    PostGroupCreate:  web + "/group/create", //创建圈子
    getGroupEditInfo: web + "/group/edit/info",
    postGroupEdit: web + "/group/edit",
    postGroupRemove: web + "/group/remove",


    // -------------------------文章 接口
    getArticle: web + "/article/info",
    getArticleList: web + "/article/list",
    postArticleLike: web + "/article/like",
    postArticleFavorite: web + "/article/favorite",
    getArticleMeta: web + "/article/create/meta",
    postArticleCreate: web + "/article/create",
    getArticleEditInfo: web + "/article/edit/info",
    postArticleEdit: web + "/article/edit",
    postArticleRemove: web + "/article/remove",


    // -------------------------音频 接口
    getAudio: web + "/audio/info",
    getAudioList: web + "/audio/list",
    postAudioLike: web + "/audio/like",
    postAudioFavorite: web + "/audio/favorite",
    getAudioMeta: web + "/audio/create/meta",
    postAudioCreate: web + "/audio/create",
    getAudioEditInfo: web + "/audio/edit/info",
    postAudioEdit: web + "/audio/edit",
    postAudioRemove: web + "/audio/remove",

    // -------------------------课程视频 接口
    getEdu: web + "/edu/info",
    getEduList: web + "/edu/list",
    postEduJoin: web + "/edu/join",
    postEduLike: web + "/edu/like",
    postEduFavorite: web + "/edu/favorite",
    getEduMeta: web + "/edu/create/meta",
    postEduCreate: web + "/edu/create",
    getEduEditInfo: web + "/edu/edit/info",
    postEduEdit: web + "/edu/edit",
    postEduRemove: web + "/edu/remove",

    // -------------------------资源接口
    getResource: web + "/resource/info",
    getResourceList: web + "/resource/list",
    postResourceLike: web + "/resource/like",
    postResourceFavorite: web + "/resource/favorite",
    getResourceMeta: web + "/resource/create/meta",
    postResourceCreate: web + "/resource/create",
    getResourceEditInfo: web + "/resource/edit/info",
    postResourceEdit: web + "/resource/edit",
    postResourceRemove: web + "/resource/remove",
    
    // -------------------------视频 接口
    getVideo: web + "/video/info",
    getVideoList: web + "/video/list",
    postVideoLike: web + "/video/like",
    postVideoFavorite: web + "/video/favorite",
    getVideoMeta: web + "/video/create/meta",
    postVideoCreate: web + "/video/create",
    getVideoEditInfo: web + "/video/edit/info",
    postVideoEdit: web + "/video/edit",
    postVideoRemove: web + "/video/remove",


    // -------------------------话题 接口
    getTopic: web + "/topic/info",
    getTopicList: web + "/topic/list",
    getTopicTop: web + "/topic/top",
    getTopicMeta: web + "/topic/create/meta",
    postTopicCreate: web + "/topic/create",
    postTopicLike: web + "/topic/like",
    postTopicRemove: web + "/topic/remove",

    // -------------------------评论 接口
    postCommentCreate: web + "/comment/create",
    getCommentList: web + "/comment/list",
    postCommentLike: web + "/comment/like",
    postCommentRemove: web + "/comment/remove",

    // -------------------------举报接口
    postReportCreate: web + "/report/create",


    // -------------------------问题 接口
    // getAnswer: web + "/answer/info",
    getAnswerList: web + "/answer/list",
    postAnswerCreate: web + "/answer/create",
    postAnswerLike: web + "/answer/like",
    postAnswerAdoption: web + "/answer/adoption",
    postAnswerRemove: web + "/answer/remove",
}
export default api