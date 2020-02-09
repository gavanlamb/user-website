import React from 'react';
import {
    ClickAwayListener,
    createStyles,
    Grow,
    IconButton, List,
    Paper,
    Popper,
    Theme
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import ListItemLink from "./ListItemLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        }
    }),
);

type Props = {
    className?: string
} //& typeof defaultProps;

// const defaultProps = {
//     className: useStyles().menuButton
// };

const User = (props: Props) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return <div className={props.className}>
        <IconButton
            aria-label="account of current user"
            aria-haspopup="true"
            aria-controls={open ? 'menu-list-grow' : undefined}
            ref={anchorRef}
            onClick={handleToggle}
            color="inherit">
            <AccountCircle />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <List aria-label="secondary mailbox folders">
                                <ListItemLink to="/user/profile" primary="Profile" />
                            </List>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </div>
};

//User.defaultProps = defaultProps;

export default User;