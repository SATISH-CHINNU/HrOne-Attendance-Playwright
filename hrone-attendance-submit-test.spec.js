const { test, expect } = require('@playwright/test');
const config = require('../config.js');
const { LoginPage } = require('../PageObjects/login-page.js');
const { DashboardPopupIframes } = require('../PageObjects/dashboard-popup-iframes.js');
const { UserInfo} = require('../PageObjects/user-info.js');
const { AttendanceCalendarData } = require('../PageObjects/attendance-calendar-data.js');
const { SelectOnDutyDates } = require('../PageObjects/select-on-duty-dates.js');
const { TimeUpdateAndSubmit } = require('../PageObjects/time-update-and-submit.js');




const loginUser = config.loginUser;
const onDutyReason = config.onDutyReason;
const comments = config.comments;



test.only('HrOne_portal', async ({ page }) => {

    //--- Login Flow ---
  const loginPage = new LoginPage(page);
  await loginPage.goTO();
  await loginPage.validLogin(loginUser.userName, loginUser.password);

  const dashboardPopupIframes = new DashboardPopupIframes(page);
  await dashboardPopupIframes.closeDialogs();

  // --- User Info ---
  const hrOne = new UserInfo(page);
  const userInfo = await hrOne.getUserInfo();
  console.log('Name:', userInfo.name);
  console.log('Employee ID:', userInfo.empId);
  console.log('Email:', userInfo.email);
  
  // --- Attendance Calendar ---
  const AttendanceCalendar = new AttendanceCalendarData(page);
  const calendarData = await AttendanceCalendar.getCalendarData();
  const month = (await AttendanceCalendar.month).trim();
  const year = (await AttendanceCalendar.year).trim();

  console.log('Attendance day Month Year:', calendarData.today[0], month, year);
  console.log('Calendar Data:', calendarData);


    //ON DUTY Application
  const selectOnDutyDates = new SelectOnDutyDates(page);
  await selectOnDutyDates.applyOnDuty(calendarData.absentDays[0], onDutyReason, comments);


  const timeUpdateAndSubmit = new TimeUpdateAndSubmit(page);
  await timeUpdateAndSubmit.submitAttendance();

  await page.waitForTimeout(5000);


});