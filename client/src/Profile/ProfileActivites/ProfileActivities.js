import './ProfileActivities.scss';
import {Container , Row, Col} from 'react-bootstrap';

function ProfileActivites() {

    var activites = [
        { 
            id:         1,
            name:       'Alpine Skiing'
        },
        { 
            id:         2,
            name:       'Backcountry Skiing'
        },
        { 
            id:         3,
            name:       'Mountain Biking'
        },
        { 
            id:         4,
            name:       'Fly Fishing'
        },
        { 
            id:         5,
            name:       'Roller Blading'
        },
        { 
          id:           6,  
          name:         'Rafting'
        }
    ]

    var certifications = [
        { 
            id:         1,
            name:       'AAIRE Level 1'
        },
        { 
            id:         2,
            name:       'CPR'
        },
        { 
            id:         3,
            name:       'Padi Advanced Open Water'
        }
    ]

    return (
        <article className='root-profile-activities flex-row mb-2'>
            <Container>
                <Row>
                    <Col>
                        <p>Activites</p>    
                        <ul>
                            {activites.map((item) => (
                                <li className='profile-activities' key={item.id}>
                                    {item.name}
                                </li>
                            ))} 
                        </ul>
                    </Col>
                    <Col>
                        <p>Certifications</p>    
                        <ul>
                            {certifications.map((item) => (
                                <li className='profile-certifications' key={item.id}>
                                    {item.name}
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