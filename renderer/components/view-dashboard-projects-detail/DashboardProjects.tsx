import React, { Component } from 'react';
import NextLink from '../responsive-drawer/navigation/nextjs-link/NextLink';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Folder from '@material-ui/icons/Folder';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiPaper-elevation1': {
            boxShadow: 'none'
        },
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            textDecoration: 'none'
        },
        '& .MuiButton-root:hover': {
            backgroundColor: 'transparent'
        },
        '& .MuiTypography-h6': {
            fontSize: '14px'
        }
    },
    newProject: {
        width: '211px',
        height: '159px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#495057',
        padding: '0 3em 3em 0',
        '& h3': {
            margin: 0
        },
        '& .search': {
            width: '250px'
        },
        '& .MuiFormControl-root': {
            width: '100%'
        }
    }
});

interface DashboardProjects {
    icon: string;
    title: string;
    date: string;
}

interface AllProjects {
    projects: DashboardProjects[]
}

export default function DashboardProjects(props: { projects: AllProjects }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item xs={12} className={classes.header}>
                <h3>15 Projects</h3>
                <div className="search"><TextField id="outlined-basic" label="Search" variant="outlined" /></div>
            </Grid>
            <Grid item xs={3}>
                <Card component={NextLink} href="/start">
                    <CardMedia
                        className={classes.newProject}
                        image="/assets/add_new_project.png"
                        title="Add new Project"
                    />
                    <CardContent>
                        <Typography component="h6" variant="h6">
                            Add New Project
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {props.projects.map((project, index) =>
                <Grid item xs={3} key={index}>
                    <Card>
                        <CardMedia
                            className={classes.newProject}
                            image={project.icon}
                            title={project.title}
                        />
                        <CardContent>
                            <Typography component="h6" variant="h6">
                                <div>{project.title}</div>
                                <div>{project.date}</div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>)
            }
        </div>
    )
}