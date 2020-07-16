import React from 'react';
import IdeCard from '../IdeCard';
import GeneralCardController, {
  RenderedViewProps,
} from '../general/general-card.controller';

export default function VSCodeCard() {
  return <GeneralCardController ide={'vscode'} render={VSCodeView} />;
}

export function VSCodeView(props: RenderedViewProps) {
  return (
    <IdeCard
      image="/assets/vscode.png"
      title="VS Code"
      description="Eclipse contains a base workspace and an extensible plug-in system for customizing the environment."
      onClick={props.onClick}
      loading={props.loading}
    ></IdeCard>
  );
}
