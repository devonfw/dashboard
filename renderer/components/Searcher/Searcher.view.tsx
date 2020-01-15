import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import RepositoryCard from '../cards/RepositoryCard';
import Repository from '../../models/repository.model';

export interface SearcherViewProps {
  query: string;
  handleQuery: (event: ChangeEvent<{ value: unknown }>) => void;
  repositories: Repository[];
}

export default function SearcherView(props: SearcherViewProps) {
  return (
    <>
      <form noValidate autoComplete="off">
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
