import './ProfileActivities.scss';
import {Container , Row, Col} from 'react-bootstrap';

function ProfileActivites({myProfile}) {

    if (!myProfile.activities)          myProfile.activities = []
    if (!myProfile.certifications)      myProfile.certifications = []

    return (
        <article className='root-profile-activities flex-row mb-2'>
            <Container>
                <Row>
                    <Col>
                        <p className='style-text'>Activites</p>    
                        <ul>
                            {myProfile.activities.map((item) => (
                                <li className='profile-activities' key={item}>
                                    {item}
                                </li>
                            ))} 
                        </ul>
                    </Col>
                    <Col>
                        <p className='style-text'>Certifications</p>    
                        <ul>
                            {myProfile.certifications.map((item) => (
                                <li className='profile-certifications' key={item}>
                                    {item}
                                </li>
                             ))} 
                        </ul>
                    </Col>
                </Row>
            </Container>

        </article>
    )
}

export default ProfileActivites;