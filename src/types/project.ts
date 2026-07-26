export interface Project {
  id: string;
  name: string;
  tagline?: string;
  blurb: string;
  stack: string[];
  links?: { live?: string; code?: string; demo?: string };
}
