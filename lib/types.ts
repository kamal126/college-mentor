export interface Mentor {
  _id: string;
  name: string;
  company: string;
  companies: string[];
  experience: number;
  price: number;
  bio: string;
  active: boolean;
  rating?: number;
  skills?: string[];
  avatar?: string;
}


export type Author = {
  name: string;
  img: string;
  role: string;
  online: boolean;
}

export type expert = {
  username: string;
  role: string;
  company: string;
  experience: number;
  price: number;
  bio: string;
  pastCompanies: string;
};
