import './CreatePost.scss';
import React, {useState} from 'react';
import Axios from 'axios';
import DateSelector from '../DateSelector/DateSelector.js';
import TimeSelector from '../TimeSelector/TimeSelector.js';
import TextField  from '@mui/material/TextField/TextField';
import {Container , Row, Col} from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';

function CreatePost() {

    const [activityName, setActivityName]	= useState('')
    const [location, setLocation]	        = useState('')
    const [time, setTime]	                = useState('')
    const [plan, setDescription]	    = useState('')
    const [buddies, setBuddies]	            = useState('Any')
    const [date, setDate]	                = useState('')

    var numberOfBuddies = [
        { 
            id:         1,
            value:      '1'
        },
        { 
            id:         2,
            value:      '2'
        },
        { 
            id:         3,
            value:      '3'
        },
        { 
            id:         4,
            value:      '4'
        },
        { 
            id:         5,
            value:      '5'
        },
        { 
            id:         6,  
            value:      '6'
        },
        { 
            id:         7,  
            value:      '7'
        },
        { 
            id:         8,  
            value:      '8'
        },
        { 
            id:         9,  
            value:      '9'
        },
        { 
            id:         10,  
            value:      '10+'
        },
        { 
            id:         11,  
            value:      'Any'
        },
    ];

    var createPost = function() {
        
            var data = {
                activityName:      activityName,
                location:          location,
                plan:       plan,
                time:              time,
                date:              date,
                buddies:           buddies
            }
            
        Axios.post('http://localhost:3001/api/post', data)
    }

    return (
        <article className='root-create-post'>

            <h2>Create an Activity and Buddy Up!</h2>

            <Container>
                <TextField id="activity-name"   className="full-text name" label="Activity Name" variant="outlined" onChange={e => setActivityName(e.target.value)} />
                <TextField id="outlined-basic"  className="full-text location" label="Location" variant="outlined" onChange={e => setLocation(e.target.value)}/>
                <Row>

                    <Col>
                        <DateSelector setDate={setDate}/>
                    </Col>

                    <Col>
                        <TimeSelector setTime={setTime}/>
                    </Col>
                    
                </Row>
                <TextField id="outlined-multiline-static" className="full-text plan" label="Describe Plan" multiline rows={3} onChange={e => setDescription(e.target.value)} />
                <TextField id="outlined-select-currency" className='full-text buddies' select label="Buddies Needed" defaultValue="Any" onChange={e => setBuddies(e.target.value)}>
                    {numberOfBuddies.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Container>

            <button className='button' onClick={createPost}>Create</button>
            <p className='hidden error'>Please Fix Errors Indicated Above</p>

        </article>
    );
  }
  
  export default CreatePost;