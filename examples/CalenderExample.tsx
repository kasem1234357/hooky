"use client";
import React from "react";
import useCalender from "@/hooks/useCalender";

const CalendarExample = () => {
    
  const {
    numberDaysInMonth,
    dayOfTheMonth,
    getDayName,
    getMonthName,
    fullDate,
    months,
    days,
    Names,
    currentYear,
    currentMonth,
    currentDay,
    numberDaysInPreviosMonth,
    globalInfo,
    stepBackward,
    stepForward,
  } = useCalender();

  const info = globalInfo();
  const [date, setDate] = React.useState({
        year: info.currentYear,
        month: info.monthIndex,
        day: info.currentDay.index
  })
  // Example of stepping forward and backward
  const nextDay = stepForward(info.currentDay.index, info.monthIndex, info.currentYear);
  const previousDay = stepBackward(info.currentDay.index, info.monthIndex, info.currentYear);

  return (
    <div>
      <h2>useCalender Hook Example</h2>
      <h3>Basic Information</h3>
      <p>Full Date: {fullDate}</p>
      <div className="flex flex-row gap-2">
      <p className="p-2 bg-slate-800 rounded-md">Current Year: {currentYear}</p>
      <p className="p-2 bg-slate-800 rounded-md">Current Month: {currentMonth.name}</p>
      <p className="p-2 bg-slate-800 rounded-md">Current Day: {currentDay.name}</p>
      </div>
     

      <h2>Month and Day Names</h2>
      <p>Get Month Name (Short): {getMonthName(info.monthIndex, "En", "short")}</p>
      <p>Get Month Name (Long): {getMonthName(info.monthIndex, "En", "long")}</p>
      <p>Get Day Name (Short): {getDayName(info.dayIndexOfTheWeek, "En", "short")}</p>
      <p>Get Day Name (Long): {getDayName(info.dayIndexOfTheWeek, "En", "long")}</p>

      <h2>Number of Days</h2>
      <p>Days in Current Month: {numberDaysInMonth(info.currentYear, info.monthIndex)}</p>
      <p>Days in Previous Month: {numberDaysInPreviosMonth(info.currentYear, info.monthIndex)}</p>
      <p>First Day of the month: {dayOfTheMonth(info.currentYear, info.monthIndex).name}</p>

      <h2>Global Information</h2>
      <p>Start Day of the Month: {info.startDayOfTheMonth.name}</p>
      <p>Days in Current Month: {info.daysOfTheMonth}</p>

      <h2>Step Navigation</h2>
      
      <p>date: {date.year} {Names.short.En.months[date.month]} {date.day}</p>
      <div className="flex gap-2">
      <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
        const dateBack = stepBackward(date.day, date.month, date.year);
        setDate({
            year: dateBack.year,
            month: dateBack.monthIndex,
            day: dateBack.dayIndex

        })
      }}>back</button><button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
        const dateNext = stepForward(date.day, date.month, date.year);
        setDate({
            year: dateNext.year,
            month: dateNext.monthIndex,
            day: dateNext.dayIndex

        })
      }}>next</button>
      </div>
      
    </div>
  );
};

export default CalendarExample;
