import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

const useStyles = makeStyles(theme => ({
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "6px",
        color: "rgba(0,0,0, 0.87)",
        background: 'white',
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.14)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    cardPlain: {
        background: "transparent",
        boxShadow: "none"
    },
    cardProfile: {
       // marginTop: "30px",
        textAlign: "center"
    },
    cardChart: {
        "& p": {
            marginTop: "0px",
            paddingTop: "0px"
        }
    }
}));

export const CardGlobal = props => {
    const classes = useStyles();
    const { children, plain, profile, chart, ...rest } = props;
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardProfile]: profile,
        [classes.cardChart]: chart,
    });
    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
}

CardGlobal.propTypes = {
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    chart: PropTypes.bool,
    children: PropTypes.node
};