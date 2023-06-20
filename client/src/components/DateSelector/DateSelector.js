import * as React from 'react';
import './DateSelector.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const { convertDate }   = require('../../functions/DateFunctions.js');

export default function DateSelector({setDate, date}) {

  var setNewDate = function(data) {
    // console.log(data)

    // var date = data.$W + '/' + data.$M + '/' + data.$D + '/' +  data.$y

    // setDate(convertDate(date))
    setDate(data.$d)

  }

  // console.log(date)
  // var object = 'Thu Jun 22 2023 00:00:00 GMT-0600 (Mountain Daylight Time) '
  // date = object.toISOString()

  return (
    <article className="root-date-selector">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        
          {date 
          ?   <DatePicker label="Date" onChange={e => setNewDate(e)}/>
          :   <DatePicker label="Date"  onChange={e => setNewDate(e)}/>
        }
         {/* <DatePicker label="Date"  onChange={e => setNewDate(e)}/> */}
        </DemoContainer>
      </LocalizationProvider>
    </article>
  );
}