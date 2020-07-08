import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const projectCardStyle = (theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginLeft: theme.spacing(2),
            },
            display: 'flex',
            'flex-direction': 'column',
            '& .MuiFormControl-root': {
                width: '40em'
            },
            '& .formControl': {
                marginTop: '1em'
            },
            '& .project': {
                paddingLeft: '8px'
            }
        },
        action: {
            marginTop: '1em',
            marginLeft: '24px',
            display: 'flex',
            '& button': {
                marginRight: '1em',
                width: '75px'
            },
            '& .MuiButton-containedSizeSmall': {
                padding: '7px 10px'
            }
        },
        invalid: {
            '& label': {
                color: 'red !important'
            },
            '& input': {
                color: 'red !important'
            },
            '& fieldset': {
                border: '1px solid red !important'
            }
        },
        error: {
            color: 'red'
        }
    });

const ngDataStyle = makeStyles(projectCardStyle)

export default ngDataStyle;