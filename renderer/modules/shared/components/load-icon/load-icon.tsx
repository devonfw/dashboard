import Spinner from '../spinner/spinner';
import SuccessFailIcon from '../success-fail-icon/success-fail-icon';
import { Styles } from '../../types/types';

interface LoadIconProps {
  inProgress?: boolean;
  success?: boolean;
  fontSize?: 'small' | 'inherit' | 'default' | 'large';
}

const sizes: Styles = {
  large: '2.1875rem',
  small: '1.25rem',
  default: '1.5rem',
  inherit: 'inherit',
};

export default function LoadIcon(props: LoadIconProps): JSX.Element {
  const fontSize = props.fontSize ? props.fontSize : 'large';
  const spinnerSize = sizes[fontSize];

  return (
    <>
      {props.inProgress ? (
        <Spinner inProgress size={spinnerSize} />
      ) : props.success ? (
        <SuccessFailIcon success fontSize={fontSize} />
      ) : (
        <SuccessFailIcon fontSize={fontSize} />
      )}
    </>
  );
}
