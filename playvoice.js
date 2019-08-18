//如果有空的话，可以把所有的播放相关的都放到这个对象中，那样更容易管理
var ksPlayer={
	curPlay:null,
	curUrl:null
},basePath=KS.webUrl || KS.__basePath;
function checkPlayer(){
	if(!ksPlayer.playIfra){
		var ifra = document.createElement('span');
		ifra.id='ksPlayerSpan';
		document.body.appendChild(ifra);
		ksPlayer.playIfra = 'loading';
		ifra.innerHTML='<iframe name="ksPlayer_frame" id="ksPlayer_frame"  src="'+basePath+'kshtmlplayer.jsp" frameborder="0" style="position:absolute;left:-50px;top:-50px;width:1px;height:0px;"></iframe>';
	}else if(ksPlayer.playIfra!='loading'){
		return true;
	}
	return false;
}
//MP3播放或者停止播放
function playVoice(obj,url){
	checkPlayer();
	var src=obj.src+'';
	//console.log('MP3播放或者停止播放:'+src);
	if(src.substring(src.length-4)=='.gif'){
		//document.title='stop_id='+obj.id+'&url='+url;
		obj.src=src.replace(/\/[^/]*?$/,'/voice.jpg');
		if(ksPlayer.my_jPlayer)ksPlayer.my_jPlayer.jPlayer("stop");
		ksPlayer.curPlay=null;
	}else{
		//document.title='play_id='+obj.id+'&url='+url;
		if(ksPlayer.curPlay){
			if(ksPlayer.my_jPlayer)ksPlayer.my_jPlayer.jPlayer("stop");
			var img=document.getElementById(ksPlayer.curPlay);
			if(img)img.src=img.src.replace(/\/[^/]*?$/,'/voice.jpg');
		}
		obj.src=src.replace(/\/[^/]*?$/,'/voice_wait.gif');
		ksPlayer.curPlay=obj.id;
		url = url.replace(/\.amr$/,'.mp3');
		ksPlayer.curUrl = url;
		if(ksPlayer.my_jPlayer){
			ksPlayer.my_jPlayer.jPlayer("setMedia", {
				mp3:url
			});
			ksPlayer.my_jPlayer.jPlayer("play");
		}
	}
}

//效果声音鼠标图标--鼠标移入
function playOver(obj){
	var src=obj.src+'';
	if(src.substring(src.length-4)=='.gif'){
		
	}else{
		obj.src=src.replace(/\/[^/]*?$/,'/voice_over.jpg');
	}
}
//效果声音鼠标图标--鼠标移出
function playOut(obj){
	var src=obj.src+'';
	if(src.substring(src.length-4)=='.gif'){
		
	}else{
		obj.src=src.replace(/\/[^/]*?$/,'/voice.jpg');
	}
}
//效果声音鼠标图标--鼠标按下
function playDown(obj){
	var src=obj.src+'';
	if(src.substring(src.length-4)=='.gif'){
		
	}else{
		obj.src=src.replace(/\/[^/]*?$/,'/voice_down.jpg');
	}
}