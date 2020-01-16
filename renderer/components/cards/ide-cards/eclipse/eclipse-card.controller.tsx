import React, { useState } from 'react';
import EclipseView from './eclipse-card.view';
import MessageSenderService from '../../../../services/renderer/messageSender.service';


export default function EclipseCard() {
  const messageSender = new MessageSenderService();
  const [loadingEclipse, setLoadingEclipse] = useState(false);

  const handleEclipse = async () => {
    setLoadingEclipse(true);
    await messageSender.openIDE('eclipse');
    setLoadingEclipse(false);
  };

  return (
    <EclipseView
      onClick={handleEclipse}
      loading={loadingEclipse}
    ></EclipseView>
  );
}