$(document).ready(function(){
    // Add id row table
    var i=1
    // $('.table tr.table_line').each(function(){
    //   $(this).attr('id','z_'+i++)
    // })

  // validate

  $('[name=count]').bind("change keyup input click", function() {if (this.value.match(/[^0-9]/g)) {this.value = this.value.replace(/[^0-9]/g, '');}});
  $('[name=price]').bind("change keyup input click", function() {if (this.value.match(/[^0-9\.\,]/g)) {this.value = this.value.replace(/[^0-9\.\,]/g, '');}});

  $('[name=search]').bind("change keyup input click", function() {if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');}});
 
    
    $(document).submit('#fromadd',function(event) {
        validation('#fromadd')
        
        event.preventDefault();
        return false; 
      });
      $(document).on('click','.Edit',function () {
        $('#addnew').modal('show')
        $('#addnew .close').hide()
        var parent = $(this).parents('.table_line')
        var nameU = parent.children('.name').children('.name').text()
        var countU = parent.children('.name').children('.badge').text()
        var priceU = parent.children('.price').children('span').text()
        Updade('#fromadd',nameU,countU,priceU)
        parent.remove()
        $('#addnew .close').hide()
        $('.Edit').attr('disabled',"disabled")
        $('#fromadd button').text('Upload')
        $('#addnewLabel').text('Upload')
      })

      $(document).on('click','.Delite',function () {
        $('#confirm').modal('show')
        var parent = $(this).parents('.table_line')
        $(document).on('click','#delline', function () {
            parent.remove()
        })
      })
      
      $(document).on('click','#search .btn',function(){
        var _this = 'input#search';
        $.each($(".table tbody tr"), function() {
          if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide()
          } else {
            $(this).show();               
          }
        })
      })
})


// create line table
function AddTableLine(name,count,price){
    var table = $('.table tbody')
    var firstT = '<tr class="table_line"><td class="name">'
    var nameT = '<span class="name">'+name+'</span>'
    var countT = '<b class="badge">'+count+'</b></td>'
    var priceT = '<td class="price">$<span>'+price+'</span></td>'
    var lastT = '<td><button class="btn btn-warning Edit">Edit</button><button class="btn btn-danger Delite">Delite</button></td>'
    var addTLine = firstT+nameT+countT+priceT+lastT
    table.append(addTLine)
}

// updata table line
function Updade(idform,name,count,price){
    $(idform+' input[name="name"]').val( name )
    $(idform+' input[name="count"]').val( count )
    $(idform+' input[name="price"]').val( price )
}

function validation(idform){
    var name = $(idform+' input[name="name"]').val()
    var count = $(idform+' input[name="count"]').val()
    var price = $(idform+' input[name="price"]').val()
    if(name === '' || count === '' || price === ''){
        validateOption('input[name="name"]')
        validateOption('input[name="count"]')
        validateOption('input[name="price"]')
    }else{
      validateOption('input[name="name"]')
        validateOption('input[name="count"]')
        validateOption('input[name="price"]')
      if($('input[name="name"]').hasClass('not_error') == true && $('input[name="count"]').hasClass('not_error') == true && $('input[name="price"]').hasClass('not_error') == true ){
        // price = Number(price).toLocaleString('en')
        price = String(price)
        $('.Edit').removeAttr('disabled')
        $('#fromadd button').text('Add')
        $('#addnewLabel').text('Add New')
        AddTableLine(name,count,price)
        $('#addnew').modal('hide')
        $('#table').tsort();
      }
    }
}


$('input#name, input#price, input#count').unbind().blur( function(){
     validateOption(this)
 });
 $(document).on('blur','input#price',function(){
  var valitem = $(this).val()
  var number_string = Number(valitem).toLocaleString('en')
  $(this).val(number_string)
})
$(document).on('focus','input#price',function(){
  var valitem = $(this).val()
  if(valitem)
  var valitem = parseFloat(valitem.replace(/,/g, ''))
  $(this).val(valitem)
})
function validateOption(item) {

  var item = $(item)
  var idattr = item.attr('id')
  var valitem = item.val()

  switch(idattr)
   {
         // Проверка поля "Имя"
         case 'name':
            var rv_name = /^[a-zA-Zа-яА-Я]{1}[a-zA-Zа-яА-Я0-9\s]+$/
            var limit = 15

            if(valitem.length > 2 && valitem != '' && rv_name.test(valitem) && valitem.length < limit && valitem.length[0] != ' ')
            {
              item.addClass('not_error');
              item.parent().removeClass('has-error')
              item.next('.error-box').html('').css('color','green')
                                         .animate({'paddingLeft':'10px'},400)
                                         .animate({'paddingLeft':'5px'},400)
            }

            else
            {
              item.removeClass('not_error').parent().addClass('has-error');
              item.next('.error-box').html('This field is required or invalid field. Must not exceed 15 characters')
                                          .css('color','red')
                                          .animate({'paddingLeft':'10px'},400)
                                          .animate({'paddingLeft':'5px'},400)
                // Поле обязательно для заполнения или некорректное поле. Не должно превышать более 15 символов
            }
        break;
        case 'count':
          if(valitem != '')
          {
            item.addClass('not_error');
            item.parent().removeClass('has-error')
            item.next('.error-box').html('').css('color','green').animate({'paddingLeft':'10px'},400).animate({'paddingLeft':'5px'},400)
          }
          else
          {
            item.removeClass('not_error').parent().addClass('has-error');
            item.next('.error-box').html('This field is required or invalid')
                                        .css('color','red')
                                        .animate({'paddingLeft':'10px'},400)
                                        .animate({'paddingLeft':'5px'},400)
            // Поле обязательно для заполнения или некорректное поле.
          }
        break;
        case 'price':
            if(valitem != '')
            {
              item.addClass('not_error');
              item.parent().removeClass('has-error')
              item.next('.error-box').html('').css('color','green').animate({'paddingLeft':'10px'},400).animate({'paddingLeft':'5px'},400)
              
              item.val(valitem)
            }

            else
            {
              item.removeClass('not_error').parent().addClass('has-error');
              item.next('.error-box').html('This field is required or invalid')
                                          .css('color','red')
                                          .animate({'paddingLeft':'10px'},400)
                                          .animate({'paddingLeft':'5px'},400)
              // Поле обязательно для заполнения или некорректное поле.
            }
           
        break;
   } 
}



// sort table
(function($){
	$.fn.tsort=function(){
		var
			v=function(e,i){
        return $(e).children('td').children('span').eq(i).text().split(" ").join("").split(",").join("")
      },
			c=function(i){return function(a,b){var k=v(a,i),m=v(b,i);return $.isNumeric(k)&&$.isNumeric(m)?k-m:k.localeCompare(m)}};
		this.each(function(){
			var
				th=$(this).children('thead').first().find('tr > td > span'),
				tb=$(this).children('tbody').first();

			th.click(function(){
				var r=tb.children('tr').toArray().sort(c($(this).index()));
        th.removeClass('sel'),$(this).addClass('sel').toggleClass('asc').html('&#x25B2;');
        if($(this).hasClass('asc')){
          $(this).html('&#x25BC;')
        }
				if($(this).hasClass('asc'))r=r.reverse();
          for(var i=0;i<r.length;i++)tb.append(r[i])
        })
		})
	}
})(jQuery);

$( document ).ready(function() {
	$('#table').tsort();
})