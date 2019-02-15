/*
 * Instance object on window 
 */
(function(window){
  if(window.Package){
    MaterialDialog = {};
  } else {
    window.MaterialDialog = {};
  }
})(window);

/*
 * Instance of application templates
 */
MaterialDialog.templates = {
	alert: 
		"<div class='modal material-alert'>"+
			"<div class='modal-content'><h4 class='modal-title'></h4></div>"+
			"<div class='modal-footer'><div>"+
		"</div>",
	/* modal clases:
		* modal-fixed-footer
		* bottom-sheet
	*/
	dialog: 
		"<div class='modal material-dialog class_here'>"+
			"<div class='modal-content'><h4 class='modal-title'>title_here</h4></div>"+
			"<div class='modal-footer'>"+
				"<button class='btn modal-close close close_button_class'>close_button_text</button>&nbsp;" +
				"<button class='btn modal-close confirm confirm_button_class'>confirm_button_text</button>" +
			"<div>"+
		"</div>",
};

/*
 * Method to create a modal alert like
 * @param text Receive modal text body
 * @param options Receive objects with options
*/
MaterialDialog.alert = function(text, options){
	text = typeof text !== 'undefined' ? text : '';
	options = typeof options !== 'undefined' ? options : {};
	var button_close = '<button class="btn modal-close button_class close">button_text</button>';
	var callback = null;
	var other_options = options;
	
	if(typeof(options.buttons)!='undefined'){
		if(typeof(options.buttons.close)!='undefined'){
			button_close = typeof(options.buttons.close.text)!='undefined' ? button_close.replace('button_text',options.buttons.close.text):button_close.replace('button_text','Close');
			button_close = typeof(options.buttons.close.className)!='undefined' ? button_close.replace('button_class',options.buttons.close.className):button_close.replace('button_class','');
			if (typeof(options.buttons.close.modalClose)!='undefined'){
				button_close = options.buttons.close.modalClose==false ? button_close.replace('modal-close',''):button_close;
			}
			if(typeof(options.buttons.close.callback)!='undefined'){
				callback = options.buttons.close.callback;
			}
		}
	}
	else{
		button_close = button_close.replace('button_text','Close');
		button_close = button_close.replace('button_class','');
	}

	
	options = {
		title: typeof(options.title)!='undefined' ? options.title:'Alert',
		footer: typeof(options.footer)!='undefined' ? options.footer:'',
		button: button_close,
	};
	
	
	var body = document.getElementsByTagName('body')[0];
	body.insertAdjacentHTML('beforeend',this.templates.alert);
	var last_material = document.getElementsByClassName('material-alert')[document.getElementsByClassName('material-alert').length-1]
	last_material.getElementsByClassName('modal-title')[0].textContent = options.title;
	last_material.getElementsByClassName('modal-content')[0].insertAdjacentHTML('beforeend',text);
	last_material.getElementsByClassName('modal-footer')[0].insertAdjacentHTML('beforeend',options.footer);
	last_material.getElementsByClassName('modal-footer')[0].insertAdjacentHTML('beforeend',options.button);
	var instance = M.Modal.init(last_material,other_options)
	instance.open()
	
	if(callback){
		var close = last_material.getElementsByClassName('close')[0]
		close.addEventListener('click',function(){
			callback.call();
		});
	}
	

};

/*
 * Instance to replace close button
 */
MaterialDialog.replace_close_button = function(body){
	body = body.replace('close_button_text','Close');
	body = body.replace('close_button_class','red');
	return body;
};

/*
 * Instance to replace confirm button
 */
MaterialDialog.replace_confirm_button = function(body){
	body = body.replace('confirm_button_text','Confirm');
	body = body.replace('confirm_button_class','');
	return body;
};

/*
 * Method to create a modal dialog like
 * @param text Receive modal text body
 * @param options Receive objects with options
*/
MaterialDialog.dialog = function(text, options){
	text = typeof text !== 'undefined' ? text : '';
	options = typeof options !== 'undefined' ? options : {};
	var button_close = '';
	var callback_close = null;
	var button_confirm = '';
	var callback_confirm = null;
	var other_options = options;
	var body = this.templates.dialog;
	
	body = typeof(options.title)!='undefined' ? body.replace('title_here',options.title):body.replace('title_here','Dialog');
	body = typeof(options.modalType)!='undefined' ? body.replace('class_here',options.modalType):body.replace('class_here','');
	
	if(typeof(options.buttons)!='undefined'){
		if(typeof(options.buttons.close)!='undefined'){
			body = typeof(options.buttons.close.text)!='undefined' ? body.replace('close_button_text',options.buttons.close.text):body.replace('close_button_text','Close');
			body = typeof(options.buttons.close.className)!='undefined' ? body.replace('close_button_class',options.buttons.close.className):body.replace('close_button_class','');
			if (typeof(options.buttons.close.modalClose)!='undefined'){
				body = options.buttons.close.modalClose==false ? body.replace('modal-close close','close'):body;
			}
			if(typeof(options.buttons.close.callback)!='undefined'){
				callback_close = options.buttons.close.callback;
			}
		}
		else{
			body = this.replace_close_button(body);
		}
		if(typeof(options.buttons.confirm)!='undefined'){
			body = typeof(options.buttons.confirm.text)!='undefined' ? body.replace('confirm_button_text',options.buttons.confirm.text):body.replace('confirm_button_text','Confirm');
			body = typeof(options.buttons.confirm.className)!='undefined' ? body.replace('confirm_button_class',options.buttons.confirm.className):body.replace('confirm_button_class','');
			if (typeof(options.buttons.confirm.modalClose)!='undefined'){
				body = options.buttons.confirm.modalClose==false ? body.replace('modal-close confirm','confirm'):body;
			}
			if(typeof(options.buttons.confirm.callback)!='undefined'){
				callback_confirm = options.buttons.confirm.callback;
			}
		}
		else{
			body = this.replace_confirm_button(body);
		}
	}
	else{
		body = this.replace_close_button(body);
		body = this.replace_confirm_button(body);
	}
	
	
	var html_body = document.getElementsByTagName('body')[0];
	html_body.insertAdjacentHTML('beforeend',body);
	var last_material = document.getElementsByClassName('material-dialog')[document.getElementsByClassName('material-dialog').length-1]
	last_material.getElementsByClassName('modal-content')[0].insertAdjacentHTML('beforeend',text);
	var instance = M.Modal.init(last_material,other_options)
	instance.open()
	
	if(callback_close){
		var close = last_material.getElementsByClassName('close')[0];
		close.addEventListener('click',function(){
			callback_close.call();
		});
	}
	
	if(callback_confirm){
		var confirm = last_material.getElementsByClassName('confirm')[0];
		confirm.addEventListener('click',function(){
			callback_confirm.call();
		});
	}
};
