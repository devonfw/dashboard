import { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpContent from './help-content/help-content';

const useStylesHtmlTooltip = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.secondary.main,
  },
  tooltip: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '8px',
  },
}));

export default function Help(): JSX.Element {
  const classes = useStylesHtmlTooltip();
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
