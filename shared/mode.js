const MODE = {
    NEW:2,
    HOT:1,
    FAVORITE : 3, // 收藏
	VIEW     :4, // 查看最多
	FOLLOW  : 5 // 关注的
}

const HIDEMODE = {
    PUBLIC:1, // 公开
    PAY:2, // 支付
    LOGIN:3, // 登录
}


const LOGINMODE = {
    CODE:1, // 验证码登录
    PASS:2, // 密码登录
}

export {
    MODE,
    LOGINMODE,
    HIDEMODE
}

