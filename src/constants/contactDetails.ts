import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  type Icon,
} from '@tabler/icons-react';

export const CONTACT_DETAILS: {
  icon: Icon;
  link: string;
  text: string;
}[] = [
  {
    icon: IconMail,
    link: 'mailto:rpunia229@gmail.com',
    text: 'rpunia229@gmail.com',
  },
  {
    icon: IconBrandGithub,
    link: 'https://github.com/rpunia29',
    text: 'rpunia29',
  },
  {
    icon: IconBrandLinkedin,
    link: 'https://www.linkedin.com/in/rpunia',
    text: 'rpunia',
  },
  {
    icon: IconBrandInstagram,
    link: 'https://www.instagram.com/rpunia229',
    text: 'rpunia229',
  },
];
