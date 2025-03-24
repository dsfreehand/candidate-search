import {useState, useEffect} from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; 

const SavedCandidates = () => {
 
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      
      <div className="candidate-grid">
        {savedCandidates.length === 0 ? (
          <div className="message">No saved candidates found!</div>
        ) : (
          savedCandidates.map((candidate) => (
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
                <button className="skip-btn" onClick={() => handleRemoveCandidate(candidate.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCandidates;
