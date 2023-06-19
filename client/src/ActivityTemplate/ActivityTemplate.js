import './activity-template.scss';
import {Container , Row, Col} from 'react-bootstrap';
import otherProPic from '../Images/headshot.jpg'
import $ from "jquery"
// import {Col} from 'react-bootstrap';

function ActivityTemplate({item}) {

    var toggleDetails = function(value) {
	var $target			= $(value.target)
	var $parent 		= $target.closest('.activity')
	var $detail			= $parent.find('.activity-plan')
	$detail.toggleClass('hidden');
	($detail.hasClass('hidden')) ? updateText(true, $target) : updateText(false, $target)
  };

  var updateText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Plan Details' : 'Hide Plan Details';
	$target.text(text)
  }

  return (
    <article className="root-activity-template">

<Container key={item.id} className="activity">
				<ul>

					<Row>
						<Col xs={4} className="vertical-justify">

							<li className="align-picture">
								<img className='profile-picture' src={otherProPic} alt="Profile"></img>
							</li>
							
							<li className='center-text header-text'>{item.userName}</li>

						</Col>
						<Col xs={8} className="vertical-justify">

							{/* <ActivityTemplate item={item}/> */}

							<li>Activity: <span>{item.name}</span></li>
							
							<li>Time: <span>{item.date} at {item.time}</span></li>
							
							<li>Location: <span>{item.location}</span></li>
							
							<li>Buddies Needed: <span>{item.buddies}</span></li>
						
						</Col>

					</Row>

					<li className="view-plan center-text header-text" onClick={toggleDetails}>View Plan Details</li>

					<li className="hidden center-text activity-plan">{item.plan}</li>

			   </ul>
			   <hr></hr>
			</Container>

    </article>
  );
}

export default ActivityTemplate;