import React, { useState } from 'react';
import IntellijView from './intellij-card.view';
import MessageSenderService from '../../../../services/messageSender.service';


export default function IntellijCard() {
  const messageSender = new MessageSenderService();
  const [loadingIntellij, setLoadingIntellij] = useState(false);

  const handleIntellij = async () => {
    setLoadingIntellij(true);
    await messageSender.openIDE('intellij');
    setLoadingIntellij(false);
  };

  return (
    <IntellijView
      onClick={handleIntellij}
      loading={loadingIntellij}
    ></IntellijView>
  );
}