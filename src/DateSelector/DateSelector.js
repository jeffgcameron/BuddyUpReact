import * as React from 'react';
import './DateSelector.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelector() {
  // const [value, setValue] = React.useState(null);

  return (
    <article className="root-date-selector">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          {/* <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> */}
          <DatePicker label="Date"/>
        </DemoContainer>
      </LocalizationProvider>
    </article>
  );
}