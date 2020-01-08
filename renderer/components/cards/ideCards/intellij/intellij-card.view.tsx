import React from 'react';
import IdeCard from '../IdeCard';

export interface IntellijViewProps {
  onClick: () => void;
  loading: boolean;
}

export default function IntellijView(props: IntellijViewProps) {
  return (
    <IdeCard
      image="/assets/intellij.png"
      title="Intellij"
      description="Its powerful static code analysis and ergonomic design makes development a productive and enjoyable experience."
      onClick={props.onClick}
      loading={props.loading}
    ></IdeCard>
  );
}
