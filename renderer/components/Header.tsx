import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
};

const Header = (): JSX.Element => (
  <div>
    <Link href="/start">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
