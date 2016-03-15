function arrayContains(a, b) {
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
			console.log(result);
			$('#preloader').fadeOut(300);

			var roosterData = result;

			roosterData.sort(function(a, b) {
				return parseFloat(a.weekDay) - parseFloat(b.weekDay);
			});

			roosterData.sort(function(a, b) {
				return parseFloat(a.start) - parseFloat(b.start);
			});

			var roosterDayOffset = 29700;
			var roosterDayLength = 28500;

			var days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'];

			var now = new Date();
			var weekDay = now.getDay();

			for(var i = 0, n = roosterData.length; i < n; i++) {
				var tempArray = roosterData[i];
				tempArray['reducedUnixStart'] = tempArray['start'] - tempArray['baseUnix'] - roosterDayOffset;
				tempArray['reducedUnixEnd'] = tempArray['end'] - tempArray['baseUnix'] - roosterDayOffset;
				tempArray['calculatedHeight'] = (tempArray['reducedUnixEnd'] - tempArray['reducedUnixStart']) / roosterDayLength;
				tempArray['calculatedMarginTop'] = tempArray['reducedUnixStart'] / roosterDayLength;
			}

			var notLastBlocks = [];

			for(var i = 0, n = roosterData.length; i < n; i++) {
				var newEl = document.createElement('DIV');
				roosterData[i]['DomNode'] = newEl;

				newEl.id = 'uur';
				newEl.innerHTML = roosterData[i]['subject'] + ', ';
				newEl.innerHTML += moment(roosterData[i]['start'] * 1000).format('H:mm') + '-';
				newEl.innerHTML += moment(roosterData[i]['end'] * 1000).format('H:mm');
				document.getElementById(days[roosterData[i]['weekDay'] - 1]).appendChild(newEl);

				newEl.style.height = roosterData[i]['calculatedHeight'] * (window.innerHeight - 148) + 'px';
				newEl.style.top = roosterData[i]['calculatedMarginTop'] * (window.innerHeight - 148) + 'px';
				newEl.style.zIndex = '2';
				newEl.style.borderBottom = '1px solid #E0E0E0';

				var compareRoosterData = JSON.parse(JSON.stringify(roosterData));
				compareRoosterData.splice(i, 1);

				for(var j = 0, o = compareRoosterData.length; j < o; j++) {
					var tempArray = roosterData[i];
					var tempCompArray = compareRoosterData[j];
					if(tempArray['weekDay'] === tempCompArray['weekDay'] && tempArray['end'] === tempCompArray['start']) {
						notLastBlocks.push(j);
					}
				}

				if(roosterData[i]['cancelled'] === true) {
					newEl.style.backgroundColor = 'rgba(244, 67, 54, 0.3)';
					newEl.style.zIndex = '1';
				}
			}

			for(var i = 0, n = roosterData.length; i < n; i++) {
				if(!arrayContains(notLastBlocks, i)) roosterData[i]['DomNode'].style.borderBottom = '0';
			}
		},
		error : function () {
			console.log("error");
		}
	});
}
