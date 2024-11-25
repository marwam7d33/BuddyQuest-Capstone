import { Link } from 'react-router-dom';
import './Home.scss'

function Home() {
  return <>
  <h1>Home!</h1>
  <ul>
    <li><div>Walking</div></li>
    <li><div>Running</div></li>
  </ul>

  <div>
    <Link to='/journal'>Journal</Link>

  </div>

  </>
}

export default Home;
