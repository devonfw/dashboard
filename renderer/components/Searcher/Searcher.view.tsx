import Repository from '../../services/github/models/repository.model';
import RepositoryCard from '../cards/RepositoryCard';
import React, { ChangeEvent } from './node_modules/react';
import { TextField } from './node_modules/@material-ui/core';
import { useSearcherStyles } from './Searcher.styles';

export interface SearcherViewProps {
  query: string;
  handleQuery: (event: ChangeEvent<{ value: unknown }>) => void;
  repositories: Repository[];
}

export default function SearcherView(props: SearcherViewProps) {
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
        {props.repositories.map((repository) => (
          <RepositoryCard {...repository}></RepositoryCard>
        ))}
      </div>
    </>
  );
}
