/*
 * tdWider
 * 
 * https://github.com/Mystist/tdWider
 *
 * Copyright (c) 2013 Foundation and other contributors
 *
 * License: https://github.com/Mystist/tdWider/blob/master/MIT-LICENSE.txt
 *
 */

(function($) {

  var methods = {

    init: function(options) {
      var defaults = {
        "applyToAnotherTable": false
      };
      var settings = $.extend(defaults, options);
      var tdWider = new TdWider();
      tdWider.$this = this;
      tdWider.initialize(settings);
      return tdWider;
    }

  };
  
  function TdWider() {
    this.$this = null;
    this.currentMoveLength = 0;
    this.applyToAnotherTable = null;
  }
  
  TdWider.prototype = {
  
    constructor: TdWider,
    
    initialize: function(st) {

      this.applyToAnotherTable = st.applyToAnotherTable==true?"table:last":st.applyToAnotherTable;
      this.setElements("first");
      this.bindDrag();
      if(this.applyToAnotherTable) {
        this.setElements("last");
      }
    
    },
    
    setElements: function(sel) {
    
      var tThis = this;
      
      this.$this.delegate(".m_inner", "mouseover", function() {
        $(this).css("background-color", "#E1E1E1");
      });
      
      this.$this.delegate(".m_inner", "mouseout", function() {
        $(this).css("background-color", "");
      });
      
      this.$this.find("thead tr:"+sel+"").children().each(function() {
        $(this).css("white-space", "nowrap");
      });
      
      var theHeight = this.$this.find("thead tr:"+sel+"").children().first().height();
      
      this.$this.find("thead tr:"+sel+"").children().each(function(i) {
      
        $(this).attr("thewidth", $(this).attr("width"));
      
        if($(this).text()=="") {
          return true;
        }
      
        $(this).css({
          "height": theHeight,
          "line-height": theHeight+"px"
        });
      
        var $span = $('<span class="m_outer"></span>').css({
          "position": "relative",
          "top": -1 * parseInt($(this).css("padding-top"), 10),
          "left": $(this).css("padding-left"),
          "float": "right"
        });
        $(this).prepend($span[0].outerHTML);
        
        if(!this.applyToAnotherTable) {
        
          var $span1 = $('<span index="'+i+'" class="m_inner">&nbsp;</span>').css({
            "line-height": "100%",
            "position": "absolute",
            "height": $(this).outerHeight(true),
            "width": 6,
            "top": 0,
            "left": -6,
            "cursor": "e-resize"
          });
          $(this).find(".m_outer").append($span1[0].outerHTML);
          
        }

      });
      
    },
    
    drawLine: function(target) {
    
      var $span = $('<span class="m_inside">&nbsp;</span>').css({
        "line-height": "100%",
        "position": "absolute",
        "height": target.parents("table").outerHeight(true),
        "width": 1,
        "top": 0,
        "right": -1,
        "background-color": "#777"
      });
      
      target.append($span[0].outerHTML);
    
    },
    
    removeLine: function(target) {
    
      target.find(".m_inside").remove();
    
    },
    
    bindDrag: function() {
    
      var tThis = this;
    
      this.$this.find(".m_inner").draggable({
        "axis": "x",
        "start": function(e) {
          tThis.drawLine($(e.target));
          if(tThis.applyToAnotherTable) {
            tThis.drawLine(tThis.$this.find("span[index='"+$(e.target).attr("index")+"']:last"));
          }
        },
        "drag": function(e, ui) {
          if(tThis.applyToAnotherTable) {
            var fixNumber = 0;
            if(ui.position.left - ui.originalPosition.left < 0) {
              fixNumber = -1;
            } else {
              fixNumber = 1;
            }
            tThis.$this.find("span[index='"+$(e.target).attr("index")+"']:last").css("left", parseInt($(e.target).css("left"), 10) + fixNumber);
          }
        },
        "stop": function(e, ui) {
          tThis.currentMoveLength = ui.position.left - ui.originalPosition.left;
          tThis.changeTdWidth(e);
          $(e.target).css("left", ui.originalPosition.left);
          tThis.removeLine($(e.target));
          if(tThis.applyToAnotherTable) {
            tThis.removeLine(tThis.$this.find("span[index='"+$(e.target).attr("index")+"']:last"));
          }
        }
      });
    
    },
    
    changeTdWidth: function(e) {
    
      var $target = $(e.target).parent().parent();
      
      $target.attr("width", $target.width() + this.currentMoveLength + "px");
      
      this.$this.find("table:first").css({
        "min-width": this.$this.find("table:first").width() + this.currentMoveLength
      });
      
      if(this.applyToAnotherTable) {
        this.changeAnotherTdWidth(parseInt($(e.target).attr("index"), 10));
      }
    
    },
    
    changeAnotherTdWidth: function(index) {
    
      var $target = this.$this.find(this.applyToAnotherTable).find("tr:first").children().eq(index);
      
      $target.attr("width", $target.width() + this.currentMoveLength + "px");
      
      var $table = this.$this.find(this.applyToAnotherTable);
      
      $table.css({
        "min-width": $table.width() + this.currentMoveLength
      });
      
      if($table.outerWidth(true) > $table.parent().width() && $table.outerHeight(true) > $table.parent().height()) {
        this.$this.find("table:first").parent().width($table.parent().width() - 17);
      }
    
    },
    
    reverTdWidth: function() {
    
      this.$this.find("table").each(function() {
      
        $(this).find("tr:first").children().each(function() {
      
          $(this).attr("width", $(this).attr("thewidth")==undefined?"":$(this).attr("thewidth")).removeAttr("thewidth");
        
        });
      
      });
    
      this.$this.find("table").css({
        "min-width": ""
      });
    
    },
    
    revertElements: function(sel) {
    
      var tThis = this;
      
      this.$this.undelegate(".m_inner", "mouseover");
      
      this.$this.undelegate(".m_inner", "mouseout");
      
      this.$this.find("thead tr:"+sel+"").children().each(function() {
        $(this).css("white-space", "");
      });
      
      this.$this.find("thead tr:"+sel+"").children().each(function(i) {

        $(this).css({
          "height": "",
          "line-height": ""
        });
        
        $(this).find(".m_outer").remove();

      });
      
    },
    
    revert: function() {
    
      this.reverTdWidth();
    
      if(this.applyToAnotherTable) {
        this.revertElements("last");
      }
    
      this.$this.find(".m_inner").draggable("destroy");
      
      this.revertElements("first");
    
    }
  
  };

  $.fn.tdWider = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('No ' + method + ' method.');
    }
  };

})(jQuery);