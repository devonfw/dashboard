import { useState } from 'react';
import MessageSenderService from '../../../../modules/shared/services/renderer/messageSender.service';

export interface RenderedViewProps {
  onClick: () => void;
  loading: boolean;
}
export interface GeneralCardControllerProps {
  render: (props: RenderedViewProps) => JSX.Element;
  ide: string;
}

export default function GeneralCardController(
  props: GeneralCardControllerProps
): JSX.Element {
  const messageSender = new MessageSenderService();
  const [loading, setLoading] = useState(false);

  const handleOpenIde = async () => {
    setLoading(true);
    await messageSender.openIDE(props.ide);
    setLoading(false);
  };

  return props.render({ onClick: handleOpenIde, loading: loading });
}
