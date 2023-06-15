import './CreatePost.scss';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import DateSelector from '../../components/DateSelector/DateSelector.js';
import TimeSelector from '../../components/TimeSelector/TimeSelector.js';
import TextField  from '@mui/material/TextField/TextField';
import {Container , Row, Col} from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import Footer from '../../components/Footer/Footer.js';
import { Routes, Route, Navigate }  from 'react-router-dom';

function CreatePost({userID, setPost}) {

    const [activityName, setActivityName]	= useState('')
    const [location, setLocation]	        = useState('')
    const [time, setTime]	                = useState('')
    const [plan, setDescription]	        = useState('')
    const [buddies, setBuddies]	            = useState('Any')
    const [date, setDate]	                = useState('')
    const [success, setSuccess]	            = useState(false)
    const [userName, setUserName]	        = useState('')
    const [imgURL, setImgURL]	            = useState('')
    console.log(imgURL);

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
                id:                 crypto.randomUUID(),
                name:               activityName,
                location:           location,
                plan:               plan,
                time:               time,
                date:               date,
                buddies:            buddies,
                userID:             userID,
                userName:           userName,
                imgURL:             imgURL
            }
            
        Axios.post('http://localhost:3001/api/activites', data)
        setPost(data)
        setSuccess(true);
        < Navigate to='/success' />
    }
    
    useEffect(() => {
        Axios.post('http://localhost:3001/my-profile', {userID: userID}).then((response) => {
            if (response.data.length === 0) window.location.replace('/build-profile');
            console.log(response.data[0].imgURL)
            setUserName(response.data[0].firstName + ' ' + response.data[0].lastName)
            setImgURL(response.data[0].imgURL)
        })
      }, [userID])

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
            
            {success ? <Navigate to='/success'></Navigate>: ''}

            <p className='hidden error'>Please Fix Errors Indicated Above</p>

        <div className='footer-component'> <Footer /></div>

        </article>
    );
  }
  
  export default CreatePost;