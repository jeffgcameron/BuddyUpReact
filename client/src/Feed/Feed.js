import './feed.scss';
import jeffProPic from '../Images/GC.jpg'
import otherProPic from '../Images/headshot.jpg'
import {Container , Row, Col} from 'react-bootstrap';
import $ from "jquery"

function Feed() {

  var activities =[
    {
      	id:           		1,
		img:				jeffProPic,
      	userName:    	 	"Jeff Cameron",
      	activity:     		"Blading",
	  	date:				"Jun 10, 2023",
		time:				"6pm",
	 	location:			"Roadhouse",
	  	buddiesNeeded:		"5",
		details:			"Blading from roadhouse to snowking. Wear church clothing or go to hell"
    },
    {
      	id:           		2,
		img:				otherProPic,
      	userName:    	 	"Joe Shmoe",
      	activity:     		"WW rafting",
	  	date:				"Jun 15, 2023",
		time:				"12pm",
	 	location:			"Prichard",
	  	buddiesNeeded:		"Any",
		details:			"Doing a sceninc and ww float"
    },
  ]

  var toggleDetails = function(value) {
	var $target			= $(value.target)
	var $parent 		= $target.closest('.activity')
	var $detail			= $parent.find('.activity-details')
	$detail.toggleClass('hidden');
	($detail.hasClass('hidden')) ? updateText(true, $target) : updateText(false, $target)
  };

  var updateText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Plan Details' : 'Hide Plan Details';
	$target.text(text)
  }

  return (
    <article className="root-feed">
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.map((item) => (
			<Container key={item.id} className="activity">
				<ul>

					<Row>
						<Col xs={4} className="vertical-justify">

							<li className="align-picture">
								<img className='profile-picture' src={item.img} alt="Profile"></img>
							</li>
							
							<li className='center-text header-text'>{item.userName}</li>

						</Col>
						<Col xs={8} className="vertical-justify">

							<li>Activity: <span>{item.activity}</span></li>
							
							<li>Time: <span>{item.date} at {item.time}</span></li>
							
							<li>Location: <span>{item.location}</span></li>
							
							<li>Buddies Needed: <span>{item.buddiesNeeded}</span></li>
						
						</Col>

					</Row>

					<li className="view-details center-text header-text" onClick={toggleDetails}>View Plan Details</li>

					<li className="hidden activity-details">{item.details}</li>

			   </ul>
			   <hr></hr>
			</Container>
		))} 
    </article>
  );
}

export default Feed;