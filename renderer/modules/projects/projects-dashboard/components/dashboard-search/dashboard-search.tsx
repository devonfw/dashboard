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
import TitleCounter from '../../../../shared/components/title-counter/title-counter';
import { Box } from '@material-ui/core';

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
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      mb={3}
      width={1}
    >
      <TitleCounter count={props.totalProjects} className={classes.counter}>
        Projects
      </TitleCounter>
      <Box component="form" display="flex">
        <DashboardFilter
          value={dashboardSearch.filterValue}
          filterHandler={onChangeSearchHandler}
          filterRef={props.filterRef}
        />
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
      </Box>
    </Box>
  );
};
