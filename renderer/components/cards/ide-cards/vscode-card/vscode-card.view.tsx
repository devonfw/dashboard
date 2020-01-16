import React from 'react';
import IdeCard from '../IdeCard';

export interface VSCodeViewProps {
  onClick: () => void;
  loading: boolean;
}

export default function VSCodeView(props: VSCodeViewProps) {
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
