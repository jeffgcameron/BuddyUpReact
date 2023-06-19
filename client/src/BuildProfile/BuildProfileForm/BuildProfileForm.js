import './build-profile-form.scss';
import React, {useState} from 'react';
import TextField  from '@mui/material/TextField/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function BuildProfileForm({addItem, AddItemLabel}) {

  var [newItem, setNewItem] = useState('')


  var handleSubmit = function(e) {

		e.preventDefault()
		if (newItem === '') return
    addItem(newItem);

		setNewItem("");

	};

  return (
    <article className="root-build-profile-form">
      <form onSubmit={handleSubmit}>
        <TextField 
          value={newItem} onChange={e => setNewItem(e.target.value)} 
          className="margin-bottom input full-width" 
          label= {AddItemLabel} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}><AddIcon /></IconButton>
              </InputAdornment>
            )
          }}/>
      </form>
    </article>
  );
}

export default BuildProfileForm;