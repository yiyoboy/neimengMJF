(function($) {
	$.simpleCanleder = function(box, options){
		var _canlederBox = "#MonthSel";
		var _title_ul_li = ".title li";
		box = $(box);
		var boxOffset = box.offset();
		var $select = null;
         	canlederBox = $(_canlederBox);
			_buildCanlederBox();
				
				$(".dateGuide").append(canlederBox);
          /**

                $(document).click(function(e){
					alert("fdasefdaf");
                    var pointX = e.pageX;
                    var pointY = e.pageY;
                    var $box  = canlederBox.data("box");

                    var isCanlederBox = $(e.target).parents(_canlederBox);

                   
                });
			**/

			
			//canlederBox.css({"top" : boxOffset.top + box_height + 6, "left": boxOffset.left});
			canlederBox.data("box", box); 
            _init();
			
		var canlederBox = null;
		box.click(function(){
			canlederBox = $(_canlederBox);
			
				_buildCanlederBox();
				$("body").append(canlederBox);
          /**

                $(document).click(function(e){
					alert("fdasefdaf");
                    var pointX = e.pageX;
                    var pointY = e.pageY;
                    var $box  = canlederBox.data("box");

                    var isCanlederBox = $(e.target).parents(_canlederBox);

                   
                });
			**/

			
			//canlederBox.css({"top" : boxOffset.top + box_height + 6, "left": boxOffset.left});
			canlederBox.data("box", box); 
            _init();
			
		
		}); 


		

		function _init(){
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			if(box.val()){
				year = box.val().split("-")[0] * 1;
				month = box.val().split("-")[1] * 1;
			}
			//canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(year));
			canlederBox.find(".body li").each(function(){
				if($(this).text() == month){
					$(this).addClass("cur");
				}else{
					$(this).removeClass("cur");
				};
			});
		}

		function _buildCanlederBox(){
			canlederBox = $("<div/>");
			canlederBox.attr("id", "MonthSel");
			
			_buildTitle(canlederBox);
			_buildBody(canlederBox);
			canlederBox.append($("<div/>").addClass("clear"));
		
			
		};
			
		function _getSelect(year){
			if(!year){
                var accYear = $("#acctMonth").val();
                accYear = parseInt(accYear.substring(0,4));
				//year = new Date().getFullYear();
                year = accYear;
			}
			
			
			$select = $("<select/>");
			for(var i = 10; i >=0; i--){
				$select.append($("<option/>").text(year - i ));
			}
			for(var i = 1; i <= 10; i++){
				$select.append($("<option/>").text(year + i ));
			}
			$select.find("option").each(function(){
				if($(this).text() == year){
					$(this).attr("selected", "selected");
				}
			});
            var accMonth = $("#acctMonth").val();
            accMonth =parseInt( accMonth.substring(4));
            var selectHtml = $select.prop('outerHTML');
           // selectHtml +="<span id='monthSpan'>"+accMonth+"月</span>";
            $select = $(selectHtml);
			return $select;
		};

		function _buildTitle(canlederBox){
			var $title =  $("<div/>").addClass("title").append("<ul/>").appendTo(canlederBox);
			var $title_ul = $title.find("ul");
			for(var i = 0; i < 3; i++){
				var $li = $("<li/>").append( $("<div/>").addClass("inner") );
				
				$li.hover(function(){
					$(this).addClass("over");	
				}, function(){
					$(this).removeClass("over");
				});

				$title_ul.append($li);
			}
			var $title_ul_li = $title_ul.find("li");

			$title_ul_li.eq(0).click(function(){
				var year = $select.val();	//$select 在_getSelect()有定义
				canlederBox.find(".body li").each(function(){
				
					$(this).removeClass("cur");
				
			});
				canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(--year));
			}).find("div.inner").text(" < ");
			$title_ul_li.eq(1).addClass("middle").click(function(){
				
			})
			.find("div.inner").addClass("paddingTop").html(_getSelect());

			$title_ul_li.eq(2).click(function(){
				var year = $select.val();	//$select 在_getSelect()有定义
                canlederBox.find(".body li").each(function(){
				
					$(this).removeClass("cur");
				
			});

				canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(++year));
			}).find("div.inner").text(" > ");
		};

		function _buildBody(canlederBox){
            var accMonth = $("#acctMonth").val();
            accMonth = accMonth.substring(5);
			var $body =  $("<div/>").addClass("body").append("<ul/>").appendTo(canlederBox);
			var $body_ul = $body.find("ul");
			for(var i = 0; i < 12; i++){
				var $inner = $("<div/>").addClass("inner").text(i+1+"月");

				var $li = $("<li/>").append($inner).click(function(){
					 
					var year = canlederBox.find(_title_ul_li).eq(1).find("select").val();
					var month = $(this).find("div.inner").text();
					month = month < 10 ? "0" + month : month;
					//edit by lilei,取选择的月份
					canlederBox.data("box").val("选择月份："+year + "年" + month);
					$("#monthSpan").text(month);

				});
				if(i==accMonth*1-1){
                    $li.addClass("over02");

                }
                else{
                    $li.removeClass("over");
                }
				$li.hover(function(){
					 
					$(this).addClass("over");
					
				}, function(){
					$(this).removeClass("over");
					
				});

				$body_ul.append($li);
                /*if(i==(new Date()).getMonth()){
                    $inner.parent().addClass("over02");
                }*/
			}
		};

		function _buildBottom(canlederBox){
			var $button_clear = $("<button/>").addClass("clear").click(function(){
				canlederBox.data("box").val("");
				canlederBox.hide();
			}).text("清空");
			var $bottom = $("<div/>").addClass("bottom").append($button_clear);
			canlederBox.append($bottom);
			
		};
		
	

		 

	};

    $.fn.extend({
        simpleCanleder: function(options) {
            options = $.extend({},options);
            this.each(function() {
				new $.simpleCanleder(this, options);
			});
			return this;
        }
    });
})(jQuery);
