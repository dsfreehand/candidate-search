import { Link } from 'react-router-dom'; // Import Link component

const Nav = () => {
  return (
    <nav>
      <ul>

        <li>
          <Link to="/">Search</Link> {/* Link to the CandidateSearch page (which is at root "/") */}
        </li>
        <li>
          <Link to="/SavedCandidates">Saved Candidates</Link> {/* Link to SavedCandidates page */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
