import './time-selector.scss'
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
const { convertTime }   = require('../../functions/DateFunctions.js');

export default function TimeSelector({setTime}) {

  return (
    <article className='root-time-selector'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
            <TimePicker label="Time" onChange={e => setTime(convertTime(e))} />
        </DemoContainer>
        </LocalizationProvider>
    </article>
  );
}