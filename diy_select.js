/***
 * 自定义下拉框
 * 这边如果要使用，请保持格式
 * <div class='diy_select'>
 *	<input type='hidden' name='' id="" class='diy_select_input'\/>
 *	<div class='diy_select_txt'>所有站点<\/div>
 *	<div class='diy_select_btn'><\/div>
 * <\/div>
 *
 * <div class="diy_select_list_div">
		<ul class='diy_select_list'>
			 <li sel_value=""><\/li>
			 ...
		<\/ul>
	<\/div>
 *
 * @return
 */

function internetExplorer() {
      var browser = navigator.appName;
      var b_version = navigator.appVersion;
      var version = b_version.split(";");
	  if (browser=="Microsoft Internet Explorer"&& version.length > 1) {
          var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
          return trim_Version;
      }
      return null;
}
var ieVersion = internetExplorer();
var clickOnLi=false;
//js模拟下拉选择框，注意目前的下拉框列表容器顺序要和模拟的下拉框一致（按照顺序取值）
function diy_select(){this.init.apply(this,arguments)};
diy_select.prototype={
	 init:function(opt)
	 {
		this.setOpts(opt);
		this.o=this.getByClass(this.opt.TTContainer,document,'div');//容器
		this.b=this.getByClass(this.opt.TTDiy_select_btn);//按钮
		this.t=this.getByClass(this.opt.TTDiy_select_txt);//显示
		this.d=this.getByClass(this.opt.TTDiv_select_list_div);//列表容器div
		this.l=this.getByClass(this.opt.TTDiv_select_list);//列表容器list
		this.ipt=this.getByClass(this.opt.TTDiy_select_input);//列表容器input
		this.lengths=this.o.length;
		this.v=[];
		this.iptv=[];
		this.hasMouseEvent=this.opt.TTMouse||false;
		this.initSelect();
	 },
	 setValidate:function(validate,beginCheck){
		 this.diy_select_validate = {validate:null,beginCheck:false};
		 if(validate)this.diy_select_validate.validate = validate;
		 if(beginCheck)this.diy_select_validate.beginCheck = beginCheck;
	 },
	 addClass:function(o,s)//添加class
	 {
		o.className = o.className ? o.className+' '+s:s;
	 },
	 removeClass:function(o,st)//删除class
	 {
		var reg=new RegExp('\\b'+st+'\\b');
		o.className=o.className ? o.className.replace(reg,''):'';
	 },
	 initSelect:function()//显示下拉框列表----初始化
	 {
		var This=this;
		var iNow=0;
		for(var i=0;i<this.lengths;i++)
		{
			this.v[i]=this.t[i].innerHTML;
			this.iptv[i]=this.ipt[i].value;
			this.o[i].index=this.l[i].index=this.b[i].index=this.t[i].index=i;
			this.d[i].index=i;
			//处理鼠标移入移出这个下拉框的事件--下拉框下拉箭头样式变更
			if(This.hasMouseEvent){
				var y='8px';
				if(This.opt.ArrowPositionY){
					y=This.opt.ArrowPositionY;
				}
				this.b[i].onmouseover = function(){
					if(!this.getAttribute("isClick")||this.getAttribute("isClick")=="unClick"){
						this.style.backgroundPosition = '0px '+y;
					}
				}
				this.b[i].onmouseout = function(){
					if(!this.getAttribute("isClick")||this.getAttribute("isClick")=="unClick"){
						this.style.backgroundPosition = '0px '+y;
					}
				}
				this.t[i].onmouseover = function(){
					if(!this.getAttribute("isClick")||this.getAttribute("isClick")=="unClick"){
						this.parentNode.children[2].style.backgroundPosition = '0px '+y;
					}
				}
				this.t[i].onmouseout = function(){
					if(!this.getAttribute("isClick")||this.getAttribute("isClick")=="unClick"){
						this.parentNode.children[2].style.backgroundPosition = '0px '+y;
					}
				}
			}
			//点击事件--弹出下拉选项
			this.t[i].onclick=this.b[i].onclick=function(ev)
			{
				var e=window.event || ev;
				var index=this.index;
				var id = This.ipt[index].id;
				if(!id){
					id=This.ipt[index].getAttribute('name');//如果没有id,获取name值，主要是解决多个同名的下拉框
				}
				var clickBefEle = This.opt.TTClickSelectBeforeElement;
				if(clickBefEle&&clickBefEle.indexOf(id)>=0){
					var clickBefFun = This.opt.TTClickSelectBeforeFun;
					if(clickBefFun&&clickBefFun[id]){
						var fun = clickBefFun[id];
						fun(index);
					}
				}
				This.item=This.l[index].getElementsByTagName('li');
				if(This.l[index].style.display=='block'||This.d[index].style.display=='block'){
					This.l[index].style.display = 'none';
					This.d[index].style.display = 'none';
					if(This.hasMouseEvent){
						var y='4px';
						if(This.opt.ArrowPositionY){
							y=This.opt.ArrowPositionY;
						}
						This.b[index].style.backgroundPosition = '0px '+y;
						This.b[index].setAttribute("isClick","unClick");
						This.t[index].setAttribute("isClick","unClick");
					}
				}else{
					This.l[index].style.display = 'block';
					This.d[index].style.display = 'block';
					if(This.hasMouseEvent){
						var y='4px';
						if(This.opt.ArrowPositionY){
							y=This.opt.ArrowPositionY;
						}
						This.b[index].style.backgroundPosition = '-31px '+y;
						This.b[index].setAttribute("isClick","isClick");
						This.t[index].setAttribute("isClick","isClick");
					}
				}
				for(var j=0;j<This.lengths;j++)
				{
					if(j!=index)
					{
						This.d[j].style.display = 'none';
						This.l[j].style.display='none';
					}
				}
                var clickAftEle = This.opt.TTClickSelectAfterElement;
				if(clickAftEle&&clickAftEle.indexOf(id)>=0){
					var clickAftFun = This.opt.TTClickSelectAfterFun;
					if(clickAftFun&&clickAftFun[id]){
						var fun = clickAftFun[id];
						fun(index);
					}
				}
				This.addClick(This.item);
				e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true); //阻止冒泡
			}
		}
	 },
	 addClick:function(o)//点击回调函数---点击选择某个下拉框选项
	 {
		if(o.length>0)
		{
			var This=this;
			for(var i=0;i<o.length;i++)
			{
				//下拉框选项鼠标移入效果--颜色更变
				o[i].onmouseover=function()
				{
					var index=this.parentNode.index;
					var id = This.ipt[index].id;
					if(!id){
						id=This.ipt[index].getAttribute('name');//如果没有id,获取name值，主要是解决多个同名的下拉框
					}
					var TTFcous = This.opt.TTFcous;
					if(TTFcous.speClass&&TTFcous.speClass[id]){
						This.addClass(this,TTFcous.speClass[id]);
					}else{
						This.addClass(this,TTFcous.defaultClass||'focus');
					}
				}
				//下拉框选项鼠标移出效果--颜色更变
				o[i].onmouseout=function()
				{
					var index=this.parentNode.index;
					var id = This.ipt[index].id;
					if(!id){
						id=This.ipt[index].getAttribute('name');//如果没有id,获取name值，主要是解决多个同名的下拉框
					}
					var TTFcous = This.opt.TTFcous;
					if(TTFcous.speClass&&TTFcous.speClass[id]){
						This.removeClass(this,TTFcous.speClass[id]);
					}else{
						This.removeClass(this,TTFcous.defaultClass||'focus');
					}
				}
				var flag=true;
				var ownFunEle = This.opt.TTListOwnClickElement;
				var index=o[i].parentNode.index;
				var id = This.ipt[index].id;
				if(!id){
					id=This.ipt[index].getAttribute('name');//如果没有id,获取name值，主要是解决多个同名的下拉框
				}
				var oldV = This.ipt[index].value;
                //if(typeof ownFunEle=='function')ownFunEle = ownFunEle();
				if(ownFunEle&&ownFunEle.indexOf(id)>=0){//当前有下拉选项要执行自己的onclick方法,且包含当前下拉框
					var ownfuns = This.opt.TTListOwnClickFun;
					if(ownfuns&&ownfuns[id]){
						var x = id;
						var value = ownfuns[id]['value'];
						var fun = ownfuns[id]['fun'];//自定义事件
						var otherHasDefFun = ownfuns[id]['otherHasDefFun'];//其他选项是否设置成默认的点击事件
						if(value){//当value值存在，那么当选项值是value的时候才执行自定义事件;
							var v = o[i].getAttribute('sel_value');
							if(value==v){
								o[i].onclick = fun;
								flag = false;
							}else{
								//判定其他选项
								if(!otherHasDefFun){//不设置成默认的，执行自定义事件
									var otherFun = ownfuns[id]['otherListFun'];//其他选项的点击事件
									o[i].onclick = otherFun;
									flag = false;
								}
							}
						}else{
							if(!otherHasDefFun){//不设置成默认的，执行自定义事件
								var otherFun = ownfuns[id]['otherListFun'];//其他选项的点击事件
								o[i].onclick = otherFun;
								flag = false;
							}
						}
					}
				}
				if(flag){
					//默认的点击事件：点击后下拉框消失，如果有点击后的事件，那么触发
					o[i].onclick=function()
					{
						var index=this.parentNode.index;//获得列表
						This.t[index].innerHTML=this.innerHTML.replace(/^\s+/,'').replace(/\s+&/,'');
						var className = this.className;
						var v = this.getAttribute('sel_value');
						if(className.indexOf('checkbox-con')>=0){
							//下拉复选框
							stopPro();
							var lis = This.l[index];
                            var list = lis.getElementsByTagName("li");
							if(v){
								var ipt = this.getElementsByTagName('input')[0];
								var lab = this.getElementsByTagName('label')[0];
								if(ipt.checked==true){
									lab.className='checkbox';
									ipt.checked = false;
								}else{
									lab.className='checkbox cur';
									/*lab.parentNode.parentNode.previousSbiling.style.border="none";*/
									var nodes=lab.parentNode.parentNode.parentNode.parentNode.parentNode;
									del_ff(nodes);
//									nodes.firstChild.style.border="none";
									ipt.checked = true;
								}
								var name = '';
								var value='';
								var checkNum=0;
								for (var i=0;i<list.length;i++){
									var ipt = list[i].getElementsByTagName('input')[0];
									if(ipt&&ipt.checked==true){
										checkNum+=1;
										value=value+ipt.value+',';
										name=name+ipt.getAttribute('nameVal')+',';
									}
                                }
								if(checkNum==0){
									name = '请选择';
								}
								This.ipt[index].value=checkNum>0?value.substring(0,value.length-1):value;
								This.t[index].innerHTML=checkNum>0?name.substring(0,name.length-1):name;
							}else{
								This.ipt[index].value=v;
								This.t[index].innerHTML='请选择';
                                // $(lis).find('li').each(function(i,n){});
								for (var i=0;i<list.length;i++){
									var ipt = list[i].getElementsByTagName('input')[0];
									var lab = list[i].getElementsByTagName('label')[0];
									if(ipt&&lab){
										lab.className='checkbox';
										ipt.checked = false;
									}
                                }
								This.d[index].style.display = 'none';
								This.l[index].style.display='none';
							}
						}else{
							//下拉框
							This.ipt[index].value=v;
							This.d[index].style.display = 'none';
							This.l[index].style.display='none';
						}
						var id = This.ipt[index].id;
						if(!id){
							id=This.ipt[index].getAttribute('name');//如果没有id,获取name值，主要是解决多个同名的下拉框
						}
						//如果存在点击后触发的事件，那么触发
						var funsEle = This.opt.TTSelectedAfterElement;
						if(funsEle&&funsEle.indexOf(id)>=0){
							var funs = This.opt.TTSelectedAfterFun;
							if(funs&&funs[id]){
								var fun = funs[id];
								fun(v,index,oldV,this);
							}
						}
						This.checkValidate(This.ipt[index]);
					}
				}
			}
		}
	 },
	 getByClass:function(s,p,t)//使用class获取元素
	 {
//		var reg=new RegExp('\\b'+s+'\\b');
//		var reg=new RegExp('^'+s+'$');
		var reg=new RegExp('^'+s+'(\\s(error|diy_select-invalid))?$');//包含validate验证
		var aResult=[];
		var aElement=(p||document).getElementsByTagName(t || '*');
		for(var i=0;i<aElement.length;i++)
		{
			if(reg.test(aElement[i].className))
			{
				aResult.push(aElement[i]);
			}
		}
		return aResult;
	 },
	 reInit:function(){//重新初始化数据
	 	var This=this;
	 	for(var i=0;i<This.lengths;i++)
		{
			this.t[i].innerHTML=this.v[i];
			this.ipt[i].value=this.iptv[i];
			for(var j=0;j<This.l[i].children.length;j++){
				var curli = This.l[i].children[j];
				if(curli.className&&(curli.className.indexOf('checkbox-con')>=0)){//下拉复选框赋值
					var ipt = curli.getElementsByTagName('input')[0];
					var lab = curli.getElementsByTagName('label')[0];
					if(ipt&&lab){
						lab.className='checkbox';
						ipt.checked = false;
					}
				}else if(curli.className&&curli.className.indexOf('checkbox-tree-parent-con')>=0){//树控件赋值
					var lis = curli.getElementsByTagName('li');
					if(lis&&lis.length>0){
						for(var ci=0;ci<lis.length;ci++){
							var ipt = lis[ci].getElementsByTagName('input')[0];
							var lab = lis[ci].getElementsByTagName('label')[0];
							lab.className='checkbox-tree';
							ipt.checked = false;
						}
					}
					var pipt = curli.getElementsByTagName('input')[0];
					var plab = curli.getElementsByTagName('label')[0];
					plab.className='checkbox-tree';
					pipt.checked = false;
					if(This.getByClass('tree-arrow-open',curli,'span')&&This.getByClass('tree-arrow-open',curli,'span')[0]){
						var arrow_open =This.getByClass('tree-arrow-open',curli,'span')[0];
						treeOpenClose(arrow_open);
					}
				}else if(curli.className&&curli.className.indexOf('select-tree-li')>=0){
					if(This.getByContainClass('tree-arrow-open',curli,'span')&&This.getByContainClass('tree-arrow-open',curli,'span')[0]){
						var arrow_open =This.getByContainClass('tree-arrow-open',curli,'span')[0];
						treeOpenClose(arrow_open,true);
					}
				}
			}
		}
	 },
	 setValue:function(data){//赋值
	 	var This=this;
		for(var i=0;i<This.lengths;i++)
		{
			var id = This.ipt[i].id;
			if(!id)id=This.ipt[i].getAttribute('name');
			if(data[id]){
				This.ipt[i].value=data[id];
				var txt='';
				var isCheckbox=false;
				for(var j=0;j<This.l[i].children.length;j++){
					var curli = This.l[i].children[j];
					if(curli.className&&(curli.className.indexOf('checkbox-con')>=0)){
						isCheckbox = true;
						var ipt = curli.getElementsByTagName('input')[0];
						var lab = curli.getElementsByTagName('label')[0];
						if(ipt&&lab){
							if(ipt.value&&(data[id].indexOf(ipt.value)>=0)){
								lab.className='checkbox cur';
								ipt.checked = true;
								if(!txt)txt=ipt.getAttribute('nameVal');
								else txt = txt+','+ipt.getAttribute('nameVal');
							}else{
								lab.className='checkbox';
								ipt.checked = false;
							}
						}
					}else{
						if(data[id]==curli.getAttribute('sel_value')){
							This.t[i].innerHTML = This.l[i].children[j].innerHTML;
						}
					}
				}
				if(isCheckbox&&txt&&txt.length>0){
					This.t[i].innerHTML = txt;
				}
			}else{
				if(This.l[i].children.length>0){
					var v = This.l[i].children[0].getAttribute('sel_value');
					var info = This.l[i].children[0].innerHTML;
					This.t[i].innerHTML = info;
					This.ipt[i].value=v;
				}
			}
		}
	 },
	 getValue:function(){
		 var This=this;
		 var data={};
		 for(var i=0;i<This.lengths;i++)
		 {
			var id = This.ipt[i].id;
			if(id){
				var v = This.ipt[i].value;
				if(v){
					data[id]=This.ipt[i].value;
				}
			}
		 }
		 return data;
	 },
	 checkValidate:function(element){
		var This=this;
		if(!This.diy_select_validate)This.setValidate();
		if(This.diy_select_validate.validate&&This.diy_select_validate.beginCheck){
			This.diy_select_validate.validate.form();
			if(element)element.focus();
		}
	 },
	 setOpts:function(opt) //以下参数可以不设置  //设置参数
	 {
		this.opt={
			 TTContainer:'diy_select',//控件的class
			 TTDiy_select_input:'diy_select_input',//用于提交表单的class
			 TTDiy_select_txt:'diy_select_txt',//diy_select用于显示当前选中内容的容器class
			 TTDiy_select_btn:'diy_select_btn',//diy_select的打开按钮
			 TTDiv_select_list:'diy_select_list',//要显示的下拉框内容列表class
			 TTDiv_select_list_div:'diy_select_list_div',//要显示的下拉框内容列表外层class
			 TTFcous:{
				 defaultClass:'focus'//得到焦点时的class
//				 speClass:{'':''}//某些下拉框实现自己得到焦点时的class
			 },
			 TTMouse:false//是否有鼠标移入移出事件
//			 ArrowPositionY:'4px';//下拉箭头的位置（下拉框高度改变时位置重新设置）
//			 TTClickSelectBeforeElement:'',//点击哪些下拉框要触发事件 eg TTClickSelectBeforeElement:'siteId'--站点下拉框
//			 TTClickSelectBeforeFun:{},//点击TTClickSelectBeforeElement中的对应下拉框要触发的事件 eg TTClickSelectBeforeFun:{'siteId':function(){alert(1);}}
//			 							//eg-->点击siteId站点下拉框alert(1);
//			 TTListOwnClickElement:'',//点击哪些下拉框中的选项值不执行默认的点击事件，eg TTListOwnClickElement:'siteId'--站点下拉框
//			 //默认事件是类似点击下拉框的事件：点击选中某个值之后TTDiv_select_list隐藏，TTDiy_select_txt显示当前选中内容，TTDiy_select_input赋值为选中内容用于提交
//			 TTListOwnClickFun:{},//点击TTListOwnClickElement中的对应下拉框中的选项值的点击事件 --这边只处理了一个值，如果有需要再修改
//			 //eg TTListOwnClickFun:{'siteId':{'value':1,'fun':function(){alert(2);},'otherHasDefFun':false,'otherListFun':function(){alert(3);}}}
//			 //eg-->点击siteId站点下拉框值中的值value为1的选项，执行alert(2)弹“2”;otherHasDefFun为false表示其他下拉框选项不执行默认事件，执行otherListFun中的事件
//			 TTSelectedAfterElement:'',//哪些下拉框选中了某个值之后触发事件 eg TTSelectedAfterElement:'siteId'--站点下拉框
//			 TTSelectedAfterFun:{},//选中TTSelectedAfterElement中的对应下拉框中的值后触发的事件 eg TTSelectedAfterFun:{'siteId':function(){alert(4);}}
//			 //eg-->siteId站点下拉框选中某个值之后执行 alert(4);
		}
		for(var a in opt)  //赋值 ,请保持正确,没有准确判断的
		{
			this.opt[a]=opt[a] ? opt[a]:this.opt[a];
		}
	 }
}
var TTDiy_select,page_diy_select;
var diy_select_oarray = [];
function addEvent(obj, type, fn) {
 (obj.addEventListener) ? obj.addEventListener( type, fn, false ) : obj.attachEvent("on"+type, fn);
}
addEvent(document,'click',function(){
	for(var k=0;k<diy_select_oarray.length;k++){
		var o = diy_select_oarray[k];
		if(o){
			for(var i=0;i<o.lengths;i++){
				o.d[i].style.display = 'none';
				o.l[i].style.display='none';
				var y = '4px';
				if(o.opt.ArrowPositionY)y = o.opt.ArrowPositionY;
				o.b[i].style.backgroundPosition='0px '+y;
				o.b[i].setAttribute("isClick","unClick");
				o.t[i].setAttribute("isClick","unClick");
			}
		}
	}
});
/**获取window.event*/
function getEvent() {//有时需要用到这些事件
	if(window.event)return window.event;
	var __caller=getEvent.caller;
	while(__caller!=null){
		var _argument=__caller.arguments[0];
		if(_argument){
			var _temp=_argument.constructor;
			if(_temp.toString().indexOf('Event')!=-1){
				return _argument;
			}
		}
		__caller=__caller.caller;
	}
	return null;
//	return window.event || arguments.callee.caller.arguments[0];
}
function stopPro(){
	var ev = getEvent();
	if(ev){//禁止向上传播
		try{
			if (ev.preventDefault) ev.preventDefault();
			if (ev.stopPropagation) ev.stopPropagation();
			if(ieVersion){
				ev.cancelBubble = true;//停止冒泡
				ev.returnValue = false;//阻止事件的默认行为
			}
		}catch(e){}
	}
}
function del_ff(elem){
	var elem_child = elem.childNodes;
	for (var i = 0; i < elem_child.length;){
		if (elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
			elem.removeChild(elem_child[i])
		}
		else{
			i++;
		}
	}
}
