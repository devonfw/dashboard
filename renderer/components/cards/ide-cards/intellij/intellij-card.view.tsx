import React from 'react';
import IdeCard from '../IdeCard';
import GeneralCardController, {
  RenderedViewProps,
} from '../general/general-card.controller';

export default function IntellijCard(): JSX.Element {
  return <GeneralCardController ide={'intellij'} render={IntellijView} />;
}

function IntellijView(props: RenderedViewProps) {
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
