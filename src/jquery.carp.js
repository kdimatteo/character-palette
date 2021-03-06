(function($) {

  var Carp = function(el){
    this.$el            = $(el);
    this.isShown        = false;
    this.palette        = null;
    this.isAutoClose    = false;
    this.selectionStart = 0;
    this.seperator      = ',';
    this.containerDiv   = $(document.createElement('div')).prop({'class':'carp-container'});
    this.chars          = [];
  }

  Carp.prototype.toggle = function(){
    if(!this.isShown){
      if(!!this.palette){
        this.show();
      } else {
        this.createPalette();
      }
    } else {
      this.hide();
    }
  }

  Carp.prototype.createPalette = function(e){

    var argChars = this.$el.data('carp-chars');

    if (argChars) {
      this.chars = argChars.split(this.seperator);
    } else {
      for(var i=192; i<=439; i++){
        this.chars.push(String.fromCharCode(i));
      }
    }

    this.isAutoClose = this.$el.data('carp-autoclose') || false;

    var charDiv = $(document.createElement('div')).prop({'class' : 'carp-chars'});
    $.each(this.chars, function(i, v){
      charDiv.append($('<button>' + v + '</button>'));
    });
    var arrowDiv = $(document.createElement('div')).prop({'class':'carp-arrow'});
    this.containerDiv.append(arrowDiv);
    this.palette = this.containerDiv.append(charDiv);
    this.$el.after(this.containerDiv);
    this.containerDiv.on('click', 'button', $.proxy(this.insert, this));
    this.show();
  }

  Carp.prototype.getCaretPosition = function(e){
    this.selectionStart = this.$el[0].selectionStart;
  }

  Carp.prototype.insert = function(e){
    var oldValue = this.$el.val();
    var newValue = oldValue.substring(0, this.selectionStart) + e.currentTarget.innerText + oldValue.substring(this.selectionStart);
    this.$el.val(newValue);
    this.$el[0].setSelectionRange = this.selectionStart++;    
    if(this.isAutoClose) {
      this.hide();
    }
  }

  Carp.prototype.show = function(e){
    this.containerDiv.show(); 
    this.isShown = true;
  }

  Carp.prototype.hide = function(e){
    this.containerDiv.hide();
    this.isShown = false;
  }

  function Plugin(option){
    return this.each(function(){
      var data = $(this).data('carp.instance');
      if(!data){
        $(this).data('carp.instance', (data = new Carp(this)));
      }
      if(option === 'toggle'){
        data.toggle();
      }
      if(option === 'getCaretPosition'){
        data.getCaretPosition();
      }
    });
  }
  
  $.fn.carp             = Plugin;
  $.fn.carp.Constructor = Carp;

  $('[data-carp]').on('focusout', function(e){
    var $el = $(e.target)
    Plugin.call($(this), 'getCaretPosition');
  });

  $('[data-trigger]').on('click', function(e){
    var t = $(e.currentTarget).data('target');
    Plugin.call($(t), 'toggle');
  });

})(window.jQuery);
