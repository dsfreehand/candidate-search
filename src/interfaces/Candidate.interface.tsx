// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    name: string;
    login: string;
    id: number;
    avatar_url: string;
    location: string;
    email: string;
    company: string;
    html_url: string;
    
}

export type { Candidate };