import React from "react";
// Libreria que concatena clases
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
        cardAvatar: {
            width: 160,
            height: 150,
        },
        cardAvatarProfile: {
            maxWidth: theme.spacing(20),
            maxHeight: theme.spacing(20),
            margin: "-50px auto 0",
            borderRadius: "50%",
            //overflow: "hidden",
            //padding: "0",

        },
        cardAvatarPlain: {}
    }));

export const CardAvatar = (props) => {
    const classes = useStyles();
    const { children, plain, profile, ...rest } = props;

    const cardAvatarClasses = classNames({
        [classes.cardAvatar]: true,
        [classes.cardAvatarProfile]: profile,
        [classes.cardAvatarPlain]: plain,
    });
    return (
        <div className={cardAvatarClasses} {...rest}>
            {children}
        </div>
    );
}

CardAvatar.propTypes = {
    children: PropTypes.node.isRequired,
    profile: PropTypes.bool,
    plain: PropTypes.bool
};