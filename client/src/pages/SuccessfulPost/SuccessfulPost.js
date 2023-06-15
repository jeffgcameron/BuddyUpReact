import './successful-post.scss';
import Footer from '../../components/Footer/Footer.js';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'

function SuccessfulPost({post}) {
  return (
    <article className="root-successful-post">
      <h2 className='center-text'>Post Successfully Created!</h2>
      <ActivityTemplate item={post}/>
      <div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default SuccessfulPost;