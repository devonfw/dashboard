import Repository from '../../modules/shared/services/github/models/repository.model';
import RepositoryCard from '../cards/repository-card/RepositoryCard';
import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { useSearcherStyles } from './Searcher.styles';

export interface SearcherViewProps {
  query: string;
  handleQuery: (event: ChangeEvent<{ value: unknown }>) => void;
  repositories: Repository[];
}

export default function SearcherView(props: SearcherViewProps): JSX.Element {
  const classes = useSearcherStyles();

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Search your repository..."
          variant="outlined"
          value={props.query}
          onChange={props.handleQuery}
        />
      </form>
      <div>
        {props.repositories.map((repository: Repository, index: number) => (
          <RepositoryCard {...repository} key={index}></RepositoryCard>
        ))}
      </div>
    </>
  );
}
