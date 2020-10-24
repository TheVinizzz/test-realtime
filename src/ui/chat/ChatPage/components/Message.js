import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {Lightbox} from 'react-modal-image';
import {Box, Link, makeStyles, Typography} from '@material-ui/core';
import {openChat, openPrivateChat} from "../../../actions/chatActions";
import "./message.css";
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

function Message({
                   className,
                   message,
                   showAuthorName,
                   ...rest
                 }) {
  const classes = useStyles();
  const [openedFile, setOpenedFile] = useState(null);
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const dispatch = useDispatch();
  const author =
      {
        name: message.authorName,
        type: message.authorId === auth.uid ? "user" : "other"
      };

  const isAuthor = message.authorId === auth.uid;

  return (
      <div
          className={clsx(classes.root + " message", className)}
          {...rest}
      >
        <Box
            display="flex"
            maxWidth={500}
            ml={author.type === 'user' ? 'auto' : 0}
        >
          <Box ml={2}>
            <Box
                bgcolor={author.type === 'user' ? 'secondary.main' : 'background.default'}
                color={author.type === 'user' ? 'secondary.contrastText' : 'text.primary'}
                py={1}
                px={2}
                borderRadius="borderRadius"
                boxShadow={1}
            >
              { showAuthorName && !isAuthor? <Link
                      color="inherit"
                      component={RouterLink}
                      to="#"
                      onClick={async () => {
                        let contact = profile.contacts[message.authorId];
                        dispatch(openPrivateChat(contact?.chatId, message.authorId));
                      }}
                  >
                    {author.name}
                  </Link>
                  : <></>
              }
              <Box mt={1}>
                {message.contentType === 'image' ? (
                    <Box
                        mt={2}
                        onClick={() => setOpenedFile(message.body)}
                    >
                      <img
                          alt="Attachment"
                          className={classes.image}
                          src={message.body}
                      />
                    </Box>
                ) : (
                    <Typography
                        color="inherit"
                        variant="body1"

                    >
                      {message.body}
                    </Typography>
                )}
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
                {moment(message.createdAt.toDate()).locale('pt-br').fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>
        {openedFile && (
            <Lightbox
                large={openedFile}
                onClose={() => setOpenedFile(null)}
            />
        )}
      </div>
  );
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

export default Message;
