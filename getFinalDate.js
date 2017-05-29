function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

function stringToTime(str) {
	var a =  str.split('/');
	var temp = a[0];
	a[0] = a[1];
	a[1] = temp;
	return  new Date(a.join('/'));
}

function getFullListOfWeekendsDays(weekends) {
	var weekendsArray = [];
	for(var i = 0; i<weekends.length; i++) {
	  var start = weekends[i].start_date;
	  var end = weekends[i].end_date;
	  weekendsArray.push(start);
	  if (start == end){
	    continue;
	  }
	  while(start.getTime()!=end.getTime()) {
	    start = addDays(start, 1);
	    weekendsArray.push(start);
	  }
	}
	return weekendsArray;
}

function getWorkDays(startDate, duration, weekendsArray) {
	var workDaysArray = [];
	while(workDaysArray.length!=duration) {

    var isWeekend = weekendsArray.some(x=> x.getTime()===startDate.getTime());
	  if (isWeekend){
	    startDate = addDays(startDate, 1);
	    continue;
	  }
	  workDaysArray.push(startDate);
	  startDate = addDays(startDate, 1);
	}
	return workDaysArray;
}

function DurationExcludingWeekends(startDate, duration, weekends) {
	
	var weekendsArray = getFullListOfWeekendsDays(weekends);
	var workDaysArray = getWorkDays(startDate, duration, weekendsArray);
	return workDaysArray[workDaysArray.length-1];
}

function DurationExcludingWeekendsAdapter(startDate, duration, weekends) {
	startDate = stringToTime(startDate);
	weekends.map(x=>{x.start_date = stringToTime(x.start_date), x.end_date = stringToTime(x.end_date)});
	var finalDate = DurationExcludingWeekends(startDate, duration, weekends);
		return ('0' + finalDate.getDate()).slice(-2) + '/'
             + ('0' + (finalDate.getMonth()+1)).slice(-2) + '/'
             + finalDate.getFullYear();
}

startDate = '21/04/2017';
var ob1 = {start_date: '23/04/2017', end_date: '25/04/2017'};
var ob2 = {start_date: '27/04/2017', end_date: '30/04/2017'};
weekends = [];
weekends.push(ob1);
weekends.push(ob2);
duration = 5;
console.log(DurationExcludingWeekendsAdapter(startDate, duration, weekends));

