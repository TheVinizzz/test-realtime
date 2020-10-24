import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Box, makeStyles, Typography} from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        display: 'flex'
    },
    avatar: {
        height: 32,
        width: 32
    },
    image: {
        cursor: 'pointer',
        height: 'auto',
        maxWidth: '100%',
        width: 380
    }
}));

function MessageSkeleton({
    className,
                    isAuthor,
                     ...rest
                 }) {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box
                display="flex"
                maxWidth={500}
                ml={isAuthor ? 'auto' : 0}
            >
                <Box ml={2}>
                    <Box
                        bgcolor={'background.default' }
                        py={1}
                        px={2}
                        borderRadius="borderRadius"
                        boxShadow={1}
                    >
                        { !isAuthor ? <Skeleton width={155} />
                            : <></>
                        }
                        <Box mt={1}>
                                <Skeleton width={190} />
                                <Skeleton width={220} />
                                <Skeleton width={160} />
                        </Box>
                    </Box>
                    <Box
                        mt={1}
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Typography
                            noWrap
                            color="textSecondary"
                            variant="caption"
                        >
                            <Skeleton/>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

MessageSkeleton.propTypes = {
    className: PropTypes.string,
};

export default MessageSkeleton;
