import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Home',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Create Charity',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
    disabled: true,
  },
];