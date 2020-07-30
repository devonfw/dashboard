import Grid from '@material-ui/core/Grid';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { useDashboardDetailsStyles } from './ViewDashboardProjectsDetail.styles';

interface Projects {
  name: string;
  count: number;
}

export default function ViewDashboardProjectsDetail(props: {
  title: string;
  total: number;
}): JSX.Element {
  const classes = useDashboardDetailsStyles();
  return (
    <Grid item xs={4}>
      <div className={classes.ideDetails}>
        <div className={classes.projectDetails}>
          <span style={{ fontWeight: 'bold' }}>{props.title}</span>
          <span>{props.total}</span>
        </div>
        <div>
          <ShowChartIcon className={classes.showChartIcon} fontSize="large" />
        </div>
      </div>
    </Grid>
  );
}
