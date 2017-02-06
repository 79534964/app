// 所有http后共用的act
export const ACT_ALL_CHECKHTTPDATA = 'all/act/checkHttpData';

// login
// 设置用户信息
export const SET_LOGIN_USERINFO = 'login/set/USERINFO';
// 设置login请求状态中
export const SET_LOGIN_FLAG = 'login/set/FLAG';

// 获取用户名字
export const GET_LOGIN_USERNAME = 'login/get/UERNAME';

// 执行登陆
export const ACT_LOGIN_LOGIN = 'login/act/LOGIN';
// 注销token
export const ACT_LOGIN_LOGOUT = 'login/act/LOGOUT';
// 执行设置用户信息
export const ACT_LOGIN_USERINFO = 'login/act/USERINFO';

// orderQuery
// 设置页数
export const SET_ORDERQUERY_PAGENUMBER = 'orderQuery/set/PAGENUMBER';
// 设置订单列表
export const SET_ORDERQUERY_ORDERLIST = 'orderQuery/set/ORDERLIST';
// 设置总页数
export const SET_ORDERQUERY_TOTAL = 'orderQuery/set/TOTAL';
// 设置选择查询的条件
export const SET_ORDERQUERY_RADIOVALUE = 'orderQuery/set/RADIOVALUE';
// 设置查询的内容
export const SET_ORDERQUERY_INPUTVALUE = 'orderQuery/set/INPUTVALUE';

// 设置订单列表
export const GET_ORDERQUERY_ORDERLIST = 'orderQuery/get/ORDERLIST';
// 获取总页数
export const GET_ORDERQUERY_TOTAL = 'orderQuery/get/TOTAL';
// 获取当前页数
export const GET_ORDERQUERY_PAGENUMBER = 'orderQuery/get/PAGENUMBER';
// 获取查询的条件
export const GET_ORDERQUERY_RADIOVALUE = 'orderQuery/get/RADIOVALUE';
// 获取查询的内容
export const GET_ORDERQUERY_INPUTVALUE = 'orderQuery/get/INPUTVALUE';

// 执行查询操作
export const ACT_ORDERQUERY_ORDERQUERY = 'orderQuery/act/ORDERQUERY';

// dataMachine
// 设置机列表
export const SET_DATAMACHINE_MACHINELIST = 'dataMachine/set/MACHINELIST';
// 设置时间值
export const SET_DATAMACHINE_TIMEVALUE = 'dataMachine/set/TIMEVALUE';

// 获取机列表
export const GET_DATAMACHINE_MACHINELIST = 'dataMachine/get/MACHINELIST';
// 获取时间值
export const GET_DATAMACHINE_TIMEVALUE = 'dataMachine/get/TIMEVALUE';

// 执行查询操作
export const ACT_DATAMACHINE_DATAMACHINE = 'dataMachine/act/DATAMACHINE';

// systemMenu
// 设置菜单目录
export const SET_SYSTEMMENU_MENULIST = 'systemMenu/set/MENULIST';
// 设置selectList
export const SET_SYSTEMMENU_SELECTLIST = 'systemMenu/set/SELECTLIST';

// 获取菜单目录
export const GET_SYSTEMMENU_MENULIST = 'systemMenu/get/MENULIST';
// 获取selectList
export const GET_SYSTEMMENU_SELECTLIST = 'systemMenu/get/SELECTLIST';

// 执行查询菜单操作
export const ACT_SYSTEMMENU_MENULIST = 'systemMenu/act/MENULIST';
// 执行删除菜单操作
export const ACT_SYSTEMMENU_DELETEMENU = 'systemMenu/act/DELETEMENU';
// 执行添加菜单操作
export const ACT_SYSTEMMENU_ADDMENU = 'systemMenu/act/ADDMENU';
// 执行编辑菜单操作
export const ACT_SYSTEMMENU_UPDATEMENU = 'systemMenu/act/UPDATEMENU';
