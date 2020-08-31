import React, {
  ChangeEvent,
  useState,
  useEffect,
  useContext,
  MutableRefObject,
} from 'react';
import TextField from '@material-ui/core/TextField';
import { useDashboardSearchStyles } from './dashboard-search.styles';
import { SearchForm } from '../../../redux/stepper/data.model';
import { DashboardFilter } from '../dashboard-filter/dashboard-filter';
import { StepperContext } from '../../../redux/stepper/stepperContext';

interface DashboardSearchProps {
  searchRef: MutableRefObject<HTMLInputElement>;
  filterRef: MutableRefObject<HTMLInputElement>;
  totalProjects: number;
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DashboardSearch = (props: DashboardSearchProps): JSX.Element => {
  const initialSearchFormState = {
    searchValue: '',
    filterValue: 'name',
  };
  const { state } = useContext(StepperContext);
  useEffect(() => {
    if (state.projectData.path) {
      setDashboardSearch(initialSearchFormState);
    }
  }, [state]);
  const classes = useDashboardSearchStyles({});
  const [dashboardSearch, setDashboardSearch] = useState<SearchForm>(
    initialSearchFormState
  );
  const onChangeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'search') {
      setDashboardSearch({
        ...dashboardSearch,
        searchValue: event.target.value,
      });
    } else {
      setDashboardSearch({
        ...dashboardSearch,
        filterValue: event.target.value,
      });
    }
    props.searchHandler(event);
  };

  return (
    <div className={classes.header}>
      <h2
        className={classes.totalProjects}
      >{`${props.totalProjects} Projects`}</h2>
      <div className={classes.filter}>
        <DashboardFilter
          value={dashboardSearch.filterValue}
          filterHandler={onChangeSearchHandler}
          filterRef={props.filterRef}
        />
        <div className="search">
          <TextField
            className={classes.searchBox}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={dashboardSearch.searchValue}
            inputRef={props.searchRef}
            onChange={onChangeSearchHandler}
            inputProps={{
              id: 'search',
            }}
          />
        </div>
      </div>
    </div>
  );
};
