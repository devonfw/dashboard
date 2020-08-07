import { useState, useEffect } from 'react';
import { Channel } from '../../../../shared/services/renderer/renderer.service';
import {
  messageSender,
  ProjectData,
} from '../../../../shared/services/renderer/messageSender.service';

interface ProjectCreatorProps {
  projectData: ProjectData;
}

export default function ProjectCreator(
  props: ProjectCreatorProps
): JSX.Element {
  const [logMessages, setLogMessages] = useState<Channel[]>([]);

  useEffect(() => {
    const observable = messageSender.createProject(props.projectData);
    observable.subscribe(
      (message) => {
        setLogMessages((prev) => [...prev, { status: 'data', data: message }]);
      },
      (err) => {
        setLogMessages((prev) => [...prev, { status: 'error', data: err }]);
      }
    );

    return () => {
      observable.unsubscribe();
    };
  }, []);

  return (
    <div>
      {logMessages.map((message, index) => (
        <p key={index}>{message.data}</p>
      ))}
    </div>
  );
}
