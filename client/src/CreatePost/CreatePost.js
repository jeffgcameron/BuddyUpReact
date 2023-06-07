import './CreatePost.scss';
import React from 'react';
import $ from 'jquery'
import DateSelector from '../DateSelector/DateSelector.js';
import TimeSelector from '../TimeSelector/TimeSelector.js';
import TextField  from '@mui/material/TextField/TextField';
import {Container , Row, Col} from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';

function CreatePost() {

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

    var _name; 
    var _location; 
    var _description; 
    var _time; 
    var _date; 
    var _buddies; 
    var $location = $('.location')
    var $name = $('.name')
    var $time = $('.time-selector')
    var $date = $('.date-selector')
    var $buddies = $('.buddies')
    var $description = $('.description')

    var createPost = function() {

        var isValid = function(data) {
            console.log(data)

            if (!data.name || data.name.length < 3)                 return false
            if (!data.location || data.location.length < 3)         return false
            if (!data.description || data.description.length < 3)   return false
            if (!data.time || data.time.length < 1)                 return false
            if (!data.date || data.date.length < 1)                 return false
            if (!data.buddies)                                      return false
            return true;
        }
        
        var getValues = function() {

            var date = $('.root-date-selector input')[0].value;
            var time = $('.root-time-selector input')[0].value;

            var data = {
                name:              _name,
                location:          _location,
                description:       _description,
                time:              time,
                date:              date,
                buddies:           _buddies
            }
            if (!isValid(data)) { 
                $('.error').removeClass('hidden');
                return false
            } else {
                $('.error').addClass('hidden');
                // todo post to server
            }

        }

        getValues();
    };

    var handleChange = function(value, field) {

        // var className = '.' + field
        // console.log(className);
        // console.log($(className));
        // var isError = (value.target.value.length < 3) ? true : false;
        // $(className).attr('error', isError)

        // if (isError) return;
        if (field === 'name')           _name                = value.target.value
        if (field === 'location')       _location             = value.target.value
        if (field === 'description')    _description          = value.target.value
        if (field === 'time')           _time                 = value.target.value;
        if (field === 'date')           _date                 = value.target.value;
        if (field === 'buddies')        _buddies              = value.target.value;
        
            
       
    };

    return (
        <article className='root-create-post'>

            <h2>Create an Activity and Buddy Up!</h2>

            <Container>
                <TextField id="activity-name"   className="full-text name" label="Activity Name" variant="outlined" onChange={function(value) {handleChange(value, 'name')}} />
                <TextField id="outlined-basic"  className="full-text location" label="Location" variant="outlined" onChange={function(value) {handleChange(value, 'location')}}/>
                <Row>

                    <Col>
                        <DateSelector error className="date-selector"/>
                    </Col>

                    <Col>
                        <TimeSelector className="time-selector"/>
                    </Col>
                    
                </Row>
                <TextField id="outlined-multiline-static" className="full-text description" label="Describe Plan" multiline rows={3} onChange={function(value) {handleChange(value, 'description')}} />
                <TextField id="outlined-select-currency" className='full-text buddies' select label="Buddies Needed" defaultValue="Any" onChange={function(value) {handleChange(value, 'buddies')}}>
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