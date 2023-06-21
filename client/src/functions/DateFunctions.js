
function convertDate(date) {                    // W/MM/DD/YYYY

    console.log(date);

    var getDayOfWeek = function(data) {
      if (data === 1) return 'Mon';
      if (data === 2) return 'Tue';
      if (data === 3) return 'Wed';
      if (data === 4) return 'Thu';
      if (data === 5) return 'Fri';
      if (data === 6) return 'Sat';
      return 'Sun'
    }

    var getShortMonth = function(data) {
        if (data === 1) return 'Jan';
        if (data === 2) return 'Feb';
        if (data === 3) return 'Mar';
        if (data === 4) return 'Apr';
        if (data === 5) return 'May';
        if (data === 6) return 'Jun';
        if (data === 7) return 'Jul';
        if (data === 8) return 'Aug';
        if (data === 9) return 'Sep';
        if (data === 10) return 'Oct';
        if (data === 11) return 'Nov';
       return 'Dec';
    }

    var parts = date.split('/')
    var dayOfWeek = getDayOfWeek(parts[0])
    var month = getShortMonth(parts[1])
    var newDate = dayOfWeek + ' ' + month + ' ' + parts[2] + ', ' + parts[3];
    return newDate
}

function convertTime(data) {                    // in minutes past midnight

    console.log(data)

    var setAMPM = function(hour) {
        if (hour < 13) return 'AM';
        return 'PM';
      }
    
      var setHour = function(data) {
        if (data > 13) return data - 12;
        return data;
      }
    
      var setMinutes = function(data) {
        if (data < 10) return '0' + data
        return data
      }

    var hour                  = setHour(data.$H);
    var minutes               = setMinutes(data.$m);
    var AMPM                  = setAMPM(data.$H)
    var time                  = hour + ':' + minutes + ' ' + AMPM
    return time;
}

module.exports = { convertDate, convertTime }