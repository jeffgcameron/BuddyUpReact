import './feed.scss';
import React, {useState, useEffect} from 'react';
import ActivityTemplate from '../ActivityTemplate/ActivityTemplate.js'
import jeffProPic from '../images/GC.jpg'
import otherProPic from '../images/headshot.jpg'
import Footer from '../Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivites] = useState([])
  console.log(activities);

  useEffect(() => {
	Axios.get('http://localhost:3001/api/get-activites').then((response) => {
		setActivites(response.data);
	})

	Axios.post('http://localhost:3001/my-profile', {userID: userID}).then((response) => {
		if (response.data.length === 0) window.location.replace('/build-profile');
		console.log(response);
	})
  }, [userID])

  return (
    <article className="root-feed">
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.map((item) => (
			<ActivityTemplate item={item}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;