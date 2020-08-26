import React, {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import TextField from '@material-ui/core/TextField';
import { useDashboardSearchStyles } from './dashboard-search.styles';
import {
  ProjectDetails,
  SearchForm,
} from '../../../modules/projects/redux/stepper/data.model';
import { DashboardFilter } from '../dashboard-filter/dashboard-filter';

interface DashboardSearchProps {
  searchRef: MutableRefObject<HTMLInputElement>;
  filterRef: MutableRefObject<HTMLInputElement>;
  value: SearchForm;
  projects: ProjectDetails[];
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DashboardSearch = (props: DashboardSearchProps): JSX.Element => {
  const classes = useDashboardSearchStyles({});
  const [searchValue, setSearchValue] = useState<string>('');
  const onChangeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    props.searchHandler(event);
  };
  const onChangeFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.searchHandler(event);
  };
  useEffect(() => {
    setSearchValue(props.value.searchValue);
  }, [props.value.searchValue]);
  return (
    <div className={classes.header}>
      <h2>{`${props.projects.length} Projects`}</h2>
      <div className={classes.filter}>
        <DashboardFilter
          value={props.value.filterValue}
          filterHandler={onChangeFilterHandler}
          filterRef={props.filterRef}
        />
        <div className="search">
          <TextField
            className={classes.searchBox}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchValue}
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
