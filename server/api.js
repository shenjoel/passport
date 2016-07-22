'use strict';
// 数据库配置
var	dbopt = {
	 host: 'localhost',
	//host: '10.100.139.51',
	Datebase: 'Wing',
	port: 27017
}

module.exports = {
	// 数据体
	codeEntity: function(code, data, msg) {
	    var result = {
	        code: parseInt(code),
	        data: data || {},
	        msg: msg || ''
	    }
	    return result;
	},
	// 通码
	code: {
		common: {
			succ: 200,
			miss: 1001,
			usernameType: 1102,
			passwordLength: 1103
		},
		signup: {
			confirmPwd: 1100
		},
		signin: {
			loginFail: 1101
		}
	},
	// 返回信息
	codeMsg: {
		succ: 'success.',
		miss: 'Miss params.',
		confirmPwd: 'confirm password',
		loginFail: 'username or password fail',
		usernameType: 'username type fail',
		passwordLength : 'password 6-12'
	},
	dbLink: 'mongodb://' + dbopt.host + '/' + dbopt.Datebase,
	// cookies 配置
	session_secret: 'vipme_wing_secret',
    auth_cookie_name: 'vipme_wing',
    encrypt_key : 'wing',
    // 本地缓存设置
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_psd : '',
    redis_db: 0
}