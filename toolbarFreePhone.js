/**
 * 31期升级工具栏免费电话事件 add by hnl 2017-09-30
 */


function checkTelNum(tel) {
	if (!tel) return;
	var v = tel.value;
	var v1 = v.replace(/[^\d]*/ig, '');
	if (v != v1)
		tel.value = v1;
}
var missT;
function sendMiss() {
	if (missT) window.clearTimeout(missT);
	missT = window.setTimeout(function() {
		var telNum = ksComm.$('telNum').value.trim();
		if (/\d{11,13}/.test(telNum)) {
			doAjax('miss');
		}
	}, 1000);
}
function sendFreeCall() {
	if (missT) window.clearTimeout(missT);
	if (ksComm.$('sendFreeDiv').disabled) return;
	var telNum = ksComm.$('telNum').value.trim();
	if (/\d{11,13}/.test(telNum)) {
		doAjax('call');
	//ksComm.$('sendFreeDiv').disabled=true;
	} else {
		var v = ksComm.$('telNum').getAttribute('defaultval');
		if (telNum && v != telNum) {
			freeCallBack('3');
		} else {
			alert('请输入号码');
		}
	}
}
var checkphonestatus = false;
function doAjax(action) {
	var _params = {
		t : new Date().getTime()
	};
	_params['ri'] = KS.__ri;
	_params['ci'] = KS.__ci;
	_params['si'] = KS.__si;
	_params['cas'] = KS.__si + '__' + KS.__ri;
	_params['action'] = action;
	_params['vi'] = KS.visitorSign;
	var telNum = ksComm.$('telNum').value.trim();
	_params['telNum'] = telNum;
	_params['linkid'] = linkid;
	try {
		ksComm.ajax({
			type : 'POST',
			dataType : 'json',
			timeout : 30000,
			url : KS.__basePath + 'freephone/callPhoneFromChat.htm',
			data : _params,
			success : function(resp) {
				eval('(' + resp + ')');
			},
			error : function() { //错误处理
				freeCallBack('failed');
			}
		});
	} catch (e) {}
}
var TEL_BUSY = '您好，您所拨打的电话正在通话中，请稍候再拨！';
var TEL_STOP = '对不起，您所拨打的电话已暂停使用！';
var TEL_NOBODY = '对不起，对方暂不方便接听您的来电！';
var TEL_END = '本次通话结束！';
var linkid = null;
function settelstatus(par) {
	var cb = ksComm.$('sendFreeDiv');
	if (par == 1) {
		ksOnlineChat.insertSysDialogMsg("呼叫成功，我们将电话和您联系，请稍后…");
		cb.style.cursor = 'default';
		cb.disabled = true;
	} else {
		cb.disabled = false;
		cb.style.cursor = 'pointer';
	}
}
function freeCallBack(status) {
	switch (status) {
	case "success":
	case "error":
		break;
	case "failed":
		settelstatus(0);
		break;
	case "0":
		ksOnlineChat.insertSysDialogMsg('呼叫失败');settelstatus(0);
		break;
	case "2":
		alert('缺少参数');settelstatus(0);
		break;
	case "3":
		alert('电话格式不正确');ksComm.$('telNum').value = '';settelstatus(0);
		break;
	case "4":
		alert('参数错误1');settelstatus(0);
		break;
	case "5":
		alert('参数错误2');settelstatus(0);
		break;
	case "6":
		ksOnlineChat.insertSysDialogMsg(TEL_BUSY);settelstatus(0);
		break;
	case "7":
		ksOnlineChat.insertSysDialogMsg('对不起，您的IP已加入受限制范围！');settelstatus(0);
		break;
	case "11":
		ksOnlineChat.insertSysDialogMsg('对不起，您所拨打的电话不在服务区内！');settelstatus(0);
		break;
	case "13":
		ksOnlineChat.insertSysDialogMsg('快商通网络营销电话提醒您，现在是下班时间，请改拨其它电话号码或留言！');settelstatus(0);
		break;
	case "100":
		ksOnlineChat.insertSysDialogMsg('您今天的呼叫次数过于频繁,请稍候再拔打！');settelstatus(0);
		break;
	case "77":
		ksOnlineChat.insertSysDialogMsg('您今天的用此电话呼叫次数过于频繁,请稍候再拔打！');settelstatus(0);
		break;
	case "8":
		ksOnlineChat.insertSysDialogMsg('对不起，您的电话已加入受限制范围！');settelstatus(0);
		break;
	case "9":
		ksOnlineChat.insertSysDialogMsg(TEL_STOP);settelstatus(0);
		break;
	case "90":
		ksOnlineChat.insertSysDialogMsg('您所拨打的公司，未开通免费电话服务，无法电话咨询，您可以进行在线咨询。');settelstatus(0);
		break;
	case "91":
//		ksOnlineChat.insertSysDialogMsg('您所拨打的公司，由于资金不足，无法与该公司建立通话');settelstatus(0);
		ksOnlineChat.insertSysDialogMsg('您所拨打的公司，未开通免费电话服务，无法电话咨询，您可以进行在线咨询。');settelstatus(0);
		break;
	case "92":
		ksOnlineChat.insertSysDialogMsg('对不起，您所拨打的电话已过期，请联系快商公司续费！联系电话：0592-5373098');settelstatus(0);
		break;
	case "10":
		ksOnlineChat.insertSysDialogMsg('您今天的呼叫次数过于频繁，请次日再拨打！');settelstatus(0);
		break;
	case "15":
		ksOnlineChat.insertSysDialogMsg('验证码不正确，请单击验证码图片重新输入新的验证码');settelstatus(0);
		break;
	case "16":
	case "30":
		ksOnlineChat.insertSysDialogMsg('您好，验证码已过期，请单击验证码图片重新输入新的验证码 或 刷新网页');settelstatus(0);
		break;
	case "101":
		ksOnlineChat.insertSysDialogMsg('对不起，该项服务未开启手机平台支持，请联系快商通客服0592-5373098咨询！');settelstatus(0);
		break;
	case "201":
		ksOnlineChat.insertSysDialogMsg('您好，当前网站未开启免费电话服务，请联系服务商！');settelstatus(0);
		break;
	case "205":
		ksOnlineChat.insertSysDialogMsg('请不要频繁呼叫，等待2分钟后再拨打');settelstatus(0);
		break;
	case "206":
		ksOnlineChat.insertSysDialogMsg('请开启电脑版免费通话服务，详情咨询快商通服务专线：0592-5575700');settelstatus(0);
		break;
	case "207":
		ksOnlineChat.insertSysDialogMsg('当前版本不支持自定义服务，详情联系快商通客服人员0592-5575700');settelstatus(0);
		break;
	case "210":
		ksOnlineChat.insertSysDialogMsg('请检查您的号码，不能自己给自己通话！');settelstatus(0);
		break;
	case "-8":
		ksOnlineChat.insertSysDialogMsg('系统正在升级中，如有疑问请联系快商客服！');settelstatus(0);
		break;
	default:
		linkid = status;settelstatus(1);window.setTimeout("checkstatus()", 1500);
		break;
	}
}
function phonestatusCallBack(status) {
	switch (status) {
	case "0":
		ksOnlineChat.insertSysDialogMsg(TEL_NOBODY);settelstatus(0);
		break;
	case "1":
		ksOnlineChat.insertSysDialogMsg(TEL_END);settelstatus(0);
		break;
	case "3":
		break;
	default:
		var t = window.setTimeout("checkstatus()", 1500);
		break;
	}
}
function checkstatus() {
	if (!linkid) return;
	doAjax('checkphonestatus');
}
function showPhoneTips(show){
	if(!ksComm.$('ksfree_calls_explain'))return;
	if(show){
		ksComm.$('ksfree_calls_explain').style.display='block';
	}else{
		ksComm.$('ksfree_calls_explain').style.display='none';
	}
}