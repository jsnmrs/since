var date = new Date('January, 1 2018 00:00:00');

function liveCount() {
  document.getElementById('since').textContent = since(date);
}
setInterval(liveCount, 1000);

function since(date) {
  var secondDiff = 0;
  var minuteDiff = 0;
  var hourDiff = 0;
  var dayDiff = 0;
  var monthDiff = 0;
  var yearDiff = 0;
  var remainder = 0;
  var now = new Date();
  var response = "";

  if (now.getSeconds() >= date.getSeconds()) {
    secondDiff = now.getSeconds() - date.getSeconds();
  } else {
    secondDiff = 60 + now.getSeconds() - date.getSeconds();
    remainder = 1;
  }

  if (now.getMinutes() >= (date.getMinutes() + remainder)) {
    minuteDiff = now.getMinutes() - (date.getMinutes() + remainder);
    remainder = 0;
  } else {
    minuteDiff = 60 + now.getMinutes() - (date.getMinutes() + remainder);
    remainder = 1;
  }

  if (now.getHours() >= (date.getHours() + remainder)) {
    hourDiff = now.getHours() - (date.getHours() + remainder);
    remainder = 0;
  } else {
    hourDiff = 24 + now.getHours() - (date.getHours() + remainder);
    remainder = 1;
  }

  if (now.getDate() >= (date.getDate() + remainder)) {
    dayDiff = now.getDate() - (date.getDate() + remainder);
    remainder = 0;
  } else {
    var monthLength = 0;

    if (date.getMonth() + 1 == 1) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 2) {
      if (isLeap(date.getYear())) {
        monthLength = 29;
      } else {
        monthLength = 28;
      }
    }
    if (date.getMonth() + 1 == 3) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 4) {
      monthLength = 30;
    }
    if (date.getMonth() + 1 == 5) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 6) {
      monthLength = 30;
    }
    if (date.getMonth() + 1 == 7) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 8) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 9) {
      monthLength = 30;
    }
    if (date.getMonth() + 1 == 10) {
      monthLength = 31;
    }
    if (date.getMonth() + 1 == 11) {
      monthLength = 30;
    }
    if (date.getMonth() + 1 == 12) {
      monthLength = 31;
    }
    dayDiff = monthLength + now.getDate() - (date.getDate() + remainder);
    remainder = 1;
  }

  if (now.getMonth() >= (date.getMonth() + remainder)) {
    monthDiff = now.getMonth() - (date.getMonth() + remainder);
    remainder = 0;
  } else {
    monthDiff = 12 + now.getMonth() - (date.getMonth() + remainder);
    remainder = 1;
  }

  yearDiff = now.getYear() - (date.getYear() + remainder);

  if (yearDiff == 1) {
    response += yearDiff + " year, ";
  } else if (yearDiff > 1) {
    response += yearDiff + " years, ";
  }

  if (monthDiff == 1) {
    response += monthDiff + " month, ";
  } else if (monthDiff > 1) {
    response += monthDiff + " months, ";
  }

  if (dayDiff == 1) {
    response += dayDiff + " day, ";
  } else if (dayDiff > 1) {
    response += dayDiff + " days, ";
  }

  if (hourDiff == 1) {
    response += hourDiff + " hour, ";
  } else if (hourDiff > 1) {
    response += hourDiff + " hours, ";
  }

  if (minuteDiff == 1) {
    response += minuteDiff + " minute, ";
  } else if (minuteDiff > 1) {
    response += minuteDiff + " minutes, ";
  }

  if (secondDiff == 1) {
    response += secondDiff + " second";
  } else if (secondDiff > 1) {
    response += secondDiff + " seconds";
  }

  return response;
}

function isLeap(year) {
  if (year % 4 === 0) {
    if ((year % 100 === 0) && (year % 400 !== 0)) {
      return 0;
    } else {
      return 1;
    }
  }
  return 0;
}
