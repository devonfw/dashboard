import React, { useState } from 'react';
import MessageSenderService from '../../../../services/renderer/messageSender.service';

export interface RenderedViewProps {
  onClick: () => void;
  loading: boolean;
}
export interface GeneralCardControllerProps {
  render: (props: RenderedViewProps) => JSX.Element;
  ide: string;
}

export default function GeneralCardController(
  props: GeneralCardControllerProps,
) {
  const messageSender = new MessageSenderService();
  const [loadingEclipse, setLoadingEclipse] = useState(false);

  const handleEclipse = async () => {
    setLoadingEclipse(true);
    await messageSender.openIDE(props.ide);
    setLoadingEclipse(false);
  };

  return props.render({ onClick: handleEclipse, loading: loadingEclipse });
}
