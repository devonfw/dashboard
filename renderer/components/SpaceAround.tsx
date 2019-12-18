import ResponsiveDrawer from './ResponsiveDrawer/ResponsiveDrawer';
import Head from 'next/head';

const styles = { padding: '2rem 1rem' };

const SpaceAround = (props: { children: any }) => (
    <div style={styles}>
        {props.children}
    </div>
);

export default SpaceAround