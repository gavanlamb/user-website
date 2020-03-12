import React, {useState} from 'react';
import Badge from "@material-ui/core/Badge/Badge";
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createStyles,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Popover,
    Theme,
    ListItemSecondaryAction,
} from "@material-ui/core";
import {DeleteNotification, FetchNotifications} from "../Clients/NotificationClient";
import {Notification} from "../Models/Notification";
import {useAsyncEffect} from "use-async-effect";
import {makeStyles} from "@material-ui/core/styles";

// TODO investigate makeStyles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        notificationCard:{
            width:400,
            maxWidth: 400
        },
        notificationCardHeader:{
            textAlign:'center'
        },
        notificationListItem:{
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        typography: {
            padding: theme.spacing(2),
        },
    }),
);

const NotificationComponent = () => {
    const classes = useStyles();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    useAsyncEffect(async () => {
        try {
            const response = await FetchNotifications();
            setNotifications(response);
        } catch(error){
            console.log(`Error encountered while ${error}`)
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(notifications.length > 0){
            setAnchorEl(event.currentTarget);
        }
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const dismissAllNotifications = async () => {
        handlePopoverClose();
        setNotifications([]);

        const deleteNotificationPromises = [];
        for (const notification of notifications){
            deleteNotificationPromises.push(DeleteNotification(notification.id));
        }

        await Promise.all(deleteNotificationPromises);
    };

    const dismissNotification = async (id:string) => {
        if(notifications.length === 1){
            handlePopoverClose();
        }
        setNotifications(notifications.filter(notification => notification.id !== id));
        await DeleteNotification(id);
    };

    return <div className={classes.menuButton}>
        <IconButton
            aria-label={"show " + notifications.length + " new notifications"}
            color="inherit"
            onClick={handleClick}>
            <Badge
                badgeContent={notifications.length}
                color="secondary">
                <NotificationsIcon/>
            </Badge>
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
            <Card className={classes.notificationCard}>
                <CardHeader
                    title="Notifications"
                    className={classes.notificationCardHeader}/>
                <Divider/>
                <CardContent style={{padding: 0}}>
                    <List style={{padding: 0, maxHeight: 500, overflow: 'auto'}} >
                        {notifications.map((notification, i) => {
                            return <>
                                <ListItem className={classes.notificationListItem}>
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.body}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={async () => {await dismissNotification(notification.id)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </>
                        })}
                    </List>
                </CardContent>
                <CardActions>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Button size="small" onClick={async () => {await dismissAllNotifications()}}>
                            Dismiss All
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        </Popover>
    </div>;
};

export default NotificationComponent;