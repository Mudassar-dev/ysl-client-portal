import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics.svg'),
  },
  {
    title: 'assets',
    path: '/assets',
    icon: icon('assets-icon.png'),
  },
  {
    title: 'ats',
    path: '/ats',
    icon: icon('ats-icon.png'),
  },
  {
    title: 'billing',
    path: '/billing',
    icon: icon('billing-icon.png'),
  },
];

export default navConfig;
