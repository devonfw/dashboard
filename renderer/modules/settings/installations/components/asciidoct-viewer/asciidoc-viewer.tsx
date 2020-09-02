import React, { HTMLAttributes } from 'react';
import Asciidoctor from 'asciidoctor';

interface AsciidocViewerProps {
  content: string;
}

export default function AsciidocViewer(
  props: AsciidocViewerProps & HTMLAttributes<HTMLDivElement>
): JSX.Element {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: Asciidoctor().convert(props.content) as string,
      }}
    />
  );
}
