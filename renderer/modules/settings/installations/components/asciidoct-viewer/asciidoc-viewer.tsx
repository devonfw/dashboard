import React, { HTMLAttributes } from 'react';
import Asciidoctor from 'asciidoctor';
import LinkOpenerService from '../../../../shared/services/link-opener/link-opener.service';

interface AsciidocViewerProps {
  content: string;
}

function handleOpenInBrowser(parent: HTMLDivElement) {
  const linkOpener = new LinkOpenerService();
  parent.addEventListener('click', (event: MouseEvent) => {
    if (!event.target) {
      return;
    }

    const clicked = event.target as HTMLElement;
    if (clicked.nodeName == 'A') {
      const anchorTag = clicked as HTMLAnchorElement;
      event.preventDefault();
      linkOpener.openLink(anchorTag.href);
    }
  });
}

export default function AsciidocViewer(
  props: AsciidocViewerProps & HTMLAttributes<HTMLDivElement>
): JSX.Element {
  return (
    <div
      ref={(elem) => {
        if (elem) {
          handleOpenInBrowser(elem);
        }
      }}
      {...props}
      dangerouslySetInnerHTML={{
        __html: Asciidoctor().convert(props.content) as string,
      }}
    />
  );
}
