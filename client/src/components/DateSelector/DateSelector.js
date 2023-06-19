import * as React from 'react';
import './DateSelector.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const { convertDate }   = require('../../functions/DateFunctions.js');

export default function DateSelector({setDate}) {

  var setNewDate = function(data) {

    var date = data.$W + '/' + data.$M + '/' + data.$D + '/' +  data.$y

    setDate(convertDate(date))

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