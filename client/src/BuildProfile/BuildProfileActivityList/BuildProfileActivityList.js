import './build-profile-activity-list.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Row, Col} from 'react-bootstrap';


function BuildProfileActivityList({deleteItem, items}) {
  return (
    <article className="root-build-profile-activity-list">
        <ul>
			{items.map(item => {
				return (
					<li key={item.id} className="full-width">
            <Row>
              <Col xs={1}>
                <DeleteForeverIcon onClick={() => deleteItem(item.id)} />
              </Col>
              <Col>
                {item.title}
              </Col>
            </Row>
					</li>
				)
			})}
		</ul>
    </article>
  );
}

export default BuildProfileActivityList;