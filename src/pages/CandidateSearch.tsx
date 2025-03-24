import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Import the Candidate interface

const CandidateSearch = () => {
  // Set types for the state variables
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Typed as Candidate[]
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // Typed as Candidate[]
  const [message, setMessage] = useState<string>(''); // Message to display when no candidates are found

  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub();
      if (fetchedCandidates.length > 0) {
        setCandidates(fetchedCandidates);
      } else {
        setMessage('No more candidates available');
      }
    };

    fetchCandidates(); // Ensure fetchCandidates is called inside useEffect
  }, []); // Empty dependency array ensures this runs once after initial render

  // Function to save a candidate
  const saveCandidate = (candidate: Candidate) => {
    const updatedSavedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  // Function to skip a candidate
  const skipCandidate = () => {
    setCandidates((prev) => prev.slice(1)); // Remove the first candidate
  };

  return (
    <main>
      {message ? (
        <div className="message">{message}</div>
      ) : (
        <div className="candidate-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                className="candidate-avatar"
              />
              <h3>{candidate.login}</h3>
              <p>{candidate.name}</p>
              <p>{candidate.location}</p>
              <p>{candidate.email}</p>
              <p>{candidate.company}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <div className="candidate-buttons">
                <button className="save-btn" onClick={() => saveCandidate(candidate)}>
                  +
                </button>
                <button className="skip-btn" onClick={skipCandidate}>
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CandidateSearch;
