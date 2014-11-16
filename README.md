showdiv
=======

简单的弹出层,让div可以像对话框似的居中弹出

	$("#demo").showDiv({
		"showModal":false,
		"onClose":function(){
			alert('关闭')
		}
	}).showDiv("show")
