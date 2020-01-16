import React from 'react';
import IdeCard from '../IdeCard';

export interface EclipseViewProps {
  onClick: () => void;
  loading: boolean;
}

export default function EclipseView(props: EclipseViewProps) {

  return (
    <IdeCard
      image="/assets/eclipse.png"
      title="Eclipse IDE"
      description="Eclipse contains a base workspace and an extensible plug-in system for customizing the environment."
      onClick={props.onClick}
      loading={props.loading}
    ></IdeCard>
  );
}
