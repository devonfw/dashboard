import ResponsiveDrawer from '../components/responsive-drawer/ResponsiveDrawer';
import Head from 'next/head';

const styles = { padding: '2rem 0 2rem 1rem', backgroundColor: '#4CBDEC' };

const SpaceAround = (props: { children: any, changeBgColor: boolean }) => {
    const spaceAroundStyles = !props.changeBgColor ? styles : {...styles, backgroundColor: '#F4F6F8', height: '100%'}
    return (
        <div style={spaceAroundStyles}>
            {props.children}
        </div>
    )
};

export default SpaceAround