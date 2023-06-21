import './edit-post.scss';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Axios from 'axios';
import DateSelector from '../../components/DateSelector/DateSelector.js';
import TimeSelector from '../../components/TimeSelector/TimeSelector.js';
import TextField  from '@mui/material/TextField/TextField';
import {Container , Row, Col} from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import Footer from '../../components/Footer/Footer.js';

function EditPost({userID, setPost}) {

    const [activityName, setActivityName]	= useState('')
    const [location, setLocation]	        = useState('')
    const [time, setTime]	                = useState('')
    const [plan, setPlan]	                = useState('')
    const [buddies, setBuddies]	            = useState('Any')
    const [date, setDate]	                = useState('')

    const { search }                        = useLocation();
    var id                                  = search.split('=')[1]

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

        var data = {
            id:                 id,
            name:               activityName,
            location:           location,
            plan:               plan,
            time:               time,
            date:               date,
            buddies:            buddies,
            userID:             userID,
        }
    var editPost = function() {
            
        Axios.put('http://localhost:3001/edit-post', data);
        window.location.replace('/profile')
    }
    
    useEffect(() => {
        Axios.post('http://localhost:3001/api/get-activity', {id}).then((response) => {
            setActivityName(response.data[0].name)
            setLocation(response.data[0].location)
            setPlan(response.data[0].plan)
            setBuddies(response.data[0].buddies)
            setDate(response.data[0].date)
            setTime(response.data[0].time)
        })
      }, [id])

    return (
        <article className='root-create-post'>

            <h2>Edit Post</h2>

            <Container>
                <TextField id="activity-name" value={activityName} className="full-text name" label="Activity Name" variant="outlined" onChange={e => setActivityName(e.target.value)} />
                <TextField id="outlined-basic" value={location} className="full-text location" label="Location" variant="outlined" onChange={e => setLocation(e.target.value)}/>
                <Row>

                    <Col>
                        <DateSelector setDate={setDate} date={date}/>
                    </Col>

                    <Col>
                        <TimeSelector setTime={setTime} time={time}/>
                    </Col>
                    
                </Row>
                <TextField id="outlined-multiline-static" value={plan} className="full-text plan" label="Describe Plan" multiline rows={3} onChange={e => setPlan(e.target.value)} />
                <TextField id="outlined-select-currency" value={buddies} className='full-text buddies' select label="Buddies Needed" defaultValue="Any" onChange={e => setBuddies(e.target.value)}>
                    {numberOfBuddies.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Container>
            <button className='button' onClick={editPost}>Save</button>
            
            <p className='hidden error'>Please Fix Errors Indicated Above</p>

        <div className='footer-component'> <Footer /></div>

        </article>
    );
  }
  
  export default EditPost;