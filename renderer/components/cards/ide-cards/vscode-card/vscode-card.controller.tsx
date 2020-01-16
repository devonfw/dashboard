import React, { useState } from 'react';
import VSCodeView from './vscode-card.view';
import MessageSenderService from '../../../../services/renderer/messageSender.service';


export default function VSCodeCard() {
  const messageSender = new MessageSenderService();
  const [loadingVSC, setLoadingVSC] = useState(false);

  const handleVSC = async () => {
    setLoadingVSC(true);
    await messageSender.openIDE('vscode');
    setLoadingVSC(false);
  };

  return (
    <VSCodeView
      onClick={handleVSC}
      loading={loadingVSC}
    ></VSCodeView>
  );
}