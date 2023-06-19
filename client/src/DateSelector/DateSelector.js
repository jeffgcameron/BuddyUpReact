import * as React from 'react';
import './DateSelector.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelector({setDate}) {

  var setNewDate = function(data) {

    // var getShortMonth = function() {
    //     if (data.$M === 1) return 'Jan';
    //     if (data.$M === 2) return 'Feb';
    //     if (data.$M === 3) return 'Mar';
    //     if (data.$M === 4) return 'Apr';
    //     if (data.$M === 5) return 'May';
    //     if (data.$M === 6) return 'Jun';
    //     if (data.$M === 7) return 'Jul';
    //     if (data.$M === 8) return 'Aug';
    //     if (data.$M === 9) return 'Sep';
    //     if (data.$M === 10) return 'Oct';
    //     if (data.$M === 11) return 'Nov';
    //    return 'Dec';
    // }

    // var getDayOfWeek = function() {
    //   if (data.$W === 1) return 'Mon';
    //   if (data.$W === 1) return 'Tue';
    //   if (data.$W === 1) return 'Wed';
    //   if (data.$W === 1) return 'Thu';
    //   if (data.$W === 1) return 'Fri';
    //   if (data.$W === 1) return 'Sat';
    //   return 'Sun'
    // }

    // var time = {
    //   month:        data.$M,
    //   // shortMonth:   getShortMonth(),
    //   day:          data.$D,
    //   // dayOfWeek:    getDayOfWeek(),
    //   year:         data.$y
    // }

    var time = data.$M + data.$D + data.$y

    setDate(time)

  }

  return (
    <article className="root-date-selector">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Date"  onChange={e => setNewDate(e)}/>
        </DemoContainer>
      </LocalizationProvider>
    </article>
  );
}