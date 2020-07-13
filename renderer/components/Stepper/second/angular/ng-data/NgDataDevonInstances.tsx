import { useEffect, useState, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { IpcRendererEvent } from 'electron';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface Props {
    onSelected: (option: string) => void;
    devonWorkspace: (dir: string[]) => void
}

const NgDataDevonInstances = (props: Props) => {
    const classes = useStyles();
    const [devonInstances, setDevonInstances] = useState({ value: '' });
    const [allDevonInstances, setAllDevonInstances] = useState<string[]>([]);
    useEffect(() => {
        global.ipcRenderer.send('find:devonfwInstances');
        global.ipcRenderer.on('get:devoninstances', (event: IpcRendererEvent, instancesPath: string[]) => {
            setAllDevonInstances(instancesPath);
            setDevonInstances({ value: instancesPath[0] });
            props.onSelected(instancesPath[0]);
            getWorkspaceProjects(instancesPath[0]);
        });
        global.ipcRenderer.on('get:workspaceProjects', (event: IpcRendererEvent, dirs: string[]) => {
            props.devonWorkspace(dirs);
        });
        return () => {
            global.ipcRenderer.removeAllListeners('get:devoninstances');
            global.ipcRenderer.removeAllListeners('get:workspaceProjects');
        }
    }, []);

    const getWorkspaceProjects = (path: string) => {
        global.ipcRenderer.send('find:workspaceProjects', path);
    }

    const handleChange = (event: ChangeEvent<{ value: any }>) => {
        const devonInstancesOpt = event.target.value as string
        setDevonInstances({ value: devonInstancesOpt });
        props.onSelected(devonInstancesOpt);
        getWorkspaceProjects(devonInstancesOpt);
    };

    const getInstancePaths = (allDevonInstances.map(path => <MenuItem key={path} value={path}>{path}</MenuItem>));

    const step = (
        <>
            <FormControl className={classes.formControl}>
                <TextField
                    id="select-instance-label"
                    select
                    label="Devon Instances"
                    value={devonInstances.value}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {getInstancePaths}
                </TextField>
            </FormControl>
        </>
    );
    return step;
}

export default NgDataDevonInstances;