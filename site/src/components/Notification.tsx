import React from 'react';
import Badge from "@material-ui/core/Badge/Badge";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {IconButton, Menu} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         menuButton: {
//             marginRight: theme.spacing(2),
//         }
//     }),
// );

type Props = {
    className?: string
} //& typeof defaultProps;

// const defaultProps = {
//     className: useStyles().menuButton
// };

const Notification = (props: Props) => {
    let activeNotifications = [];
    return <div className={props.className}>
        <IconButton
            aria-label={"show " + activeNotifications.length + " new notifications"}
            color="inherit">
            <Badge
                badgeContent={activeNotifications.length}
                color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
        <Menu
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={'primary-account-menu'}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={false}>
        </Menu>
    </div>;
};

//Notification.defaultProps = defaultProps;

export default Notification;