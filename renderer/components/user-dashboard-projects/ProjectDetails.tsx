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


export default function ProjectDetails(props: { projects: Projects[] }) {
    const classes = useStyles();
    const projects = props.projects;
    return (
        projects.map((project, index) =>
            <Grid item xs={4} key={index}>
                <div className={classes.ideDetails}>
                    <div className={classes.projectDetails}>
                        <span style={{fontWeight: 'bold'}}>{project.name}</span>
                        <span>
                            {project.count}
                        </span>
                    </div>
                    <div>
                        <ShowChartIcon className={classes.showChartIcon} fontSize="large" />
                    </div>
                </div>
            </Grid>
        )
    )
}