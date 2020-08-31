import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpContent from './help-content/help-content';
import useHelpStyles from './help.styles';

export default function Help(): JSX.Element {
  const classes = useHelpStyles();
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        arrow
        classes={classes}
        PopperProps={{ disablePortal: true }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<HelpContent />}
      >
        <IconButton
          onClick={handleTooltipOpen}
          color="inherit"
          aria-label="Help"
        >
          <HelpOutlineIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
}
