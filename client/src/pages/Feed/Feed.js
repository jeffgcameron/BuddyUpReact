import './feed.scss';
import React, {useState, useEffect} from 'react';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'
import Footer from '../../components/Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivites] = useState([])

  useEffect(() => {
	Axios.get('http://localhost:3001/api/get-activites').then((response) => {
		setActivites(response.data);
	})

	Axios.post('http://localhost:3001/my-profile', {userID: userID}).then((response) => {
		if (response.data.length === 0) window.location.replace('/build-profile');
		console.log(response);
	})
  }, [])

  return (
    <article className="root-feed">
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.map((item) => (
			<ActivityTemplate key={item.id} item={item} signedInUserID={userID}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;