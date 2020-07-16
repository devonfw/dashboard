import NgType from './angular/NgType';
import JavaType from './java/JavaType';
import NodeType from './node/NodeType';

const TypeStep = () => {
  return (
    <>
      <div className={'types-container'}>
        <div className={'type'}>
          <NgType></NgType>
        </div>
        <div className={'type'}>
          <JavaType></JavaType>
        </div>
        <div className={'type'}>
          <NodeType></NodeType>
        </div>
      </div>
      <style jsx>
        {`
          .types-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .type:not(:last-child) {
            padding-right: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default TypeStep;
