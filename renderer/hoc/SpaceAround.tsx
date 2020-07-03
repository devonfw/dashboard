import ResponsiveDrawer from '../components/responsive-drawer/ResponsiveDrawer';
import Head from 'next/head';

const styles = { padding: '2rem 0 2rem 1rem', backgroundColor: '#4CBDEC' };

const SpaceAround = (props: { children: any, bgColor: string }) => {
    const spaceAroundStyles = !props.bgColor ? styles : {...styles, backgroundColor: props.bgColor}
    return (
        <div style={spaceAroundStyles}>
            {props.children}
        </div>
    )
};

export default SpaceAround