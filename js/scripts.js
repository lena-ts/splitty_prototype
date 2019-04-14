$(document).ready(function(){
	indicatorWidth();
// 	goBack();
	groupParameters();
	showGroup();
	backTo();
	groupTabs();
	scrollHeader();
	filterExpenses();
	showAddGroup();
	closeButton();
	addGroup__changeColor();
	addGroup__uncheck();
	addGroup__values();
	addGroup__finish();
	addExpense__values();
	addExpense__finish(); 
	addParticipants();
	addExpense_test();
	
	function indicatorWidth(){	
		var arr = [],
			percentage = [];
		
		$('.group-list__item').each(function(i){
			var value = $(this).find('.group-list__item__title__price span').text();
			arr[i] = value * 1;
		});	
	
	    var max = Math.max.apply(null, arr);
	   
	    $('.group-list__item').each(function(i){
			percentage[i] = (arr[i] * 100)/max;
			 
			$(this).find($('.indicator')).css('width', percentage[i] + '%'); 	   
	    });
    }
   
	function goBack() {
	  $('.js-back-button').click(function(e){
		  e.preventDefault();
		  window.history.back();
	  });
	}
	
	function showGroup() {
		$('.group-list__item').click(function(e){
			e.preventDefault();
			$('.group-item').addClass('visible');
			
			var dataColor = $(this).find($('.indicator')).attr('data-color');
			$('.group-item').attr('data-color', dataColor);
			$('.group-item .group-footer__items').attr('data-color', dataColor);
			$('.group-item').addClass(dataColor);
			
			$('.group-item .js-back-button').click(function(){
				$('.group-item').removeClass(dataColor);
			});
			
			groupParameters($(this));
		});
		 
	}
	
	function backTo(){
		$('.js-back-button').click(function(e){
		  e.preventDefault();
		  $(this).closest($('.screen')).removeClass('visible');
	  	});
	}
	
	function groupParameters(group) {
		var groupName = $(group).find($('.group-list__item__title__name')).text(),
			groupPrice = $(group).find($('.group-list__item__title__price')).text(),
			groupParticipants = $(group).find($('.group-list__item__participants__items')).clone();
			
			$('.group-item').find($('.group-header__title')).text(groupName + ' ' + '-' + ' ' + groupPrice);
// 			$('.group-item').find($('.group-header__total')).text(groupPrice);
			$('.group-item').find($('.group-footer__items')).html(groupParticipants);
			
			addExpense();
			
	}
	
	function groupTabs(){
		$('.group-item').each(function(){
			$('.group-header__tabs__tab').click(function(){
				$(this).siblings().removeClass('active').removeAttr('style');
				$(this).addClass('active');
				
				$('.group-tab-content').toggleClass('active');
			});
		});
	}
	
	
	function scrollHeader() {
    var start_pos = 55;
	    $( "#group-item-overlay" ).scroll(function(){
	        if ($( "#group-item-overlay" ).scrollTop()>=start_pos) {
	            if ($( "#group-item-overlay" ).hasClass()==false) {
	                $( "#group-item-overlay" ).addClass('scroll');
	            }
	        } else {
	            $( "#group-item-overlay" ).removeClass('scroll');
	        }
	    });		
	}
	
	function filterExpenses(){
		$('.group-expenses__filter__items__item').click(function(){
			var dataUser = $(this).attr('data-user'),
				dataUserTitle = $(this).text();
				$('.group-expenses__items h4').text(dataUserTitle);
			
			$('.group-expenses__item').removeClass('inactive');	
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');		
			
			$('.group-expenses__item').each(function(){
				if ( $(this).attr('data-user') !== dataUser ) {
					$(this).toggleClass('inactive');
				}
			});
			
			if ( $(this).attr('data-user') == 'all' ) {
				$('.group-expenses__item').removeClass('inactive');
			}			
			
			
		});
	}
	
	function showAddGroup(){
		$('.js-add-group-action').click(function(e){
			e.preventDefault();
			$('#group-add').addClass('visible');
			
		});
	}
	
	function closeButton(){
		$('.js-close-biutton').click(function(){
			$(this).closest( $('.closable-screen') ).removeClass('visible');
			$(this).closest( $('.closable-screen') ).attr('data-color', 'red');
			
		  $('.group-add__color-list li').removeClass('active');
		  $('.group-add__color-list li').eq(0).addClass('active');			
		})
	}
	
	function addGroup__changeColor() {
		$('.group-add__color-list li').click(function(){
			$('.group-add__color-list li').removeClass('active');
			$(this).addClass('active');
			
			function colorProp(color) {
				$('.group-add ').attr('data-color', color);
			}
			
			if ( $(this).attr('data-color') == 'red' ) {
				colorProp('red');
			}
			if ( $(this).attr('data-color') == 'blue' ) {
				colorProp('blue');
			}
			if ( $(this).attr('data-color') == 'green' ) {
				colorProp('green');
			}						
			if ( $(this).attr('data-color') == 'yellow' ) {
				colorProp('yellow');
			}			
			
		});	
	}
	
	function addGroup__uncheck() {
		$('.group-add__participants .group-list__item__participants__items__item').click(function(){
			$(this).toggleClass('checked');
		});
	}
	
	function addGroup__values() {
		$('.group-add .group-name input').keydown(function(){
			if ($(this).val()) {
				$('.js-create-group-action').removeClass('disabled');
			}
		});
	}		
	
	function addGroup__finish() {
		$('.js-create-group-action').click(function(){
			$('#group-add').removeClass('visible');
			
			$('.group-add .group-name input').removeAttr('value');
			$('.group-add .group-name input').val('');			
		});
	}
	
	
	function addExpense() {
		$('.group-footer__items .group-list__item__participants__items__item').click(function(){
			$('.group-expenses-add').addClass('visible');
			
			var userContent = $(this).html(),
				groupColor = $(this).parent().parent().attr('data-color');
				
			$('.group-expenses-add').attr('data-color', groupColor);
			$('.group-expenses-add .user-name').html(userContent);		
			
		});
	}
	
	function addExpense__finish() {
		$('.js-create-expense-action').click(function(){	
			$('.group-expenses-add').removeClass('visible');
			$('.group-expenses-add').removeAttr('data-color');
			$('.group-expenses-add__description input').removeAttr('value');
			$('.group-expenses-add__description input').val('');
			$('.js-create-expense-action').addClass('disabled'); 
		});
	}
	
	function addExpense__values() {
		$('.group-expenses-add__description input').keydown(function(){
			var val = $(this).val();
			$(this).attr('value', val);  
			
			if  ($('.group-expenses-add__description input[type="text"]').val() && $('.group-expenses-add__description input[type="number"]').val()) {
				$('.js-create-expense-action').removeClass('disabled');
			}			
		}); 	
	}
	
	function addParticipants() {
		$('.js-add-participants').click(function(){
		    $('#group-add').animate({
		        scrollTop: $("#group-color").offset().top
		    }, 1000);
		});
	}
	
	function addExpense_test() {
		$(window).scroll(function(){
			if ($(window).scrollTop()>=100) {
				$('.group-expenses-add-single .screen-header').addClass('scrolled');
			}
			else {
				$('.group-expenses-add-single .screen-header').removeClass('scrolled');
			}
		});
		
		$('.edit-sums').click(function(){
			$('.edit-block').slideToggle();
			$(this).toggleClass('show');
		});
		
/*
		var val = $('.group-expenses-add__description-price input').val();
		
		$('.group-expenses-add__description-price input').on('keyup', function(){
			console.log(val);
			val = '$' + $(this).val();
		});
*/
	}
});