function ArrContains(a, b) {
	return !!~a.indexOf(b);
}

function getRooster(auth_tok) {

	console.log('will get rooster for ', auth_tok);

	var tmline = [];
	var finalLine = [];

	$.ajax({
		url : '../build/php/form.php',
		type : 'POST',
		data: {'auth': auth_tok},
		dataType : 'json',
		success : function (result) {
			$('#preloader').fadeOut(300);
			for (var i = 0, n = result.length; i < n; i++) {
				tmline.push(result[i]);
				var finalHour = tmline[i].replace(/[\[\]']+/g,'').split(',');
				finalLine.push(finalHour);
			}
			finalLine.sort(function(a,b) {
				return a[0]-b[0];
			});

			var newFL = [].concat(finalLine);

			for (var j = 0, o = finalLine.length; j < o; j++) {
				var temp = finalLine[j][0];
				var newFL_temp2 = [].concat(finalLine);
				newFL_temp2.splice(j, 1);
				for (var k = 0, p = newFL_temp2.length; k < p; k++) {
					var temp2 = newFL_temp2[k][0];
					if (temp === temp2 && finalLine[j] !== finalLine[k]) {
						newFL.splice(k, 1);
					}
				}
			}

			var week = {
				'maandag': {},
				'dinsdag': {},
				'woensdag': {},
				'donderdag': {},
				'vrijdag': {}
			};

			var timeTable = ['8:15', '9:00', '9:45', '10:30', '10:50', '11:35', '12:20', '12:50' ,'13:35', '14:20', '14:40', '15:25', '16:10'];

			for(var b = 0, c = newFL.length; b < c; b++) {
				console.log(moment(parseInt(newFL[b][0])*1000).format("dddd DD-MM H:mm"), newFL[b][3]);
				var currentSubject = newFL[b][3].replace(/['"]+/g, '').toUpperCase();
				var currentLocation = newFL[b][4].replace(/['"]+/g, '');
				var currentTeacher = newFL[b][5].replace(/['"]+/g, '');
				var currentCluster = newFL[b][6].replace(/['"]+/g, '');
				var currentDay = moment(parseInt(newFL[b][0])*1000).format("dddd");
				function addDayContent(day, hour) {
					$('.'+day+' > #uur_'+hour+' > .main > h2').text(currentSubject.substring(0, 4));
					$('.'+day+' > #uur_'+hour+' > .main > h3').text(currentLocation);
					$('.'+day+' > #uur_'+hour+' > .additional > h5:first-child').text(currentTeacher);
					$('.'+day+' > #uur_'+hour+' > .additional > h5:last-child').text(currentCluster);
				}
				if(currentDay === 'Monday') {

					for(var f = 0; f <= 2; f++) {
						$('.maandag > #uur_'+ f +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 4; f <= 5; f++) {
						$('.maandag > #uur_'+ (f-1) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 7; f <= 8; f++) {
						$('.maandag > #uur_'+ (f-2) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 10; f <= 11; f++) {
						$('.maandag > #uur_'+ (f-3) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[0]) {
						addDayContent('maandag', 0);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[1]) {
						addDayContent('maandag', 1);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[2]) {
						addDayContent('maandag', 2);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[4]) {
						addDayContent('maandag', 3);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[5]) {
						addDayContent('maandag', 4);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[7]) {
						addDayContent('maandag', 5);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[8]) {
						addDayContent('maandag', 6);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[10]) {
						addDayContent('maandag', 7);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[11]) {
						addDayContent('maandag', 8);
					}
				} else if(currentDay == 'Tuesday') {

					for(var f = 0; f <= 2; f++) {
						$('.dinsdag > #uur_'+ f +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 4; f <= 5; f++) {
						$('.dinsdag > #uur_'+ (f-1) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 7; f <= 8; f++) {
						$('.dinsdag > #uur_'+ (f-2) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 10; f <= 11; f++) {
						$('.dinsdag > #uur_'+ (f-3) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[0]) {
						addDayContent('dinsdag', 0);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[1]) {
						addDayContent('dinsdag', 1);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[2]) {
						addDayContent('dinsdag', 2);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[4]) {
						addDayContent('dinsdag', 3);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[5]) {
						addDayContent('dinsdag', 4);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[7]) {
						addDayContent('dinsdag', 5);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[8]) {
						addDayContent('dinsdag', 6);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[10]) {
						addDayContent('dinsdag', 7);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[11]) {
						addDayContent('dinsdag', 8);
					}
				} else if(currentDay == 'Wednesday') {

					for(var f = 0; f <= 2; f++) {
						$('.woensdag > #uur_'+ f +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 4; f <= 5; f++) {
						$('.woensdag > #uur_'+ (f-1) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 7; f <= 8; f++) {
						$('.woensdag > #uur_'+ (f-2) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 10; f <= 11; f++) {
						$('.woensdag > #uur_'+ (f-3) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[0]) {
						addDayContent('woensdag', 0);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[1]) {
						addDayContent('woensdag', 1);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[2]) {
						addDayContent('woensdag', 2);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[4]) {
						addDayContent('woensdag', 3);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[5]) {
						addDayContent('woensdag', 4);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[7]) {
						addDayContent('woensdag', 5);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[8]) {
						addDayContent('woensdag', 6);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[10]) {
						addDayContent('woensdag', 7);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[11]) {
						addDayContent('woensdag', 8);
					}
				} else if(currentDay == 'Thursday') {

					for(var f = 0; f <= 2; f++) {
						$('.donderdag > #uur_'+ f +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 4; f <= 5; f++) {
						$('.donderdag > #uur_'+ (f-1) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 7; f <= 8; f++) {
						$('.donderdag > #uur_'+ (f-2) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 10; f <= 11; f++) {
						$('.donderdag > #uur_'+ (f-3) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[0]) {
						addDayContent('donderdag', 0);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[1]) {
						addDayContent('donderdag', 1);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[2]) {
						addDayContent('donderdag', 2);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[4]) {
						addDayContent('donderdag', 3);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[5]) {
						addDayContent('donderdag', 4);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[7]) {
						addDayContent('donderdag', 5);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[8]) {
						addDayContent('donderdag', 6);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[10]) {
						addDayContent('donderdag', 7);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[11]) {
						addDayContent('donderdag', 8);
					}
				} else if(currentDay == 'Friday') {

					for(var f = 0; f <= 2; f++) {
						$('.vrijdag > #uur_'+ f +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 4; f <= 5; f++) {
						$('.vrijdag > #uur_'+ (f-1) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 7; f <= 8; f++) {
						$('.vrijdag > #uur_'+ (f-2) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					for(var f = 10; f <= 11; f++) {
						$('.vrijdag > #uur_'+ (f-3) +' > span').text(timeTable[f] + ' - ' + timeTable[f+1]);
					}

					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[0]) {
						addDayContent('vrijdag', 0);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[1]) {
						addDayContent('vrijdag', 1);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[2]) {
						addDayContent('vrijdag', 2);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[4]) {
						addDayContent('vrijdag', 3);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[5]) {
						addDayContent('vrijdag', 4);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[7]) {
						addDayContent('vrijdag', 5);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[8]) {
						addDayContent('vrijdag', 6);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[10]) {
						addDayContent('vrijdag', 7);
					}
					if(moment(parseInt(newFL[b][0])*1000).format("H:mm") === timeTable[11]) {
						addDayContent('vrijdag', 8);
					}
				}
			}

			console.log(window.innerWidth, window.innerHeight);
		},
		error : function () {
			console.log("error");
		}
	});
}