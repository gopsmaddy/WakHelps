function doomsday(month, day, year) {
   var numd, numm, numy, isLeap, cal, cent, year, Q, R, S, dday, cdday, wday;

   numd = parseFloat(day);
   numm = parseFloat(month);
   numy = parseFloat(year);

   /* Test for Leap Year */
   isLeap = 0;
   if (numy % 400 == 0) isLeap = 1;
   else if (numy % 100 == 0) isLeap = 0;
   else if (numy % 4 == 0) isLeap = 1;

   /* Test if Date Exists */

   // wrong number of days in the month;
   if ((numm == 1 || numm == 3 || numm == 5 || numm == 7 || numm == 8 || numm == 10 || numm == 12) && (numd<1 || numd>31)) cal = 0;
   if ((numm == 4 || numm == 6 || numm == 9 || numm == 11) && (numd<1 || numd>30)) cal = 0;

   // February problems;
   if (numm == 2 && isLeap == 0 && (numd<1 || numd>28)) cal = 0;
   if (numm == 2 && isLeap == 1 && (numd<1 || numd>29)) cal = 0;

   if (numm<1 || numm>12) cal = 0 // invalid month;

   /* Extract Century and Year */
   year = numy;
   while (year > 100) year = year - 100;
   cent = (numy-year) / 100;
   cent = cent % 4;

   /* Gregorian Day of Week */
   if (cent == 0) cdday = 2;
   if (cent == 1) cdday = 0;
   if (cent == 2) cdday = 5;
   if (cent == 3) cdday = 3;

   Q = Math.floor(year/12);
   R = year%12;
   S = Math.floor(R/4);
   dday = (Q+R+S+cdday)%7;

   if (numm == 1) wday = (numd-4+35);
   if (numm == 2) wday = (numd-29+35);
   if (numm == 3) wday = (numd+35);
   if (numm == 5) wday = (numd-9+35);
   if (numm == 7) wday = (numd-11+35);
   if (numm == 9) wday = (numd-5+35);
   if (numm == 11) wday = (numd-7+35);

   if (numm <= 2 && isLeap == 0) wday++;
   if (numm >= 4 && numm % 2 == 0) wday = (numd-numm+35);

   wday = wday % 7;
   wday = (wday + dday) % 7;

   return wday;
}