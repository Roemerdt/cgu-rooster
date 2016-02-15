$('#koppel_form').submit(function(e) {
	var lln_in = $("#lln_koppel").val();
	var koppel_in = $("#koppel").val();
	var koppelLength = koppel_in.toString().length;
	var llnLength = lln_in.toString().length;
	console.log(lln_in, koppel_in, koppelLength, llnLength);

	if(koppelLength === 15 && llnLength === 6) {
		$('#preloader').show();
		$.post(
			'../build/php/koppel.php',
			{'k_id': $("#koppel").val().replace(/\s/g, ''), 'lln': $("#lln_koppel").val()},
			function(data) {
				$('#overlay').hide();
				console.log($("#lln_koppel").val(), data.substring(33, 59));
				$.post(
					'../build/php/auth.php',
					{'auth': data.substring(33, 59), 'lln': $("#lln_koppel").val()},
					function(data) {
						$('#lln_form').submit();
					}
				);
			}
		);
	} else {
		// Kleur form shit (error message)
	}
	
	return false;
});