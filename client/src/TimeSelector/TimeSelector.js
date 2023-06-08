import './time-selector.scss'
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimeSelector({setTime}) {

  var setNewTime = function(data) {
    var hour                  = data.$H;
    var minutes               = data.$m;
    var minutesPastMidnight   = hour * 60 + minutes;
    var time = {
      hour:                   hour,
      minutes:                minutes,
      minutesPastMidnight:    minutesPastMidnight
    }
   setTime(time);
  };

  return (
    <article className='root-time-selector'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
            <TimePicker label="Time" onChange={e => setNewTime(e)} />
        </DemoContainer>
        </LocalizationProvider>
    </article>
  );
}