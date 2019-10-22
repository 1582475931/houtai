const btnUrl='/api';

//登录
const login=btnUrl+"/login"
//管理员管理
const findManage=btnUrl+'/findManage'
const addManage =btnUrl+'/addManage'
const delManage=btnUrl+'/delManage'
const updateManage=btnUrl+"/updateManage"
const changePassManage=btnUrl+'/changePassManage'


//轮播图
const banner =btnUrl+'/banner'
const delBanner=btnUrl+'/delBanner'
const addBanner=btnUrl+'/addBanner'

//家教
const teacherBanner=btnUrl+'/teacherBanner'
const delTeacherBanner=btnUrl+'/delTeacherBanner'
const addTeacherBanner =btnUrl+"/addTeacherBanner"

//家教类型
const teacherType=btnUrl+"/teacherType"
const delTeacherType=btnUrl+"/delTeacherType"
//家教排行
const teacherTop=btnUrl+"/teacherTop"
const delTeacherTop=btnUrl+"/delTeacherTop"
const addTeacherTop =btnUrl+"/addTeacherTop"
const addTeacherType=btnUrl+"/addTeacherType";

//水站
const findWater=btnUrl+"/findWater"
const delWater=btnUrl+'/delWater';
const addWater =btnUrl+'/addWater'
const updateWater=btnUrl+'/updateWater'


//水站评论
const findComment=btnUrl+"/findComment";
const delComment =btnUrl+"/delComment ";
//维修
const findRepair=btnUrl+'/findRepair';
const addRepair =btnUrl+"/addRepair";
const delRepair=btnUrl+"/delRepair";
const updateRepair =btnUrl+"/updateRepair";

//维修评论
const findRepairComment=btnUrl+"/findRepairComment";
const delRepairComment =btnUrl+"/delRepairComment"

//家政
const homeBanner=btnUrl+"/homeBanner"
const delHomeBanner =btnUrl+'/delHomeBanner'
const addHomeBanner =btnUrl+"/addHomeBanner"

//人事关管理
const findHomeWorker=btnUrl+'/findHomeWorker';
const delHomeWorker=btnUrl+'/delHomeWorker';
const addHomeWorker =btnUrl+"/addHomeWorker";
const updateHomeWorker =btnUrl+"/updateHomeWorker"
export default {
    login,
    findManage,
    addManage ,
    delManage,
    updateManage,
    changePassManage,
    banner,
    delBanner,
    addBanner,
    teacherBanner,
    delTeacherBanner,
    addTeacherBanner,
    teacherType,
    teacherTop,
    delTeacherType,
    delTeacherTop,
    findWater,
    delWater,
    addWater,
    updateWater,
    findComment,
    delComment,
    addTeacherTop,
    addTeacherType,
    findRepair,
    addRepair,
    delRepair,
    updateRepair,
    findRepairComment,
    delRepairComment,
    homeBanner,
    delHomeBanner,
    addHomeBanner,
    findHomeWorker,
    delHomeWorker,
    addHomeWorker,
    updateHomeWorker
}