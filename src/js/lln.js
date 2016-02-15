$('#lln_form').submit(function(e) {
	var lidLength = $('#lid').val().toString().length;
	if(lidLength === 6) {
		$.post(
			'../build/php/db.php',
			{'l_id': $("#lid").val()},
			function(data) {
				var better_data = JSON.parse(data);
				console.log(better_data[0]);
				if (better_data[0] === false) {
					$('#overlay').show();
					if($('#lid').val() !== '') {
						$('#lln_koppel').val($('#lid').val());
						$("#lln_koppel + label").addClass('active');
					}
				} else {
					$('#preloader').show();
					getRooster(better_data[1]);
				}
			}
		);
	} else {
		// Kleur shit (error shit)
	}
	
	return false;
});