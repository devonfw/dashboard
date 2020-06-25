import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles({
    ideDetails: {
        minHeight: 100,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '6px',
        display: 'flex',
        fontSize: '20px',
        justifyContent: 'space-evenly',
        color: '#0075B3',
        paddingTop: '1em'
    },
    showChartIcon: {
        fontWeight: 'bold',
        color: '#4CBDEC'
    },
    projectDetails: {
        display: 'flex',
        flexDirection: 'column',
        color: '#0075B3',
        width: '60%'
    }
})

interface Projects {
    name: string;
    count: number;
}


export default function ViewDashboardProjectsDetail(props: { title: string, total: number }) {
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <div className={classes.ideDetails}>
                <div className={classes.projectDetails}>
                    <span style={{ fontWeight: 'bold' }}>{props.title}</span>
                    <span>
                        {props.total}
                    </span>
                </div>
                <div>
                    <ShowChartIcon className={classes.showChartIcon} fontSize="large" />
                </div>
            </div>
        </Grid>
    )
}