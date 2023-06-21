import './search-bar.scss';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({setSearchTerm}) {
  return (
    <article className='root-search-bar'>
      <Paper 
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search For User, Activity, or Location"
          inputProps={{ 'aria-label': 'search for activities' }}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </article>
  );
}