$('#overlay').hide();
$('#preloader').hide();
$('.info_koppel').hide();

$('.help').click(function(event) {
	$('.main_koppel').hide();
	$('.info_koppel').show();
});

$('.back').click(function(event) {
	$('.info_koppel').hide();
	$('.main_koppel').show();
});

$('#overlay').click(function() {
	$('#overlay').hide();
	if($('#koppel').val() === '') {
		$('#koppel_l').removeClass('active');
	}
	if($('#lln_koppel').val() === '') {
		$('#lln_koppel_l').removeClass('active');
	}
});

$('.koppel_form').click(function(event){
	if($('#koppel').val() === '') {
		$('#koppel_l').removeClass('active');
	}
	if($('#lln_koppel').val() === '') {
		$('#lln_koppel_l').removeClass('active');
	}
	event.stopPropagation();
});

// $('#week').click(function() {
// 	$('.flex-week').addClass('week-view');
// });


// Koppecode doesnt work, overlay click, not body

$('input').click(function() {
	event.stopPropagation();
	$this = $(this);
	$this.next().addClass('active');
});

$('body').click(function() {
	if($('input').val() === '') {
		$('label').removeClass('active');
	}
});

$('label').click(function(event){
	event.stopPropagation();
});
