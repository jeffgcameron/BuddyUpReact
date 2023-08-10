import React, {useState, useEffect} from 'react';
import './DateSelector.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelector({setDate, date}) {

  var setNewDate = function(data) {
    var newDate = data.$M + 1 + '/' + data.$D + '/' +  data.$y
    setDate(newDate)
  }

  return (
    <article className="root-date-selector">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        
          {date 
          ?   <DatePicker label="Date" onChange={e => setNewDate(e)}/>
          :   <DatePicker label="Date" onChange={e => setNewDate(e)}/>
        }
        </DemoContainer>
      </LocalizationProvider>
    </article>
  );
}