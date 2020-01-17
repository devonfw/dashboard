import React from 'react';
import IdeCard from '../IdeCard';
import GeneralCardController, {
  RenderedViewProps,
} from '../general/general-card.controller';

export default function EclipseCard() {
  return (
    <GeneralCardController
      ide={'eclipse'}
      render={EclipseView}
    />
  );
}

function EclipseView(props: RenderedViewProps) {
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
